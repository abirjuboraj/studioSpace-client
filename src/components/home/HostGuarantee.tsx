"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserCheck,
  Headphones,
  Wrench,
  Check,
  FileCheck2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GUARANTEE_ITEMS = [
  {
    icon: ShieldCheck,
    title: "$1,000,000 Liability Protection",
    badge: "Included Free",
    description:
      "Every confirmed booking is safeguarded by StudioSpace comprehensive liability coverage, protecting both studio owners and production crews against unexpected property damage.",
    perks: [
      "Zero deductible for verified hosts",
      "Protection for structural & aesthetic interiors",
      "Expedited claim resolution within 48 hours",
    ],
  },
  {
    icon: UserCheck,
    title: "100% Verified Profiles & Studios",
    badge: "Strict Vetting",
    description:
      "We conduct thorough multi-point verification for every creator and studio host. ID confirmations, physical space audits, and transparent creator feedback reviews keep the community accountable.",
    perks: [
      "Government ID & business registry checks",
      "Accurate square-footage & gear listings",
      "Peer review system with authentic shoot tags",
    ],
  },
  {
    icon: Wrench,
    title: "Equipment & Studio Gear Safety",
    badge: "Production Ready",
    description:
      "All on-site equipment—from Profoto strobes and Arri cinema lighting to mixing consoles—is logged and checked with pre/post inspection checklists to prevent disputes.",
    perks: [
      "Pre-session digital check-in logs",
      "Instant damage deposit escrow hold",
      "On-demand technician dispatch in key metros",
    ],
  },
  {
    icon: Headphones,
    title: "24/7 Priority Production Support",
    badge: "Always Live",
    description:
      "Production schedules don't follow 9-to-5 hours. Our dedicated support team is available around the clock via live chat and direct phone lines to resolve access, overtime, or host needs.",
    perks: [
      "Dedicated response under 3 minutes",
      "Emergency studio re-booking assistance",
      "Direct host-to-crew mediation channel",
    ],
  },
];

export function HostGuarantee() {
  return (
    <section className="relative w-full py-20 lg:py-24 bg-surface-1/40 border-b border-border/60 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute -bottom-24 -right-24 size-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-500 mb-3 shadow-xs">
            <Lock className="size-3.5" />
            <span>StudioSpace Trust & Safety</span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
          >
            Host Guarantee & <span className="text-gradient">Creator Assurances</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
            Whether you are opening your warehouse soundstage or renting an intimate vocal booth, we protect your space, equipment, and production schedule at every step.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {GUARANTEE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7",
                  "border border-border/70 bg-surface-1/80 backdrop-blur-md",
                  "transition-all duration-300 hover:border-primary/40 hover:bg-surface-2/80 hover:shadow-xl"
                )}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-full border border-border/80 bg-surface-2 px-3 py-1 text-[11px] font-semibold text-text-secondary">
                      {item.badge}
                    </span>
                  </div>

                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-base sm:text-lg font-bold text-text-primary"
                  >
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="mt-5 space-y-2 border-t border-border/50 pt-4">
                    {item.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                        <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                          <Check className="size-2.5 stroke-[3]" />
                        </div>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-[11px] text-text-muted">
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <FileCheck2 className="size-3.5 text-primary" />
                    Policy verified by Lloyd&apos;s syndicate
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Callout for Hosts */}
        <div className="mt-14 relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-surface-1 to-accent/10 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h4
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg sm:text-xl font-bold text-text-primary"
              >
                Turn your creative space into steady revenue
              </h4>
              <p className="text-xs text-text-secondary max-w-xl">
                Join thousands of hosts monetizing their cyc walls, photo studios, and recording suites with guaranteed payout and damage protection.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/studios"
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-5 rounded-xl",
                  "bg-primary text-primary-fg text-xs font-semibold shadow-md",
                  "hover:bg-primary-hover hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]",
                  "active:scale-95 transition-all"
                )}
              >
                <span>List Your Studio</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

