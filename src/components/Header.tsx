"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/constants";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur-md">
      <div className="h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo variant="header" />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-100 text-brand-800"
                    : "text-navy-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-500"
          >
            {siteConfig.phoneDisplay}
          </a>
          <Button href="/contact" variant="primary">
            Book a Call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-700 hover:bg-brand-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-brand-100 bg-brand-50/50 px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-brand-800 hover:bg-brand-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="block px-3 py-2 text-sm font-semibold text-brand-600"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="px-3 pt-2">
              <Button href="/contact" variant="primary" className="w-full">
                Book a Call
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
