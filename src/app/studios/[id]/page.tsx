import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Maximize2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Mail,
  User,
} from "lucide-react";
import { API_BASE_URL, StudioListing } from "@/types/studio";
import { StudioImageCarousel } from "@/components/studios/StudioImageCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { BookingCardSidebar } from "@/components/studios/BookingCardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getStudioDetails(id: string): Promise<StudioListing | null> {


  // const jwtToken = await auth.api.getToken({
  //   headers: await headers(),
  // })

  try {
    const res = await fetch(`${API_BASE_URL}/studios/${id}`, {
      cache: "no-store",
      // headers: {
      //   authorization: `Bearer ${jwtToken?.token}`,
      // }
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching studio details:", error);
    return null;
  }
}

export default async function StudioDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const studio = await getStudioDetails(id);

  if (!studio) {
    notFound();
  }

  const rating = typeof studio.rating === "number" ? studio.rating : 4.9;
  const reviewCount = typeof studio.reviewCount === "number" ? studio.reviewCount : 24;

  const hostName = studio.hostName || studio.userName || "Verified Host";
  const hostEmail = studio.hostEmail || studio.userEmail || "host@studiospace.com";

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 size-[400px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10 space-y-6 sm:space-y-8">
        {/* Back Link & Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ── Title & Meta Header ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-lg bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {studio.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-surface-2 border border-border/80 px-2.5 py-1 text-xs text-text-secondary">
                <ShieldCheck className="size-3.5 text-primary" />
                <span>Verified Studio</span>
              </span>
            </div>

            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary"
            >
              {studio.title}
            </h1>

            <div className="flex items-center gap-4 flex-wrap text-xs sm:text-sm text-text-secondary">
              <div className="flex items-center gap-1.5 text-text-primary font-semibold">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span>{rating.toFixed(1)}</span>
                <span className="text-text-muted font-normal">({reviewCount} reviews)</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>{studio.location || `${studio.city}, ${studio.state}`}</span>
              </div>
              {studio.address && (
                <>
                  <span className="text-border">•</span>
                  <span className="text-text-muted">{studio.address}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Photo Gallery Carousel ── */}
        <StudioImageCarousel images={studio.images || []} title={studio.title} />

        {/* ── Main Two-Column Layout (Content on Left, Booking Sticky Card on Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-2">
          {/* Left / Main Column: Workspace Content Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-border/80 bg-surface-1/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted font-medium">Capacity</p>
                  <p className="text-xs sm:text-sm font-bold text-text-primary">
                    Up to {studio.capacity} guests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Maximize2 className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted font-medium">Floor Area</p>
                  <p className="text-xs sm:text-sm font-bold text-text-primary">
                    {studio.workspaceSize || "Spacious layout"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted font-medium">Hours</p>
                  <p className="text-xs sm:text-sm font-bold text-text-primary">
                    {studio.availability
                      ? `${studio.availability.startTime || "09:00"} - ${studio.availability.endTime || "22:00"}`
                      : "Flexible hours"}
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Overview */}
            <div className="space-y-3">
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg sm:text-xl font-bold text-text-primary"
              >
                About this Studio
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {studio.overview}
              </p>
            </div>

            {/* Included Amenities */}
            {studio.amenities && studio.amenities.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border/60">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-base sm:text-lg font-bold text-text-primary"
                >
                  Included Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {studio.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-border/60 bg-surface-1 text-xs text-text-primary"
                    >
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment & Production Gear */}
            {studio.equipment && studio.equipment.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border/60">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-base sm:text-lg font-bold text-text-primary"
                >
                  Equipment & Gear Provided
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {studio.equipment.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-border/60 bg-surface-1 text-xs text-text-primary"
                    >
                      <Sparkles className="size-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operating Days */}
            {studio.availability?.days && studio.availability.days.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border/60">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-base sm:text-lg font-bold text-text-primary"
                >
                  Active Booking Days
                </h3>
                <div className="flex flex-wrap gap-2">
                  {studio.availability.days.map((day) => (
                    <span
                      key={day}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/30 bg-primary/10 text-xs font-semibold text-primary"
                    >
                      <Calendar className="size-3" />
                      <span>{day}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Host Information Card (At the bottom, showing Host Name & Email only) ── */}
            <div className="pt-6 border-t border-border/60">
              <Card className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 backdrop-blur-md ring-0 gap-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3">
                  Hosted by
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/15 border border-primary/30 text-primary font-bold text-sm">
                    {hostName.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <User className="size-3.5 text-text-muted" />
                      <p className="text-sm font-bold text-text-primary">{hostName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="size-3.5 text-text-muted" />
                      <p className="text-xs text-text-secondary">{hostEmail}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* ── Right Column: Booking Small Card (Below image, right of workspace content) ── */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <BookingCardSidebar studio={studio} />
          </div>
        </div>
      </div>
    </div>
  );
}

