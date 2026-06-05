import Link from "next/link";
import { footerLinks, navLinks, siteConfig } from "@/lib/constants";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-footer text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-lg font-bold text-white">{siteConfig.legalName}</p>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              {siteConfig.tagline}. Permanent, temporary and contract
              recruitment UK-wide with direct access to James.
            </p>
            <p className="mt-4 text-sm text-brand-300">
              Registered in England and Wales.{" "}
              <a
                href={siteConfig.companiesHouseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-200 underline decoration-brand-500/50 underline-offset-2 transition-colors hover:text-white"
              >
                Company no. {siteConfig.companiesHouseNumber}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Recruitment Solutions
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/services/permanent-recruitment"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Permanent Recruitment
                </Link>
              </li>
              <li>
                <Link
                  href="/services/temporary-recruitment"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Temporary Recruitment
                </Link>
              </li>
              <li>
                <Link
                  href="/services/contract-recruitment"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Contract Recruitment
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Current Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/sectors"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Sectors We Recruit For
                </Link>
              </li>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-brand-200 transition-colors hover:text-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-brand-200 transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="pt-2">
                <SocialLinks variant="footer" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-700/50 pt-8 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-sm text-brand-300">
              &copy; {currentYear}{" "}
              <a
                href={siteConfig.companiesHouseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {siteConfig.legalName}
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-brand-300 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="text-brand-300 transition-colors hover:text-white"
              >
                Terms of Use
              </Link>
            </div>
          </div>
          <p className="text-sm text-brand-300">
            UK-wide engineering &amp; automotive recruitment specialists
          </p>
        </div>
      </div>
    </footer>
  );
}
