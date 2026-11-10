import Link from "next/link";
import Image from "next/image";

export default function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-zinc-800 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-9 w-9 overflow-hidden rounded-md flex items-center justify-center">
                            <Image
                                src="/images/edcilogo.jpeg"
                                alt="EDCI Logo"
                                width={36}
                                height={36}
                                className="h-9 w-9 rounded-md object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            EDCI
                        </span>
                    </Link>

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
