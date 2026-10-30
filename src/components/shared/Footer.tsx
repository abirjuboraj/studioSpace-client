"use client"
import Link from "next/link";
import { Aperture, Mail, ArrowRight } from "lucide-react";

/* ─── Social icon: X (formerly Twitter) ─────────────────────────────── */
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

/* ─── Instagram icon ─────────────────────────────────────────────────── */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

/* ─── YouTube icon ───────────────────────────────────────────────────── */
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={className}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/* ─── LinkedIn icon ──────────────────────────────────────────────────── */
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const STUDIO_CATEGORIES = [
  { label: "Photography Studios", href: "/studios?category=photography" },
  { label: "Music Recording Suites", href: "/studios?category=recording" },
  { label: "Podcast Lounges", href: "/studios?category=podcast" },
  { label: "Cinema Sound Stages", href: "/studios?category=film" },
  { label: "Art & Craft Workshops", href: "/studios?category=art" },
  { label: "Cyc Wall Studios", href: "/studios?category=cyc" },
];

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/studiospace", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com/studiospace", icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com/@studiospace", icon: YouTubeIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/studiospace", icon: LinkedInIcon },
];

/* ─── Component ─────────────────────────────────────────────────────── */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#1E1E22] bg-[#0C0C0F]">
      {/* ── Main Footer Grid ──────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand + Mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <span className="flex items-center justify-center rounded-lg p-1.5 bg-[#F59E0B]/10 text-[#F59E0B] transition-all duration-200 group-hover:bg-[#F59E0B]/20">
                <Aperture className="size-5" strokeWidth={1.75} />
              </span>
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg font-bold tracking-tight text-[#F4F4F6]"
              >
                Studio<span className="text-[#F59E0B]">Space</span>
              </span>
            </Link>

            {/* Mission */}
            <p className="text-sm leading-relaxed text-[#52525B] max-w-xs">
              The peer-to-peer marketplace where creators find, book, and thrive
              in world-class studios — from photography cyc walls to cinema
              sound stages.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-[#2E2E34] bg-[#141417] text-[#52525B] transition-all duration-200 hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#52525B]"
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#A1A1AA] transition-colors duration-150 hover:text-[#F59E0B]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Studio Categories */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#52525B]"
            >
              Studio Categories
            </h3>
            <ul className="space-y-2.5">
              {STUDIO_CATEGORIES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#A1A1AA] transition-colors duration-150 hover:text-[#F59E0B]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#52525B]"
            >
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-[#52525B]">
              New studios, creator tips, and platform updates — no spam.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#52525B]" />
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-9 w-full rounded-lg border border-[#2E2E34] bg-[#141417] pl-9 pr-3 text-sm text-[#F4F4F6] placeholder:text-[#52525B] transition-colors duration-150 focus:border-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/15"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F59E0B] text-[#0C0C0F] transition-all duration-200 hover:bg-[#D97706] hover:shadow-[0_0_16px_rgba(245,158,11,0.3)]"
                >
                  <ArrowRight className="size-4" strokeWidth={2.25} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────────── */}
      <div className="border-t border-[#1E1E22]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-[#52525B]">
            &copy; {year} StudioSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]"
            >
              Terms of Service
            </Link>
            <span className="text-[#2E2E34]">&middot;</span>
            <Link
              href="/privacy"
              className="text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]"
            >
              Privacy Policy
            </Link>
            <span className="text-[#2E2E34]">&middot;</span>
            <Link
              href="/cookies"
              className="text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

