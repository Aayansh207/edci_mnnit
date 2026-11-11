
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
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur-md">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          {/* EDCI Logo */}
          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md">

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

          {/* Navigation Links */}
          <div className="hidden items-center space-x-8 rounded-lg bg-black/90 p-3 backdrop-blur-md md:flex">

            <Link
              href="/about"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              About
            </Link>

            <Link
              href="/programs"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Programs
            </Link>

            <Link
              href="/events"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Events
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Contact
            </Link>

          </div>

          {/* Authentication Section */}
          <div className="flex items-center gap-4">

            {!isLoaded ? (

              <div className="h-9 w-20 animate-pulse rounded-md bg-zinc-800" />

            ) : isSignedIn ? (

              <>
                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  Dashboard
                </Link>

                {/* Clerk Profile and Sign Out */}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9",
                    },
                  }}
                />

              </>

            ) : (

              <>
                {/* Sign In */}
                <Link
                  href="/sign-in"
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  Sign In
                </Link>

                {/* Sign Up */}
                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-zinc-200"
                >
                  Apply Now
                </Link>

              </>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}
