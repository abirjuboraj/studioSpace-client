"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Calendar,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  Eye,
  AlertCircle,
  XCircle,
  CheckCircle2,
  Hourglass,
  SlidersHorizontal,
  Search,
  Building2,
  DollarSign,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BookingReservation, BookingStatus } from "@/types/studio";

// Mock reservation entries purely for UI layout (ready for user to replace with real backend fetch)
const MOCK_BOOKINGS: BookingReservation[] = [
  {
    _id: "book-1",
    studioId: "6ae601ab20129dc8dbad9450",
    studioTitle: "Neon Horizon RGB Creative Photography Stage",
    studioCategory: "Photo Studios",
    studioImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop",
    hourlyRate: 95,
    bookingDate: "2026-11-12",
    startTime: "10:00",
    endTime: "14:00",
    totalHours: 4,
    totalCost: 380,
    expectedPersons: 6,
    specialRequirements: "Bringing full cinema camera rig and 3 light stands.",
    hostName: "Abir Hossen Juboraj",
    hostEmail: "abiryv10@gmail.com",
    status: "Pending",
    createdAt: "2026-11-01T12:00:00.000Z",
  },
  {
    _id: "book-2",
    studioId: "6ae601ab20129dc8dbad9451",
    studioTitle: "Skyline Audio Lab & Multi-Cam Podcast Lounge",
    studioCategory: "Podcast Rooms",
    studioImage:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=900&auto=format&fit=crop",
    hourlyRate: 60,
    bookingDate: "2026-11-08",
    startTime: "13:00",
    endTime: "16:00",
    totalHours: 3,
    totalCost: 180,
    expectedPersons: 4,
    hostName: "Elena Rostova",
    hostEmail: "elena@studiospace.com",
    status: "Confirmed",
    createdAt: "2026-10-28T09:30:00.000Z",
  },
  {
    _id: "book-3",
    studioId: "6ae601ab20129dc8dbad9452",
    studioTitle: "Resonance Dolby Atmos Music Suite & Vocal Booth",
    studioCategory: "Music Suites",
    studioImage:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=900&auto=format&fit=crop",
    hourlyRate: 85,
    bookingDate: "2026-10-20",
    startTime: "15:00",
    endTime: "18:00",
    totalHours: 3,
    totalCost: 255,
    expectedPersons: 2,
    hostName: "Marcus Vance",
    hostEmail: "marcus@studiospace.com",
    status: "Completed",
    createdAt: "2026-10-15T14:20:00.000Z",
  },
  {
    _id: "book-4",
    studioId: "6ae601ab20129dc8dbad9453",
    studioTitle: "Stage 4 Cinema Soundstage with 3-Phase Power",
    studioCategory: "Sound Stages",
    studioImage:
      "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=900&auto=format&fit=crop",
    hourlyRate: 140,
    bookingDate: "2026-10-10",
    startTime: "09:00",
    endTime: "15:00",
    totalHours: 6,
    totalCost: 840,
    expectedPersons: 15,
    hostName: "David Sterling",
    hostEmail: "david@studiospace.com",
    status: "Cancelled",
    createdAt: "2026-10-05T11:00:00.000Z",
  },
];

// Status badge helper function with corresponding styles and icons
function getStatusBadge(status: BookingStatus) {
  switch (status) {
    case "Pending":
      return (
        <Badge
          variant="outline"
          className="gap-1 border-amber-500/35 bg-amber-500/10 text-amber-500 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
        >
          <Hourglass className="size-3 animate-pulse" />
          <span>Pending</span>
        </Badge>
      );
    case "Confirmed":
      return (
        <Badge
          variant="outline"
          className="gap-1 border-emerald-500/35 bg-emerald-500/10 text-emerald-500 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
        >
          <CheckCircle2 className="size-3" />
          <span>Confirmed</span>
        </Badge>
      );
    case "Completed":
      return (
        <Badge
          variant="outline"
          className="gap-1 border-blue-500/35 bg-blue-500/10 text-blue-500 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
        >
          <CheckCircle2 className="size-3" />
          <span>Completed</span>
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge
          variant="outline"
          className="gap-1 border-destructive/35 bg-destructive/10 text-destructive font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
        >
          <XCircle className="size-3" />
          <span>Cancelled</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          {status}
        </Badge>
      );
  }
}

export default function MyBookingsPage() {
  // Pure UI state ready for your backend integration
  const [bookings, setBookings] = useState<BookingReservation[]>(MOCK_BOOKINGS);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const STATUS_FILTERS: Array<"All" | BookingStatus> = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  // Placeholder handler for canceling pending slots (ready for your API call)
  const handleCancelBooking = (bookingId: string) => {
    // UI optimistic update for demonstration
    setBookings((prev) =>
      prev.map((b) => {
        const id = typeof b._id === "object" ? b._id.$oid : b._id;
        return id === bookingId ? { ...b, status: "Cancelled" } : b;
      })
    );
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      selectedStatus === "All" || booking.status === selectedStatus;
    const matchesQuery =
      searchQuery.trim() === "" ||
      booking.studioTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.studioCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.hostName && booking.hostName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 size-[400px] rounded-full bg-primary/6 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl z-10 space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary mb-1 shadow-xs">
              <CalendarCheck className="size-3.5" />
              <span>Creator Bookings</span>
            </div>
            {/* Standard H3 heading */}
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
            >
              My Bookings & Reservations
            </h3>
            <p className="text-xs text-text-secondary max-w-xl">
              Track your studio reservation requests, confirmed dates, hourly breakdown, and booking statuses.
            </p>
          </div>

          <Link href="/studios">
            <Button
              variant="default"
              size="sm"
              className="h-9 px-4 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:bg-primary-hover shadow-md shrink-0 cursor-pointer"
            >
              <Building2 className="size-3.5 mr-1.5" />
              <span>Explore More Studios</span>
            </Button>
          </Link>
        </div>

        {/* ── Filter Bar: Status Badges & Quick Search ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Status Badges Sort / Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {STATUS_FILTERS.map((status) => {
              const isSelected = selectedStatus === status;
              const count =
                status === "All"
                  ? bookings.length
                  : bookings.filter((b) => b.status === status).length;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0",
                    isSelected
                      ? "border border-primary bg-primary text-primary-fg shadow-sm shadow-primary/20 scale-[1.02]"
                      : "border border-border/70 bg-surface-1/80 text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  )}
                >
                  <span>{status}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-surface-2 text-text-muted border border-border/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reservations..."
              className="h-9 text-xs bg-surface-1/90 pl-8.5 pr-3 rounded-xl border-border/80 focus-visible:border-primary/70"
            />
          </div>
        </div>

        {/* ── Bookings List Cards ── */}
        {filteredBookings.length === 0 ? (
          /* Empty State */
          <Card className="rounded-2xl border border-dashed border-border/80 bg-surface-1/60 p-8 sm:p-12 text-center backdrop-blur-xl ring-0 gap-0">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary mb-4 shadow-sm">
              <CalendarCheck className="size-7" strokeWidth={1.75} />
            </div>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-base sm:text-lg font-bold text-text-primary"
            >
              No bookings found in this category
            </h2>

            <p className="mt-1.5 text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
              You haven&apos;t reserved any studios under &quot;{selectedStatus}&quot;. Browse verified creator lofts and book by the hour with instant confirmation.
            </p>

            <div className="mt-6 flex justify-center">
              <Link href="/studios">
                <Button
                  size="sm"
                  className="h-10 px-6 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:bg-primary-hover shadow-md cursor-pointer"
                >
                  <span>Browse Available Studios</span>
                  <ArrowRight className="size-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const bookingId =
                typeof booking._id === "object" && booking._id !== null
                  ? (booking._id as { $oid: string }).$oid
                  : booking._id || "";

              const isPending = booking.status === "Pending";

              return (
                <Card
                  key={bookingId}
                  className="rounded-2xl border border-border/80 bg-surface-1/90 shadow-sm backdrop-blur-md overflow-hidden p-0 gap-0 ring-0 hover:border-primary/40 transition-all"
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
                    {/* Left: Thumbnail & Essential Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                      {/* Studio Thumbnail */}
                      <div
                        className="relative h-28 w-full sm:w-36 rounded-xl bg-surface-2 bg-cover bg-center shrink-0 border border-border/70 overflow-hidden"
                        style={{
                          backgroundImage: `url(${
                            booking.studioImage ||
                            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop"
                          })`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                        <div className="absolute top-2 left-2 sm:hidden">
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>

                      {/* Studio & Booking Details */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="hidden sm:inline-block">
                            {getStatusBadge(booking.status)}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase font-semibold text-text-muted border-border/70 bg-surface-2"
                          >
                            {booking.studioCategory}
                          </Badge>
                        </div>

                        <Link
                          href={`/studios/${booking.studioId}`}
                          className="block text-sm sm:text-base font-bold text-text-primary hover:text-primary transition-colors line-clamp-1"
                        >
                          {booking.studioTitle}
                        </Link>

                        {/* Schedule & Guest specs */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary pt-0.5">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-primary shrink-0" />
                            <span className="font-semibold text-text-primary">
                              {booking.bookingDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-primary shrink-0" />
                            <span>
                              {booking.startTime} - {booking.endTime} ({booking.totalHours} hrs)
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Users className="size-3.5 text-text-muted shrink-0" />
                            <span>{booking.expectedPersons} guests</span>
                          </div>
                        </div>

                        {/* Optional notes */}
                        {booking.specialRequirements && (
                          <p className="text-[11px] text-text-muted line-clamp-1 italic pt-0.5">
                            <FileText className="size-3 inline mr-1 text-primary" />
                            &ldquo;{booking.specialRequirements}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Middle Divider on Desktop */}
                    <div className="hidden lg:block h-16 w-px bg-border/60" />

                    {/* Right: Cost & Action Buttons */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-border/60 pt-3 lg:pt-0 gap-3 shrink-0">
                      {/* Price Display */}
                      <div className="text-left lg:text-right">
                        <span className="text-[11px] text-text-muted block">Total Reservation</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg sm:text-xl font-black text-text-primary">
                            ${booking.totalCost}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            (${booking.hourlyRate}/hr)
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Link href={`/studios/${booking.studioId}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 rounded-lg text-xs font-semibold border-border bg-surface-2 text-text-secondary hover:text-text-primary cursor-pointer"
                          >
                            <Eye className="size-3.5 mr-1" />
                            <span>View Studio</span>
                          </Button>
                        </Link>

                        {/* "Cancel Booking" option strictly for Pending slots as required */}
                        {isPending && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelBooking(bookingId)}
                            className="h-8 px-3 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            <XCircle className="size-3.5 mr-1" />
                            <span>Cancel Booking</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
