"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Aperture,
  Building2,
  Award,
  Compass,
  ArrowRight,
  Shield,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

const STATS = [
  { label: "Active Creative Studios", value: "850+", change: "Across 24 Metro Hubs" },
  { label: "Verified Creators & Crews", value: "24,000+", change: "Filmmakers, Photographers" },
  { label: "Production Hours Hosted", value: "120K+", change: "Over 99.4% Positive Ratings" },
  { label: "Host Protection Underwritten", value: "$1M", change: "Comprehensive Coverage" },
];

const CORE_VALUES = [
  {
    icon: Compass,
    title: "Empowering Independent Creators",
    description:
      "We believe high-end production facilities shouldn't be locked behind opaque agency rosters. We bring direct, transparent access to cyc walls, stages, and studios.",
  },
  {
    icon: Building2,
    title: "Sustainable Studio Economics",
    description:
      "Studio owners optimize vacant daytime and late-night slots, generating predictable revenue to reinvest into better lights, acoustics, and production gear.",
  },
  {
    icon: Shield,
    title: "Radical Booking Transparency",
    description:
      "Dynamic availability grids, all-inclusive equipment packages, and transparent hourly pricing with zero surprise surcharges or hidden cleaning fees.",
  },
  {
    icon: Layers,
    title: "Curated Creator Community",
    description:
      "Every host and creative crew is vetted. Peer-to-peer trust empowers respectful collaborations, protected sets, and outstanding portfolio work.",
  },
];

export function AboutUs() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section
      id="about"
      className="relative w-full py-14 sm:py-20 lg:py-24 border-b border-border/60 bg-background overflow-hidden scroll-mt-16"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 size-[400px] sm:size-[550px] rounded-full bg-primary/5 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-[350px] sm:size-[450px] rounded-full bg-accent/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Pill & Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-primary mb-2.5 sm:mb-3 shadow-xs">
            <Aperture className="size-3.5" />
            <span>Our Mission & Story</span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
          >
            Built by Creators, For <span className="text-gradient">Production Visionaries</span>
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
            StudioSpace was founded to dismantle the friction of booking creative real estate. We connect passionate studio hosts with filmmakers, photographers, and audio artists worldwide.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10 sm:mb-16">
          {/* Left Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary leading-snug"
            >
              The creative process deserves spaces that inspire, elevate, and empower.
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Finding a cinema sound stage with the right power drop, a naturally lit photo studio with continuous daylight, or an acoustically isolated podcast lounge used to take dozens of calls and non-transparent PDF quotes.
            </p>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed hidden sm:block">
              We engineered StudioSpace as a peer-to-peer ecosystem where studio owners list high-caliber spaces and creators discover, inspect live availability, and reserve production slots with immediate confirmation and verified insurance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/studios"
                className={cn(
                  "inline-flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10 px-4 sm:px-5 rounded-xl",
                  "bg-primary text-primary-fg text-xs font-semibold shadow-xs",
                  "hover:bg-primary-hover active:scale-95 transition-all"
                )}
              >
                <span>Discover Spaces</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/add-studio"
                className={cn(
                  "inline-flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10 px-4 sm:px-5 rounded-xl",
                  "border border-border/80 bg-surface-1/70 backdrop-blur-md",
                  "text-text-primary text-xs font-medium hover:border-primary/40 hover:bg-surface-2",
                  "active:scale-95 transition-all"
                )}
              >
                <Building2 className="size-3.5 text-primary" />
                <span>List a Creative Space</span>
              </Link>
            </div>
          </div>

          {/* Right Stats Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border/80 bg-surface-1/80 p-5 sm:p-7 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Award className="size-4 sm:size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">Platform Footprint</h4>
                    <span className="text-[10px] text-text-muted">Live marketplace statistics</span>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  Live Platform
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-4 sm:pt-5">
                {STATS.map((stat) => (
                  <div key={stat.label} className="p-2.5 sm:p-3 rounded-xl bg-surface-2/60 border border-border/50">
                    <span
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-lg sm:text-2xl font-extrabold text-primary"
                    >
                      {stat.value}
                    </span>
                    <p className="text-[10px] sm:text-[11px] font-semibold text-text-primary mt-0.5 line-clamp-1">
                      {stat.label}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-text-muted mt-0.5 line-clamp-1">
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE HORIZONTAL SLIDER FOR 4 PILLARS (Prevents vertical scrolling fatigue) ── */}
        <div className="block sm:hidden relative -mx-4 px-4 pb-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center gap-1">
              <Sparkles className="size-3 text-primary" />
              <span>Core Values ({activeSlide + 1}/4)</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperInstance?.slidePrev()}
                aria-label="Previous Value"
                className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-surface-1 text-text-secondary active:scale-95"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => swiperInstance?.slideNext()}
                aria-label="Next Value"
                className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-surface-1 text-text-secondary active:scale-95"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Pagination]}
            slidesPerView={1.12}
            spaceBetween={12}
            centeredSlides={false}
            onSwiper={setSwiperInstance}
            onSlideChange={(s) => setActiveSlide(s.activeIndex)}
            className="!overflow-visible"
          >
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <SwiperSlide key={val.title} className="!h-auto">
                  <div
                    className={cn(
                      "flex flex-col justify-between h-full rounded-2xl p-4.5",
                      "border border-border/80 bg-surface-1/90 backdrop-blur-xl shadow-md"
                    )}
                  >
                    <div>
                      <div className="flex size-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary mb-3">
                        <Icon className="size-4.5" />
                      </div>
                      <h4
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-xs font-bold text-text-primary"
                      >
                        {val.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] text-text-secondary leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex justify-center items-center gap-1.5 mt-4">
            {CORE_VALUES.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperInstance?.slideTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeSlide === i ? "w-5 bg-primary" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP GRID (4 Pillars) ── */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className={cn(
                  "flex flex-col justify-between rounded-2xl p-5 sm:p-6",
                  "border border-border/70 bg-surface-1/60 backdrop-blur-md",
                  "transition-all duration-300 hover:border-primary/40 hover:bg-surface-2/70 hover:shadow-lg"
                )}
              >
                <div>
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary mb-3 sm:mb-4">
                    <Icon className="size-4.5 sm:size-5" />
                  </div>
                  <h4
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-xs sm:text-sm font-bold text-text-primary"
                  >
                    {val.title}
                  </h4>
                  <p className="mt-2 text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
