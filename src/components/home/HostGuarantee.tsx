"use client";

import React, { useState } from "react";
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
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GUARANTEE_ITEMS = [
  {
    id: "liability",
    icon: ShieldCheck,
    title: "$1,000,000 Liability Protection",
    badge: "Included Free",
    tagline: "Comprehensive Host Safety",
    summary: "Guaranteed structural and interior property protection on every confirmed booking.",
    description:
      "Every confirmed booking is safeguarded by StudioSpace comprehensive liability coverage, protecting both studio owners and production crews against unexpected property damage.",
    perks: [
      "Zero deductible for verified hosts",
      "Protection for structural & aesthetic interiors",
      "Expedited claim resolution within 48 hours",
    ],
  },
  {
    id: "verification",
    icon: UserCheck,
    title: "100% Verified Profiles & Studios",
    badge: "Strict Vetting",
    tagline: "Community Trust",
    summary: "Multi-point identity verification and physical studio space auditing.",
    description:
      "We conduct thorough multi-point verification for every creator and studio host. ID confirmations, physical space audits, and transparent creator feedback reviews keep the community accountable.",
    perks: [
      "Government ID & business registry checks",
      "Accurate square-footage & gear listings",
      "Peer review system with authentic shoot tags",
    ],
  },
  {
    id: "equipment",
    icon: Wrench,
    title: "Equipment & Studio Gear Safety",
    badge: "Production Ready",
    tagline: "High-End Kit Care",
    summary: "Logged gear checklists and instant damage deposit escrow holds.",
    description:
      "All on-site equipment—from Profoto strobes and Arri cinema lighting to mixing consoles—is logged and checked with pre/post inspection checklists to prevent disputes.",
    perks: [
      "Pre-session digital check-in logs",
      "Instant damage deposit escrow hold",
      "On-demand technician dispatch in key metros",
    ],
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 Priority Production Support",
    badge: "Always Live",
    tagline: "Active Shoots",
    summary: "Immediate 3-minute response for ongoing sets, overtime, and access.",
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
  const [selectedId, setSelectedId] = useState(GUARANTEE_ITEMS[0].id);
  const activeItem = GUARANTEE_ITEMS.find((item) => item.id === selectedId) || GUARANTEE_ITEMS[0];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      id="guarantee"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-surface-1/40 border-b border-border/60 overflow-hidden scroll-mt-16"
    >
      {/* Ambient background decoration */}
      <div className="absolute -bottom-24 -right-24 size-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
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

        {/* ── INTERACTIVE TABBED SPLIT-CONSOLE UI (No swiper/carousel here) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          {/* Left Selection List (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {GUARANTEE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === selectedId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 border",
                    isSelected
                      ? "border-primary/50 bg-surface-1 shadow-md scale-[1.01]"
                      : "border-border/60 bg-surface-1/40 hover:border-border hover:bg-surface-1/70"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                      isSelected
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-border bg-surface-2 text-text-secondary"
                    )}
                  >
                    <Icon className="size-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        style={{ fontFamily: "var(--font-display)" }}
                        className={cn(
                          "text-xs sm:text-sm font-bold truncate",
                          isSelected ? "text-primary" : "text-text-primary"
                        )}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-text-muted shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-text-secondary line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Guarantee Spotlight (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="h-full flex flex-col justify-between rounded-2xl border border-primary/30 bg-surface-1/90 p-5 sm:p-7 backdrop-blur-xl shadow-lg relative overflow-hidden">
              {/* Corner ambient glow */}
              <div className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary">
                      <ActiveIcon className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
                        {activeItem.tagline}
                      </span>
                      <h3
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-lg sm:text-xl font-bold text-text-primary"
                      >
                        {activeItem.title}
                      </h3>
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                    {activeItem.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Key Policy Assurances */}
                <div className="mt-6 pt-5 border-t border-border/50">
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
                    Covered Standards & Protocols
                  </h4>
                  <ul className="space-y-2.5">
                    {activeItem.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-text-secondary">
                        <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                          <Check className="size-2.5 stroke-[3]" />
                        </div>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Verification Note */}
              <div className="mt-8 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-text-muted">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <FileCheck2 className="size-3.5 text-primary" />
                  Policy underwritten by leading commercial syndicate
                </span>

                <Link
                  href="/guidelines"
                  className="font-medium text-primary hover:underline flex items-center gap-1"
                >
                  <span>Review full insurance terms</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Callout for Hosts */}
        <div className="mt-12 sm:mt-14 relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-surface-1 to-accent/10 p-5 sm:p-7 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center md:text-left">
              <h4
                style={{ fontFamily: "var(--font-display)" }}
                className="text-base sm:text-lg font-bold text-text-primary"
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
                  "inline-flex items-center gap-2 h-9 px-4.5 rounded-xl",
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
