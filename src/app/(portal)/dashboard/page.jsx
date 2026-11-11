
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email =
    user.emailAddresses?.find(
      (item) => item.id === user.primaryEmailAddressId
    )?.emailAddress;

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold">
          Welcome to EDCI Enterprise Hub
        </h1>

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            User Information
          </h2>

          <p className="mt-4">
            Name: {user.firstName} {user.lastName}
          </p>

          <p className="mt-2">
            Email: {email}
          </p>

          <p className="mt-2">
            Clerk User ID: {user.id}
          </p>

        </div>

      </div>
    </main>
  );
}
