import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-700">Page Not Found</h2>
      <p className="mt-2 text-slate-500 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

