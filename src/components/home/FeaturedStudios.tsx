"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { StudioCard, Studio } from "@/components/studios/StudioCard";

// 6 Top-Rated Featured Studios (Mock Data formatted identically to future MongoDB Schema)
export const FEATURED_STUDIOS_MOCK: Studio[] = [
  {
    _id: "studio-1",
    title: "Apex White Cyc Infinity Stage & Daylight Loft",
    category: "Photo Studios",
    hourlyRate: 75,
    rating: 4.96,
    reviewCount: 84,
    location: "Downtown Arts District, Los Angeles",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop",
    capacity: "Up to 25 people",
    isSuperhost: true,
  },
  {
    _id: "studio-2",
    title: "Skyline Audio Lab & Multi-Cam Podcast Lounge",
    category: "Podcast Rooms",
    hourlyRate: 60,
    rating: 4.98,
    reviewCount: 112,
    location: "Greenpoint, Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=900&auto=format&fit=crop",
    capacity: "Up to 8 people",
    isSuperhost: true,
  },
  {
    _id: "studio-3",
    title: "Stage 4 Cinema Soundstage with 3-Phase Power",
    category: "Sound Stages",
    hourlyRate: 140,
    rating: 4.92,
    reviewCount: 46,
    location: "Midtown West, Atlanta, GA",
    image: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=900&auto=format&fit=crop",
    capacity: "Up to 60 people",
  },
  {
    _id: "studio-4",
    title: "Resonance Dolby Atmos Music Suite & Vocal Booth",
    category: "Music Suites",
    hourlyRate: 85,
    rating: 4.97,
    reviewCount: 92,
    location: "East Nashville, TN",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=900&auto=format&fit=crop",
    capacity: "Up to 10 people",
    isSuperhost: true,
  },
  {
    _id: "studio-5",
    title: "The Industrial Clay & Ceramic Sculpture Atelier",
    category: "Art Workshops",
    hourlyRate: 50,
    rating: 4.89,
    reviewCount: 38,
    location: "West Loop, Chicago, IL",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop",
    capacity: "Up to 18 people",
  },
  {
    _id: "studio-6",
    title: "Neon Horizon RGB Pre-Lit Film & Music Stage",
    category: "Photo Studios",
    hourlyRate: 95,
    rating: 4.94,
    reviewCount: 63,
    location: "South End, Austin, TX",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop",
    capacity: "Up to 30 people",
    isSuperhost: true,
  },
];

export function FeaturedStudios() {
  const studios = FEATURED_STUDIOS_MOCK;

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 border-b border-border/60 bg-surface-1/30 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-10 size-[500px] rounded-full bg-accent/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-primary mb-2.5 shadow-xs">
              <Sparkles className="size-3.5" />
              <span>Top Rated Creative Spaces</span>
            </div>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
            >
              Featured <span className="text-gradient">Studio Spaces</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Hand-picked, top-reviewed production spaces with transparent hourly pricing and instant confirmation.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover group shrink-0"
          >
            <span>View All Studios</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── RESPONSIVE STUDIOS GRID (1 col mobile, 2 col tablet, 3 col desktop) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      </div>
    </section>
  );
}
