import Link from "next/link";

export default function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Brand Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-blue-600"></div> {/* Placeholder Logo */}
                        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
                            EDCI
                        </Link>
                    </div>

                    {/* Desktop Links Section */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/about" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
                            About
                        </Link>
                        <Link href="/programs" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
                            Programs
                        </Link>
                        <Link href="/events" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
                            Events
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/sign-in"
                            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                        >
                            Apply Now
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}