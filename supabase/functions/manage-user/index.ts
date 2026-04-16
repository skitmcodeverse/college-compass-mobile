// @ts-nocheck
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import {
    assertStaffEmail,
    assertStudentEnrollment,
    DEFAULT_PASSWORD,
    studentEmailFromEnrollment,
} from "../_shared/identity.ts";

type AppRole = "super_admin" | "hod" | "teacher" | "student";

type CreateUserPayload = {
    action: "create";
    userData: {
        full_name: string;
        role: AppRole;
        department?: string;
        faculty_id?: string;
        enrollment_number?: string;
        email?: string;
        password?: string;
    };
};

type DeleteUserPayload = {
    action: "delete";
    userData: {
        user_id: string;
    };
};

type ManageUserPayload = CreateUserPayload | DeleteUserPayload;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
        "Missing Supabase environment variables for manage-user function.",
    );
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(status: number, body: Record<string, unknown>) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
}

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return jsonResponse(401, { error: "Missing Authorization header" });
        }

        const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: authHeader } },
        });

        const adminClient = createClient(
            SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY,
        );

        const {
            data: { user: caller },
            error: callerError,
        } = await callerClient.auth.getUser();

        if (callerError || !caller) {
            return jsonResponse(401, { error: "Unauthorized caller" });
        }

        const { data: callerRoleRow, error: callerRoleError } =
            await adminClient
                .from("user_roles")
                .select("role, department")
                .eq("user_id", caller.id)
                .single();

        if (callerRoleError || !callerRoleRow) {
            return jsonResponse(403, {
                error: "Only admin roles can manage users",
            });
        }

        const callerRole = callerRoleRow.role as AppRole;
        const callerDepartment = callerRoleRow.department as string | null;

        if (callerRole !== "super_admin" && callerRole !== "hod") {
            return jsonResponse(403, {
                error: "Only super admin or HOD can manage users",
            });
        }

        const payload = (await req.json()) as ManageUserPayload;

        if (payload.action === "create") {
            const { full_name, role } = payload.userData;
            const department = payload.userData.department?.trim() || null;
            const password =
                payload.userData.password?.trim() || DEFAULT_PASSWORD;

            if (!full_name?.trim()) {
                return jsonResponse(400, { error: "full_name is required" });
            }

            if (!["super_admin", "hod", "teacher", "student"].includes(role)) {
                return jsonResponse(400, { error: "Invalid role" });
            }

            if (
                callerRole === "hod" &&
                (role === "super_admin" || role === "hod")
            ) {
                return jsonResponse(403, {
                    error: "HOD cannot create admin roles",
                });
            }

            if (
                callerRole === "hod" &&
                callerDepartment &&
                department &&
                callerDepartment !== department
            ) {
                return jsonResponse(403, {
                    error: "HOD can only create users in own department",
                });
            }

            let email = "";
            let enrollmentNumber: string | null = null;

            if (role === "student") {
                enrollmentNumber = assertStudentEnrollment(
                    payload.userData.enrollment_number,
                );
                email = studentEmailFromEnrollment(enrollmentNumber);
            } else {
                email = assertStaffEmail(payload.userData.email);
            }

            const { data: createdUser, error: createUserError } =
                await adminClient.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true,
                    user_metadata: {
                        full_name: full_name.trim(),
                        role,
                        department: department ?? callerDepartment,
                        enrollment_number: enrollmentNumber,
                        faculty_id: payload.userData.faculty_id?.trim() || null,
                        branch_code: enrollmentNumber
                            ? enrollmentNumber.slice(4, 6)
                            : null,
                        admission_year: enrollmentNumber
                            ? Number(enrollmentNumber.slice(6, 8))
                            : null,
                    },
                });

            if (createUserError || !createdUser.user) {
                return jsonResponse(400, {
                    error: createUserError?.message ?? "User creation failed",
                });
            }

            const effectiveDepartment = department ?? callerDepartment;

            const { error: profileUpdateError } = await adminClient
                .from("profiles")
                .update({
                    full_name: full_name.trim(),
                    email,
                    enrollment_number: enrollmentNumber,
                    faculty_id: payload.userData.faculty_id?.trim() || null,
                    department: effectiveDepartment,
                    branch_code: enrollmentNumber
                        ? enrollmentNumber.slice(4, 6)
                        : null,
                    admission_year: enrollmentNumber
                        ? Number(enrollmentNumber.slice(6, 8))
                        : null,
                })
                .eq("id", createdUser.user.id);

            if (profileUpdateError) {
                return jsonResponse(400, { error: profileUpdateError.message });
            }

            const { error: roleUpsertError } = await adminClient
                .from("user_roles")
                .upsert({
                    user_id: createdUser.user.id,
                    role,
                    department: effectiveDepartment,
                });

            if (roleUpsertError) {
                return jsonResponse(400, { error: roleUpsertError.message });
            }

            return jsonResponse(200, {
                success: true,
                user_id: createdUser.user.id,
                email,
                default_password: password,
            });
        }

        if (payload.action === "delete") {
            const targetUserId = payload.userData.user_id;
            if (!targetUserId) {
                return jsonResponse(400, { error: "user_id is required" });
            }

            if (targetUserId === caller.id) {
                return jsonResponse(400, {
                    error: "Cannot delete your own account",
                });
            }

            if (callerRole === "hod") {
                const { data: targetRole, error: targetRoleError } =
                    await adminClient
                        .from("user_roles")
                        .select("role, department")
                        .eq("user_id", targetUserId)
                        .single();

                if (targetRoleError || !targetRole) {
                    return jsonResponse(404, {
                        error: "Target user not found",
                    });
                }

                if (
                    targetRole.role === "super_admin" ||
                    targetRole.role === "hod"
                ) {
                    return jsonResponse(403, {
                        error: "HOD cannot delete admin roles",
                    });
                }

                if (
                    callerDepartment &&
                    targetRole.department &&
                    callerDepartment !== targetRole.department
                ) {
                    return jsonResponse(403, {
                        error: "HOD can only delete users in own department",
                    });
                }
            }

            const { error: deleteError } =
                await adminClient.auth.admin.deleteUser(targetUserId);
            if (deleteError) {
                return jsonResponse(400, { error: deleteError.message });
            }

            return jsonResponse(200, {
                success: true,
                deleted_user_id: targetUserId,
            });
        }

        return jsonResponse(400, { error: "Invalid action" });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return jsonResponse(500, { error: message });
    }
});
