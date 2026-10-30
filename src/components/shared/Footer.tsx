"use client";

import Link from "next/link";
import { Aperture, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Social icon: X (Official new branding) ────────────────────────── */
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

/* ─── Navigation Data ───────────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Creator Guidelines", href: "/guidelines" },
  { label: "List a Studio", href: "/studios/new" },
];

const STUDIO_CATEGORIES = [
  { label: "Photography Cyc Walls", href: "/studios?category=photography" },
  { label: "Music & Audio Recording Suites", href: "/studios?category=recording" },
  { label: "Dedicated Podcast Lounges", href: "/studios?category=podcast" },
  { label: "Cinema Sound Stages", href: "/studios?category=film" },
  { label: "Creative Art & Craft Workshops", href: "/studios?category=art" },
  { label: "Rehearsal & Dance Rooms", href: "/studios?category=rehearsal" },
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
    <footer className="relative mt-auto border-t border-border/60 bg-surface-1/50 transition-colors duration-200">
      {/* Top ambient highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── Main Footer Grid ──────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Col 1 — Brand Story (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex size-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20">
                <Aperture className="size-5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.8} />
              </div>
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg font-bold tracking-tight text-text-primary"
              >
                Studio<span className="text-primary">Space</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-text-secondary max-w-sm">
              The modern marketplace for creators, filmmakers, photographers, and audio engineers.
              Discover curated creative stages, reserve hours with transparent pricing, and unleash your next project.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-text-muted">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Verified studio hosts & safe checkout</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex size-8.5 items-center justify-center rounded-lg",
                    "border border-border/80 bg-surface-2/60 text-text-secondary",
                    "transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-105"
                  )}
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xs font-semibold uppercase tracking-wider text-text-primary"
            >
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-text-secondary transition-colors duration-150 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Studio Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xs font-semibold uppercase tracking-wider text-text-primary"
            >
              Studio Types
            </h4>
            <ul className="space-y-2.5">
              {STUDIO_CATEGORIES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-text-secondary transition-colors duration-150 hover:text-primary flex items-center gap-1.5 group"
                  >
                    <span className="size-1 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter Box (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <h4
                style={{ fontFamily: "var(--font-display)" }}
                className="text-xs font-semibold uppercase tracking-wider text-text-primary"
              >
                Creator Dispatch
              </h4>
            </div>

            <p className="text-xs text-text-secondary leading-normal">
              Get weekly updates on newly listed studios, equipment drops, and community studio hours.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 pt-1"
            >
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    "h-9 w-full rounded-xl border border-border/80 bg-surface-2/60 pl-8.5 pr-20 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-primary/60 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "absolute right-1 top-1 h-7 px-2.5 rounded-lg",
                    "bg-primary text-primary-fg text-[11px] font-semibold",
                    "hover:bg-primary-hover transition-colors duration-150 flex items-center gap-1"
                  )}
                >
                  <span>Join</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
              <span className="text-[10px] text-text-muted">No spam. Unsubscribe anytime.</span>
            </form>
          </div>
        </div>
      </div>

      {/* ── Sub-footer Copyright & Legal Links ────────────────────── */}
      <div className="border-t border-border/50 bg-surface-1/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-[11px] text-text-muted">
            &copy; {year} StudioSpace Inc. Designed for creators worldwide.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-text-muted">
            <Link
              href="/privacy"
              className="transition-colors hover:text-text-primary"
            >
              Privacy Policy
            </Link>
            <span className="text-border">&bull;</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-text-primary"
            >
              Terms of Service
            </Link>
            <span className="text-border">&bull;</span>
            <Link
              href="/cookies"
              className="transition-colors hover:text-text-primary"
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
