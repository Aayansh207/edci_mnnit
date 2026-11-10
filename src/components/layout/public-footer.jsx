"use client";

import Link from "next/link";
// Adjust this import path if your SplitText component is stored elsewhere
import SplitText from "@/components/SplitText";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    // bg-black with a subtle purple gradient glow at the bottom, separated by a dark purple border
    <footer className="relative overflow-hidden border-t border-purple-900/40 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-950/20 via-black to-black pt-16 pb-8">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

          {/* Brand & Mission with SplitText Animation */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold tracking-tight text-white">
              <SplitText
                text="EDCI Enterprise Hub"
                className="inline-block"
                delay={30}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.1}
                rootMargin="-10px"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-purple-200/60">
              Empowering student innovation and startup incubation. Providing the resources, mentorship, and network to turn campus ideas into scalable enterprises.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-100">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-purple-200/60 transition-colors hover:text-purple-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-purple-200/60 transition-colors hover:text-purple-300">
                  Incubation Programs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-purple-200/60 transition-colors hover:text-purple-300">
                  Events Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-100">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-purple-200/60 transition-colors hover:text-purple-300">
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-sm text-purple-200/60 transition-colors hover:text-purple-300">
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-purple-900/30 pt-8 sm:flex-row">
          <p className="text-sm text-purple-200/50">
            &copy; {currentYear} EDCI at MNNIT. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <span className="text-sm text-purple-200/50">Designed for modern incubation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}