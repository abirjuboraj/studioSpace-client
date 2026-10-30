"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Film,
  Mic2,
  Music4,
  Palette,
  ArrowRight,
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

export interface CategoryItem {
  id: string;
  name: string;
  queryParam: string;
  tagline: string;
  count: string;
  icon: React.ElementType;
  image: string;
  accent: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "photo-studios",
    name: "Photo Studios",
    queryParam: "Photo Studios",
    tagline: "Infinity cyc walls, natural light lofts & flash gear",
    count: "240+ spaces",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop",
    accent: "from-amber-500/20",
  },
  {
    id: "sound-stages",
    name: "Sound Stages",
    queryParam: "Sound Stages",
    tagline: "High-ceiling stages, green screens & cinema grid drops",
    count: "95+ spaces",
    icon: Film,
    image:
      "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=900&auto=format&fit=crop",
    accent: "from-violet-500/20",
  },
  {
    id: "podcast-rooms",
    name: "Podcast Rooms",
    queryParam: "Podcast Rooms",
    tagline: "Multi-cam 4K rigs, Shure SM7B mics & tuned acoustics",
    count: "180+ spaces",
    icon: Mic2,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=900&auto=format&fit=crop",
    accent: "from-amber-500/20",
  },
  {
    id: "music-suites",
    name: "Music Suites",
    queryParam: "Music Suites",
    tagline: "Mastering suites, vocal isolation booths & live rooms",
    count: "160+ spaces",
    icon: Music4,
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=900&auto=format&fit=crop",
    accent: "from-violet-500/20",
  },
  {
    id: "art-workshops",
    name: "Art Workshops",
    queryParam: "Art Workshops",
    tagline: "Ceramics, painting, sculpt lofts & creator ateliers",
    count: "110+ spaces",
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop",
    accent: "from-amber-500/20",
  },
];

export function StudioCategories() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 border-b border-border/60 bg-background overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/3 size-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-primary mb-2.5 shadow-xs">
              <Sparkles className="size-3.5" />
              <span>Curated Disciplines</span>
            </div>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
            >
              Browse by <span className="text-gradient">Studio Categories</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Find purpose-built spaces crafted specifically for your medium, workflow, and technical requirements.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover group shrink-0"
          >
            <span>All Categories</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── MOBILE HORIZONTAL SLIDER (Swiper) ── */}
        <div className="block sm:hidden relative -mx-4 px-4 pb-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
              {activeSlide + 1} of {CATEGORIES.length} Categories
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperInstance?.slidePrev()}
                aria-label="Previous Category"
                className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-surface-1 text-text-secondary active:scale-95"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => swiperInstance?.slideNext()}
                aria-label="Next Category"
                className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-surface-1 text-text-secondary active:scale-95"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Pagination]}
            slidesPerView={1.2}
            spaceBetween={12}
            centeredSlides={false}
            onSwiper={setSwiperInstance}
            onSlideChange={(s) => setActiveSlide(s.activeIndex)}
            className="!overflow-visible"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <SwiperSlide key={cat.id} className="!h-auto">
                  <Link
                    href={`/studios?category=${encodeURIComponent(cat.queryParam)}`}
                    className={cn(
                      "group relative flex flex-col justify-end h-72 rounded-2xl p-4.5 overflow-hidden",
                      "border border-border/80 bg-surface-1 shadow-md transition-all",
                      "active:scale-95"
                    )}
                  >
                    {/* Background visual image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${cat.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
                    <div className="absolute inset-0 bg-background/30" />

                    {/* Content overlay */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                          <Icon className="size-4" />
                        </div>
                        <span className="rounded-full border border-border/70 bg-surface-1/90 px-2 py-0.5 text-[10px] font-semibold text-text-secondary backdrop-blur-md">
                          {cat.count}
                        </span>
                      </div>

                      <h3
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-base font-bold text-text-primary"
                      >
                        {cat.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                        {cat.tagline}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] font-semibold text-primary">
                        <span>Explore spaces</span>
                        <ArrowRight className="size-3" />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {CATEGORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperInstance?.slideTo(i)}
                aria-label={`Go to category ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeSlide === i ? "w-5 bg-primary" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP GRID (5-Column Layout) ── */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.queryParam)}`}
                className={cn(
                  "group relative flex flex-col justify-end h-80 rounded-2xl p-5 overflow-hidden",
                  "border border-border/80 bg-surface-1/80 shadow-md backdrop-blur-md",
                  "transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl"
                )}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                {/* Gradients for readability in dark & light mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute inset-0 bg-background/25 transition-opacity group-hover:opacity-10" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-fg">
                      <Icon className="size-4.5" />
                    </div>
                    <span className="rounded-full border border-border/70 bg-surface-1/90 px-2.5 py-0.5 text-[10px] font-semibold text-text-secondary backdrop-blur-md">
                      {cat.count}
                    </span>
                  </div>

                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-base font-bold text-text-primary group-hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </h3>

                  <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                    <span>Explore spaces</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

