
"use client";

import Link from "next/link";
import Image from "next/image";

import {
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function PublicNavbar() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/images/edcilogo.jpeg"
              alt="EDCI Logo"
              width={36}
              height={36}
              className="rounded-md object-contain"
            />

            <span className="text-xl font-bold text-white">
              EDCI
            </span>

          </Link>

          {/* Navigation */}
          <div className="hidden items-center space-x-8 md:flex">

            <Link href="/about" className="text-zinc-400 hover:text-white">
              About
            </Link>

            <Link href="/programs" className="text-zinc-400 hover:text-white">
              Programs
            </Link>

            <Link href="/events" className="text-zinc-400 hover:text-white">
              Events
            </Link>

            <Link href="/contact" className="text-zinc-400 hover:text-white">
              Contact
            </Link>

          </div>

          {/* Authentication */}
          <div className="flex items-center gap-4">

            {isLoaded && isSignedIn ? (

              <>
                <Link
                  href="/dashboard"
                  className="rounded-md px-4 py-2 text-sm text-white hover:bg-zinc-800"
                >
                  Dashboard
                </Link>

                <UserButton afterSignOutUrl="/" />
              </>

            ) : isLoaded ? (

              <>
                <Link
                  href="/sign-in"
                  className="text-zinc-400 hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
                >
                  Apply Now
                </Link>
              </>

            ) : null}

          </div>

        </div>

      </div>

    </nav>
  );
}
