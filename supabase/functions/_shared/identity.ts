export const DEFAULT_PASSWORD = "skitm@123";

const ENROLLMENT_REGEX = /^0875[A-Z]{2}\d{2}\d{4}$/;
const STAFF_EMAIL_REGEX = /^[A-Z0-9._%+-]+@skitm\.in$/i;

export function assertStudentEnrollment(enrollmentNumber?: string): string {
    const value = (enrollmentNumber ?? "").trim().toUpperCase();
    if (!ENROLLMENT_REGEX.test(value)) {
        throw new Error(
            "Invalid enrollment number. Expected format 0875CS241000.",
        );
    }
    return value;
}

export function assertStaffEmail(email?: string): string {
    const value = (email ?? "").trim().toLowerCase();
    if (!STAFF_EMAIL_REGEX.test(value)) {
        throw new Error("Staff email must be a valid @skitm.in address.");
    }
    return value;
}

export function studentEmailFromEnrollment(enrollmentNumber: string): string {
    return `${enrollmentNumber}@student.skitm.in`;
}
