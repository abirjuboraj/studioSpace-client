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
  const reviewCount = typeof studio.reviewCount === "number" ? studio.reviewCount : 24;

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
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1/90 via-transparent to-transparent" />

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[70%]">
          <span className="rounded-lg bg-surface-1/90 backdrop-blur-md border border-border/70 px-2.5 py-0.5 text-[11px] font-semibold text-text-primary shadow-xs">
            {studio.category}
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-primary text-primary-fg px-2 py-0.5 text-[10px] font-bold shadow-xs">
            <ShieldCheck className="size-3" />
            <span>Verified</span>
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-surface-1/90 backdrop-blur-md border border-border/70 px-2 py-0.5 text-[11px] font-bold text-text-primary shadow-xs">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-[10px] font-normal text-text-muted">({reviewCount})</span>
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


