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
import { StudioListing } from "@/types/studio";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface StudioCardProps {
  studio: StudioListing;
  className?: string;
}

export function StudioCard({ studio, className }: StudioCardProps) {
  // Safe extraction of MongoDB _id (either string or {$oid: string})
  const studioId =
    typeof studio._id === "object" && studio._id !== null
      ? (studio._id as { $oid: string }).$oid
      : studio._id || "";

  // Primary image
  const displayImage =
    studio.images && studio.images.length > 0
      ? studio.images[0]
      : "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop";

  const rating = typeof studio.rating === "number" ? studio.rating : 4.9;

  const capacityText =
    typeof studio.capacity === "number"
      ? `Up to ${studio.capacity} guests`
      : studio.capacity || "Flexible";

  return (
    <Card
      className={cn(
        "group flex flex-col justify-between h-full rounded-2xl overflow-hidden p-0 gap-0 ring-0",
        "border border-border/80 bg-surface-1/80 shadow-sm backdrop-blur-md",
        "transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {/* ── Visual Media Area ── */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-2 shrink-0">
        <div
          className="size-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${displayImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges Bar: Left badges (Category, Verified) & Right rating badge */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-2 pointer-events-none">
          {/* Left Column: Line 1 (Category & Verified) + Line 2 (Booked if booked) */}
          <div className="flex flex-col items-start gap-1.5 min-w-0">
            {/* Line 1: Category & Verified */}
            <div className="flex items-center gap-1.5">
              <span className="rounded-lg bg-surface-1/95 backdrop-blur-md border border-border/70 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-text-primary shadow-xs shrink-0">
                {studio.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-primary text-primary-fg px-1.5 sm:px-2 py-0.5 text-[10px] font-bold shadow-xs shrink-0">
                <ShieldCheck className="size-3" />
                <span>Verified</span>
              </span>
            </div>

            {/* Line 2: Booked Badge (Always on second line when booked) */}
            {studio.isBooked === true && (
              <span className="inline-flex items-center rounded-lg bg-rose-600/95 text-white backdrop-blur-md px-2 py-0.5 text-[10px] font-bold shadow-xs">
                Booked
              </span>
            )}
          </div>

          {/* Right: Rating Badge with faint review text */}
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-surface-1/95 backdrop-blur-md border border-border/70 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-text-primary shadow-xs shrink-0">
            <Star className="size-3 sm:size-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-[9px] sm:text-[10px] font-normal text-text-muted/80 whitespace-nowrap select-none">
              (not reviewed yet)
            </span>
          </div>
        </div>

        {/* Price Tag with dark backing protection in light mode */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-lg font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ${studio.hourlyRate}
          </span>
          <span className="text-xs font-semibold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ml-1">/ hr</span>
        </div>
      </div>

      {/* ── Content Body (Equal Height Structured Layout) ── */}
      <CardContent className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-0">
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
              <span className="truncate">{studio.location || `${studio.city}, ${studio.state}`}</span>
            </div>

            <div className="flex items-center gap-1 text-text-muted text-[11px] shrink-0">
              <Users className="size-3" />
              <span>{capacityText}</span>
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
            href={`/studios/${studioId}`}
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
      </CardContent>
    </Card>
  );
}


