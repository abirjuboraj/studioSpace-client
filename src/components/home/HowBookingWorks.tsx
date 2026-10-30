"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  CalendarClock,
  Zap,
  Clapperboard,
  ArrowRight,
  SlidersHorizontal,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Discover Spaces",
    subtitle: "Curated peer-to-peer studios",
    description:
      "Filter photography cyc walls, podcast rooms, audio suites, and sound stages by dimension, ceiling height, gear packages, and exact location.",
    highlight: "Filter by gear & specs",
  },
  {
    step: "02",
    icon: CalendarClock,
    title: "Select Shoot Hours",
    subtitle: "Live real-time calendar slots",
    description:
      "Browse dynamic availability without back-and-forth emails. Select half-day, full-day, or custom hourly slots with transparent pricing up-front.",
    highlight: "Dynamic live slots",
  },
  {
    step: "03",
    icon: Zap,
    title: "Book Instantly",
    subtitle: "Transparent checkout & protection",
    description:
      "Confirm your booking in seconds with secure processing, automatic host guidelines, and included StudioSpace creator liability protection.",
    highlight: "Zero hidden surcharges",
  },
  {
    step: "04",
    icon: Clapperboard,
    title: "Create & Produce",
    subtitle: "Seamless check-in & host support",
    description:
      "Arrive, unlock digital access or meet your host, plug into high-end lighting grids and audio desks, and bring your creative vision to life.",
    highlight: "Digital check-in ready",
  },
];

export function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-16 sm:py-20 lg:py-24 border-b border-border/60 bg-background overflow-hidden scroll-mt-16"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-3 shadow-xs">
            <SlidersHorizontal className="size-3.5" />
            <span>Effortless Workflow</span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
          >
            How Booking Works on <span className="text-gradient">StudioSpace</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
            From discovery to wrap time, our streamlined 4-step workflow removes production friction so you can focus on creating.
          </p>
        </div>

        {/* ── INTERACTIVE TIMELINE / STEPPER UI (Distinct from Carousels) ── */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

          {/* Stepper Grid (Numbered step nodes with progression flow) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6",
                    "border border-border/70 bg-surface-1/70 backdrop-blur-md",
                    "transition-all duration-300 hover:border-primary/50 hover:bg-surface-2 hover:-translate-y-1 hover:shadow-lg"
                  )}
                >
                  <div>
                    {/* Top Step Pill & Node */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-fg shadow-xs">
                        <Icon className="size-5" />
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-surface-2/80 text-[11px] font-bold text-primary">
                        <span>Step</span>
                        <span style={{ fontFamily: "var(--font-display)" }}>{item.step}</span>
                      </div>
                    </div>

                    <h3
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors"
                    >
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                      {item.subtitle}
                    </p>

                    <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom feature tag */}
                  <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                      {item.highlight}
                    </span>
                    <ArrowRight className="size-3.5 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface-1/70 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Video className="size-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-text-primary">
                Ready to find the ideal creative environment?
              </p>
              <p className="text-[11px] text-text-muted">
                Explore real spaces verified by our creator community.
              </p>
            </div>
          </div>

          <Link
            href="/studios"
            className={cn(
              "inline-flex items-center gap-2 h-9 px-4 rounded-lg",
              "bg-primary text-primary-fg text-xs font-semibold shadow-xs shrink-0",
              "hover:bg-primary-hover active:scale-95 transition-all"
            )}
          >
            <span>Explore Studios</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
