
import {
  currentUser,
  clerkClient,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { ROLES } from "@/constants/roles";

const VALID_ROLES = new Set(Object.values(ROLES));

export default async function CompleteSignupPage() {

  // Get authenticated Clerk user
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Never overwrite an already assigned role
  const existingRole = user.publicMetadata?.role;

  if (VALID_ROLES.has(existingRole)) {
    redirect("/dashboard");
  }

  // Read the requested role from signup metadata
  const requestedRole = user.unsafeMetadata?.requestedRole;

  // Validate against our allowed roles
  const role = VALID_ROLES.has(requestedRole)
    ? requestedRole
    : null;

  // Reject invalid account types
  if (!role) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="max-w-md text-center">

          <h1 className="text-2xl font-bold">
            Account setup incomplete
          </h1>

          <p className="mt-3 text-slate-400">
            Your account type could not be verified.
            Please contact EDCI support.
          </p>

        </div>
      </main>
    );
  }

  // Server-side Clerk Backend API
  const client = clerkClient();

  // Assign the validated role to Public Metadata
  await client.users.updateUserMetadata(user.id, {
    publicMetadata: {
      role: role,
    },
    unsafeMetadata: {
      requestedRole: null,
    },
  });

  // Redirect according to assigned role
  redirect(
    role === ROLES.STUDENT
      ? "/student"
      : "/startup"
  );
}
