
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">

      <div className="w-full max-w-md">

        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Join EDCI Enterprise Hub
        </h1>

        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
        />

      </div>

    </main>
  );
}
