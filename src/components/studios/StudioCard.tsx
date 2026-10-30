"use client";

import React from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Studio {
  _id: string;
  title: string;
  category: "Photo Studios" | "Sound Stages" | "Podcast Rooms" | "Music Suites" | "Art Workshops";
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  capacity: string;
  isSuperhost?: boolean;
}

interface StudioCardProps {
  studio: Studio;
  className?: string;
}

export function StudioCard({ studio, className }: StudioCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between h-full rounded-2xl overflow-hidden",
        "border border-border/80 bg-surface-1/80 shadow-sm backdrop-blur-md",
        "transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {/* ── Visual Media Area ── */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-2 shrink-0">
        <div
          className="size-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${studio.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1/90 via-transparent to-transparent" />

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[70%]">
          <span className="rounded-lg bg-surface-1/90 backdrop-blur-md border border-border/70 px-2.5 py-0.5 text-[11px] font-semibold text-text-primary shadow-xs">
            {studio.category}
          </span>
          {studio.isSuperhost && (
            <span className="flex items-center gap-1 rounded-lg bg-primary text-primary-fg px-2 py-0.5 text-[10px] font-bold shadow-xs">
              <ShieldCheck className="size-3" />
              <span>Superhost</span>
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-surface-1/90 backdrop-blur-md border border-border/70 px-2 py-0.5 text-[11px] font-bold text-text-primary shadow-xs">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>{studio.rating.toFixed(2)}</span>
          <span className="text-[10px] font-normal text-text-muted">({studio.reviewCount})</span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-lg font-extrabold text-white drop-shadow-md">
            ${studio.hourlyRate}
          </span>
          <span className="text-xs font-medium text-white/85 ml-1">/ hr</span>
        </div>
      </div>

      {/* ── Content Body (Equal Height Structured Layout) ── */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Full Title (No truncate, min-height for uniform alignment across cards) */}
          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className="text-sm sm:text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug min-h-[2.8rem]"
          >
            {studio.title}
          </h3>

          {/* Location & Capacity */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-text-secondary gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span className="truncate">{studio.location}</span>
            </div>

            <div className="flex items-center gap-1 text-text-muted text-[11px] shrink-0">
              <Users className="size-3" />
              <span>{studio.capacity}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[11px] text-text-muted">
            <Clock className="size-3 text-emerald-500" />
            <span>Instant Booking</span>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className={cn(
              "inline-flex items-center gap-1.5 h-8.5 px-3.5 rounded-xl text-xs font-semibold",
              "bg-primary text-primary-fg shadow-xs",
              "hover:bg-primary-hover active:scale-95 transition-all duration-200 shrink-0"
            )}
          >
            <span>View Details</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

