"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CalendarCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle2,
  Hourglass,
  Sparkles,
  ArrowUpRight,
  DollarSign,
  User,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { API_BASE_URL, BookingReservation, StudioListing } from "@/types/studio";
import { authClient, useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const userEmail = user?.email;

  const [studios, setStudios] = useState<StudioListing[]>([]);
  const [bookings, setBookings] = useState<BookingReservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch host's studios and creator's bookings in parallel
  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    async function loadDashboardData() {
      setLoading(true);
      try {

        const { data, error } = await authClient.token();

        const token = data?.token;
        const [studiosRes, bookingsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/my-studio-listings/${userEmail}`, {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${token}`,
            }
          }).catch(() => null),
          fetch(`${API_BASE_URL}/bookings/${userEmail}`, {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${token}`,
            }
          }).catch(() => null),
        ]);

        if (studiosRes && studiosRes.ok) {
          const studiosData = await studiosRes.json();
          if (Array.isArray(studiosData)) setStudios(studiosData);
          else if (Array.isArray(studiosData.studios)) setStudios(studiosData.studios);
          else if (Array.isArray(studiosData.data)) setStudios(studiosData.data);
        }

        if (bookingsRes && bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          let list: BookingReservation[] = [];
          if (Array.isArray(bookingsData)) list = bookingsData;
          else if (Array.isArray(bookingsData.bookings)) list = bookingsData.bookings;
          else if (Array.isArray(bookingsData.data)) list = bookingsData.data;

          setBookings(list);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [userEmail]);

  // Compute key metrics cleanly
  const activeBookingsCount = bookings.filter(
    (b) => (b.status || "").toLowerCase() === "pending" || (b.status || "").toLowerCase() === "confirmed"
  ).length;

  const totalSpent = bookings.reduce((acc, curr) => acc + (Number(curr.totalCost) || 0), 0);

  const greetingName = user?.name ? user.name.split(" ")[0] : "Creator";

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 size-[400px] rounded-full bg-primary/6 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl z-10 space-y-6 sm:space-y-8">
        {/* ── Welcome Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
            >
              Welcome back, {greetingName}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              Here is an overview of your listed studio spaces and creative booking reservations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link href="/studios">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-xl text-xs font-semibold border-border bg-surface-1 text-text-secondary hover:text-text-primary hover:bg-surface-2 cursor-pointer"
              >
                <span>Browse Studios</span>
              </Button>
            </Link>

            <Link href="/add-studio">
              <Button
                size="sm"
                className="h-9 px-4 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:bg-primary-hover shadow-md cursor-pointer"
              >
                <Plus className="size-3.5 mr-1.5" />
                <span>Add Studio</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ── 3 Essential Summary Metric Cards (Clean & Not overcrowded) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Studios Owned */}
          <Card className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 shadow-sm backdrop-blur-md ring-0 gap-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">My Studios</span>
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-black text-text-primary">
                {loading ? "—" : studios.length}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                {studios.length === 1 ? "Listed production space" : "Listed production spaces"}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50">
              <Link
                href="/my-studio-listings"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                <span>Manage listings</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </Card>

          {/* Card 2: Active Reservations */}
          <Card className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 shadow-sm backdrop-blur-md ring-0 gap-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">Active Bookings</span>
              <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <CalendarCheck className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-black text-text-primary">
                {loading ? "—" : activeBookingsCount}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Pending or confirmed reservations
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50">
              <Link
                href="/my-bookings"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                <span>View all bookings</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </Card>

          {/* Card 3: Total Booking Spend */}
          <Card className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 shadow-sm backdrop-blur-md ring-0 gap-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">Booking Activity</span>
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-black text-text-primary">
                {loading ? "—" : `$${totalSpent}`}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Total creative production investment
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50">
              <Link
                href="/studios"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                <span>Explore new venues</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </Card>
        </div>

        {/* ── 2 Main Grid Columns (Recent Bookings on Left, My Spaces on Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Section A: Recent Bookings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Recent Bookings
              </h4>
              <Link
                href="/my-bookings"
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                See all
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Card key={i} className="h-24 rounded-2xl border border-border/60 bg-surface-1/40 animate-pulse ring-0" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <Card className="rounded-2xl border border-dashed border-border/80 bg-surface-1/50 p-6 text-center ring-0 gap-0">
                <p className="text-xs font-semibold text-text-primary">No booking reservations yet</p>
                <p className="text-[11px] text-text-muted mt-1">
                  Discover peer-to-peer studios and book by the hour with instant confirmation.
                </p>
                <div className="mt-4">
                  <Link href="/studios">
                    <Button size="sm" className="text-xs h-8 px-4 rounded-xl bg-primary text-primary-fg hover:bg-primary-hover shadow-md hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer font-bold">
                      <Compass className="size-3.5 mr-1.5" />
                      <span>Explore Studios</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => {
                  const id = typeof booking._id === "object" ? booking._id.$oid : booking._id || "";
                  const status = (booking.status || "Pending").toLowerCase();
                  const displayImage =
                    booking.studioImage ||
                    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&auto=format&fit=crop";

                  return (
                    <Card
                      key={id}
                      className="rounded-2xl border border-border/80 bg-surface-1/90 p-3.5 shadow-xs backdrop-blur-md ring-0 gap-0 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Studio Workspace Thumbnail Image */}
                        <div
                          className="size-12 rounded-xl bg-cover bg-center shrink-0 border border-border/60 bg-surface-2"
                          style={{ backgroundImage: `url(${displayImage})` }}
                        />

                        <div className="flex-1 min-w-0 space-y-1">
                          <Link
                            href={`/studios/${booking.studioId}`}
                            className="font-bold text-xs sm:text-sm text-text-primary hover:text-primary transition-colors line-clamp-1"
                          >
                            {booking.studioTitle}
                          </Link>
                          <div className="flex items-center gap-3 text-[11px] text-text-secondary">
                            <span className="flex items-center gap-1">
                              <Clock className="size-3 text-text-muted" />
                              {booking.bookingDate} • {booking.startTime}
                            </span>
                            <span className="font-semibold text-text-primary">
                              ${booking.totalCost}
                            </span>
                          </div>
                        </div>

                        {/* Status Label (Clean & Minimal) */}
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-lg text-[10px] font-bold border shrink-0",
                            status === "confirmed" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                            status === "pending" && "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
                            status === "cancelled" && "border-destructive/30 bg-destructive/10 text-destructive",
                            status === "completed" && "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          )}
                        >
                          {booking.status || "Pending"}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section B: My Listed Studios */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                My Studio Listings
              </h4>
              <Link
                href="/my-studio-listings"
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Manage all
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Card key={i} className="h-24 rounded-2xl border border-border/60 bg-surface-1/40 animate-pulse ring-0" />
                ))}
              </div>
            ) : studios.length === 0 ? (
              <Card className="rounded-2xl border border-dashed border-border/80 bg-surface-1/50 p-6 text-center ring-0 gap-0">
                <p className="text-xs font-semibold text-text-primary">No spaces listed yet</p>
                <p className="text-[11px] text-text-muted mt-1">
                  List your creative photography loft, sound stage, or podcast studio to earn hourly revenue.
                </p>
                <div className="mt-4">
                  <Link href="/add-studio">
                    <Button size="sm" className="text-xs h-8 px-3 rounded-lg bg-primary text-primary-fg hover:bg-primary-hover cursor-pointer font-bold">
                      <Plus className="size-3 mr-1" />
                      <span>List a Studio</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                {studios.slice(0, 3).map((studio) => {
                  const id = typeof studio._id === "object" ? studio._id.$oid : studio._id || "";
                  const displayImage = studio.images?.[0] || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&auto=format&fit=crop";

                  return (
                    <Card
                      key={id}
                      className="rounded-2xl border border-border/80 bg-surface-1/90 p-3.5 shadow-xs backdrop-blur-md ring-0 gap-0 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="size-11 rounded-xl bg-cover bg-center shrink-0 border border-border/60"
                          style={{ backgroundImage: `url(${displayImage})` }}
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/studios/${id}`}
                            className="font-bold text-xs sm:text-sm text-text-primary hover:text-primary transition-colors line-clamp-1"
                          >
                            {studio.title}
                          </Link>
                          <div className="flex items-center gap-2 text-[11px] text-text-secondary mt-0.5">
                            <span className="truncate">{studio.city || studio.location}</span>
                            <span>•</span>
                            <span className="font-semibold text-text-primary">
                              ${studio.hourlyRate}/hr
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/studios/${id}`}
                          className="flex size-7 items-center justify-center rounded-lg border border-border/70 text-text-muted hover:text-primary hover:border-primary/50 transition-colors shrink-0"
                          title="View Studio"
                        >
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
