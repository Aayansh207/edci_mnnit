
"use client";

import { useState } from "react";
import { SignUp } from "@clerk/nextjs";

const ACCOUNT_TYPES = {
  STUDENT: "Student",
  STARTUP: "Startup",
};

export default function SignupWithRole() {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div className="w-full">

      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">
          Join EDCI Enterprise Hub
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Select your account type to get started.
        </p>
      </div>

      {/* Account type selection */}
      <div className="mb-6 grid grid-cols-2 gap-4">

        <button
          type="button"
          onClick={() => setSelectedRole(ACCOUNT_TYPES.STUDENT)}
          className={`rounded-xl border p-5 text-left transition ${
            selectedRole === ACCOUNT_TYPES.STUDENT
              ? "border-violet-500 bg-violet-500/10"
              : "border-slate-700 bg-slate-900 hover:border-slate-500"
          }`}
        >
          <span className="text-2xl">🎓</span>

          <h2 className="mt-3 font-semibold text-white">
            Student
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Join as a student and access EDCI student services.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedRole(ACCOUNT_TYPES.STARTUP)}
          className={`rounded-xl border p-5 text-left transition ${
            selectedRole === ACCOUNT_TYPES.STARTUP
              ? "border-violet-500 bg-violet-500/10"
              : "border-slate-700 bg-slate-900 hover:border-slate-500"
          }`}
        >
          <span className="text-2xl">🚀</span>

          <h2 className="mt-3 font-semibold text-white">
            Startup
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Register your startup and access incubation services.
          </p>
        </button>

      </div>

      {/* Clerk signup */}
      {selectedRole ? (
        <div className="flex justify-center">

          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl="/complete-signup"
            unsafeMetadata={{
              requestedRole: selectedRole,
            }}
          />

        </div>
      ) : (
        <p className="rounded-lg bg-slate-900 p-4 text-center text-sm text-slate-400">
          Please select Student or Startup to continue.
        </p>
      )}

    </div>
  );
}
