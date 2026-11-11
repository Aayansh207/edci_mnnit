

import { requireRole } from "@/lib/auth";
import { ROLES } from "@/constants/roles";

export default async function StudentDashboard() {
  const user = await requireRole([ROLES.STUDENT]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold">
          Welcome, {user.firstName}!
        </h1>

        <p className="mt-2 text-slate-400">
          Student Dashboard - EDCI Enterprise Hub
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="font-semibold">My Applications</h2>
            <p className="mt-2 text-sm text-slate-400">
              View and track your applications.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="font-semibold">My Profile</h2>
            <p className="mt-2 text-sm text-slate-400">
              Manage your student profile.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="font-semibold">Opportunities</h2>
            <p className="mt-2 text-sm text-slate-400">
              Explore EDCI opportunities.
            </p>
          </div>

        </div>

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="font-semibold">Account Details</h2>
          <p className="mt-3">Name: {user.fullName}</p>
          <p className="mt-2">Email: {user.email}</p>
          <p className="mt-2">Role: {user.role}</p>
        </div>

      </div>
    </main>
  );
}
