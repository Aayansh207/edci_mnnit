

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ROLES } from "@/constants/roles";

const VALID_ROLES = new Set(Object.values(ROLES));

export function normalizeRole(role) {
  return VALID_ROLES.has(role) ? role : null;
}

export async function getCurrentAppUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const primaryEmail = clerkUser.emailAddresses?.find(
    (item) => item.id === clerkUser.primaryEmailAddressId
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
    role: normalizeRole(clerkUser.publicMetadata?.role),
  };
}

export async function requireUser() {
  const user = await getCurrentAppUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.role) {
    redirect("/complete-signup");
  }

  return user;
}

export async function requireRole(allowedRoles) {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}
