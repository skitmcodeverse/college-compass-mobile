const STUDENT_ENROLLMENT_REGEX = /^0875[A-Z]{2}\d{2}\d{4}$/;
const STAFF_EMAIL_REGEX = /^[A-Z0-9._%+-]+@skitm\.in$/i;

export const DEFAULT_PASSWORD = "skitm@123";

export type ParsedLoginIdentity = {
    loginEmail: string;
    identityType: "student" | "staff";
    normalizedIdentifier: string;
};

export function isValidEnrollmentNumber(enrollmentNumber: string): boolean {
    return STUDENT_ENROLLMENT_REGEX.test(enrollmentNumber.toUpperCase());
}

export function studentEmailFromEnrollment(enrollmentNumber: string): string {
    return `${enrollmentNumber.toUpperCase()}@student.skitm.in`;
}

export function isValidStaffEmail(email: string): boolean {
    return STAFF_EMAIL_REGEX.test(email.trim());
}

export function parseLoginIdentifier(
    identifier: string,
): ParsedLoginIdentity | null {
    const trimmed = identifier.trim();
    const upper = trimmed.toUpperCase();

    if (isValidEnrollmentNumber(upper)) {
        return {
            loginEmail: studentEmailFromEnrollment(upper),
            identityType: "student",
            normalizedIdentifier: upper,
        };
    }

    if (isValidStaffEmail(trimmed)) {
        return {
            loginEmail: trimmed.toLowerCase(),
            identityType: "staff",
            normalizedIdentifier: trimmed.toLowerCase(),
        };
    }

    return null;
}
