
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">

      <div className="w-full max-w-md">

        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          EDCI Enterprise Hub
        </h1>

        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
        />

      </div>

    </main>
  );
}
