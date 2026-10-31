"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StudioListing } from "@/types/studio";

export default function MyStudiosPage() {
  // Pure state with no fake data. Ready for backend query once API is live.
  const [userStudios] = useState<StudioListing[]>([]);

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/3 size-[350px] sm:size-[450px] rounded-full bg-primary/6 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary mb-2 shadow-xs">
              <Building2 className="size-3.5" />
              <span>Host Console</span>
            </div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
            >
              My Studio Listings
            </h3>
            <p className="mt-0.5 text-xs text-text-secondary">
              Manage your spaces, live booking availability, hourly rates, and studio profiles
            </p>
          </div>

          <Link
            href="/studios/new"
            className={cn(
              "inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-xs font-bold",
              "bg-primary text-primary-fg shadow-md",
              "hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
              "active:scale-98 transition-all shrink-0"
            )}
          >
            <Plus className="size-3.5" />
            <span>Add New Studio</span>
          </Link>
        </div>

        {/* ── EMPTY STATE UI (No fake data shown) ── */}
        {userStudios.length === 0 ? (
          <div className="rounded-2xl border border-border/80 bg-surface-1/90 p-8 sm:p-12 text-center backdrop-blur-xl shadow-md">
            {/* Ambient icon badge */}
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary mb-4 shadow-sm">
              <Building2 className="size-7" strokeWidth={1.75} />
            </div>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-base sm:text-lg font-bold text-text-primary"
            >
              You haven&apos;t listed any studio spaces yet
            </h2>

            <p className="mt-1.5 text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
              Monetize your photography cyc wall, podcast lounge, cinema sound stage, or recording suite.
              Reach thousands of verified creators looking for hourly bookings.
            </p>

            {/* Quick Host Perks Callout */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
              <div className="p-3 rounded-xl border border-border/60 bg-surface-2/40">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  <span>$1M Protection</span>
                </div>
                <p className="mt-1 text-[10px] text-text-muted">
                  Comprehensive liability protection included on every booking.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-border/60 bg-surface-2/40">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                  <TrendingUp className="size-3.5 text-primary" />
                  <span>Direct Payouts</span>
                </div>
                <p className="mt-1 text-[10px] text-text-muted">
                  Transparent hourly rates with automated deposit processing.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-border/60 bg-surface-2/40">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                  <CalendarCheck className="size-3.5 text-violet-400" />
                  <span>Full Schedule Control</span>
                </div>
                <p className="mt-1 text-[10px] text-text-muted">
                  Set dynamic hours, lead times, and custom day-of-week slots.
                </p>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/studios/new"
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-6 rounded-xl text-xs font-bold",
                  "bg-primary text-primary-fg shadow-md",
                  "hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
                  "active:scale-98 transition-all"
                )}
              >
                <Plus className="size-4" />
                <span>List Your First Studio</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Populated when backend is connected */}
          </div>
        )}
      </div>
    </div>
  );
}
