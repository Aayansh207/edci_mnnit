
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ROLES } from "@/constants/roles";

// Allowed application roles
const VALID_ROLES = new Set(Object.values(ROLES));

// Get user's application role
export function normalizeRole(role) {
  return VALID_ROLES.has(role)
    ? role
    : ROLES.STUDENT;
}

// Fetch currently authenticated user
export async function getCurrentAppUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const primaryEmail =
    clerkUser.emailAddresses?.find(
      (email) =>
        email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress || null;

  return {
    id: clerkUser.id,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    fullName: [
      clerkUser.firstName,
      clerkUser.lastName,
    ].filter(Boolean).join(" "),
    email: primaryEmail,
    imageUrl: clerkUser.imageUrl,
    role: normalizeRole(
      clerkUser.publicMetadata?.role
    ),
  };
}

// Require authentication
export async function requireUser() {
  const user = await getCurrentAppUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

// Require specific role
export async function requireRole(allowedRoles) {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}
