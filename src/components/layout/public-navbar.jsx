import Link from "next/link";

export default function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-zinc-800 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                        <Link href="/" className="text-xl font-bold tracking-tight text-black">
                            EDCI
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 bg-black/90 backdrop-blur-md p-3 rounded-lg">
                        <Link href="/about" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                            About
                        </Link>
                        <Link href="/programs" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                            Programs
                        </Link>
                        <Link href="/events" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                            Events
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                            Contact
                        </Link>
                    </div>

                    {/* Call to Action Section (Using Custom Tailwind Classes) */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/sign-in"
                            className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-zinc-200"
                        >
                            Apply Now
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}