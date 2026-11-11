
import { requireUser } from "@/lib/auth";
import { ROLES } from "@/constants/roles";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const user = await requireUser();

  if (user.role === ROLES.STUDENT) {
    redirect("/student");
  }

  if (user.role === ROLES.STARTUP) {
    redirect("/startup");
  }

  redirect("/unauthorized");
}
