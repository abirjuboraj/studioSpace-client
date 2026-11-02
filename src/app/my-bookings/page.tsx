"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Eye,
  XCircle,
  CheckCircle2,
  Hourglass,
  Search,
  Building2,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { API_BASE_URL, BookingReservation, BookingStatus } from "@/types/studio";
import { authClient, useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getToken";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

// Status badge helper function (essential status indicator only)
function getStatusBadge(status: string) {
  const norm = (status || "").toLowerCase();
  if (norm === "pending") {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-amber-500/35 bg-amber-500/10 text-amber-500 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
      >
        <Hourglass className="size-3 animate-pulse" />
        <span>Pending</span>
      </Badge>
    );
  }
  if (norm === "confirmed") {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-emerald-500/35 bg-emerald-500/10 text-emerald-500 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
      >
        <CheckCircle2 className="size-3" />
        <span>Confirmed</span>
      </Badge>
    );
  }
  if (norm === "completed") {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-blue-500/35 bg-blue-500/10 text-blue-500 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
      >
        <CheckCircle2 className="size-3" />
        <span>Completed</span>
      </Badge>
    );
  }
  if (norm === "cancelled") {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-red-500/35 bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-[11px] px-2.5 py-0.5 rounded-lg"
      >
        <XCircle className="size-3 text-red-600 dark:text-red-400" />
        <span>Cancelled</span>
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs">
      {status || "Pending"}
    </Badge>
  );
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const STATUS_FILTERS: Array<"All" | BookingStatus> = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  const { data: session } = useSession();
  const userEmail = session?.user?.email;


  // Fetch real user bookings from backend
  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchMyBookings = async () => {
      setLoading(true);


      try {
        const token = await getTokenFromClient();
        const res = await fetch(`${API_BASE_URL}/bookings/${userEmail}`, {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          }
        });

        if (res.ok) {
          const data = await res.json();
          let rawList: BookingReservation[] = [];
          if (Array.isArray(data)) rawList = data;
          else if (Array.isArray(data.bookings)) rawList = data.bookings;
          else if (Array.isArray(data.data)) rawList = data.data;

          // Normalize status
          const enriched = rawList.map((item) => ({
            ...item,
            status: (item.status || "Pending") as BookingStatus,
          }));

          setBookings(enriched);
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [userEmail]);

  // Cancel booking handler
  const handleCancelBooking = async (bookingId: string) => {
    setIsCancelling(true);
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const resData = await res.json().catch(() => null);

      if (res.ok) {
        toast.success("Booking cancelled successfully", {
          description: "Your reservation status is now cancelled.",
        });
        // Update booking status in state rather than deleting it
        setBookings((prev) =>
          prev.map((booking) => {
            const id = typeof booking._id === "object" ? booking._id.$oid : booking._id;
            return id === bookingId ? { ...booking, status: "Cancelled" as BookingStatus } : booking;
          })
        );
        setCancelTarget(null);
      } else {
        toast.error("Failed to cancel booking", {
          description: resData?.message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Error", {
        description: "Network error occurred while cancelling booking.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        selectedStatus === "All" || booking.status === selectedStatus;
      const matchesQuery =
        searchQuery.trim() === "" ||
        booking.studioTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.studioCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (booking.hostName && booking.hostName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStatus && matchesQuery;
    });
  }, [bookings, selectedStatus, searchQuery]);

  return (
    <TooltipProvider delay={150}>
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

          {/* ── Filter Bar: Status Filters & Search (Shown when user has bookings) ── */}
          {!loading && bookings.length > 0 && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              {/* Status Pills */}
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
          )}

          {/* ── LOADING SKELETON ── */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="rounded-2xl border border-border/60 bg-surface-1/50 p-5 animate-pulse ring-0 gap-0"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="h-28 w-full sm:w-36 rounded-xl bg-surface-2 shrink-0" />
                    <div className="space-y-2.5 flex-1 w-full">
                      <div className="h-4 w-28 rounded-md bg-surface-2" />
                      <div className="h-5 w-3/4 rounded-md bg-surface-2" />
                      <div className="h-3 w-1/2 rounded-md bg-surface-2" />
                    </div>
                    <div className="h-10 w-28 rounded-xl bg-surface-2 shrink-0 self-end sm:self-center" />
                  </div>
                </Card>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            /* ── EMPTY STATE UI (User has no bookings at all) ── */
            <EmptyState
              icon={CalendarCheck}
              title="You haven't booked any studio spaces yet"
              description="Find photography lofts, podcast recording booths, art spaces, and sound stages. Reserve by the hour with transparent pricing."
              action={{
                label: "Browse Available Studios",
                href: "/studios",
                icon: ArrowRight,
              }}
            />
          ) : filteredBookings.length === 0 ? (
            /* Filtered empty state (User has bookings but not matching active filter) */
            <EmptyState
              icon={Search}
              title={`No reservations found under "${selectedStatus}"`}
              description="Try switching your status filter or clearing your search keywords to see other reservations."
              action={{
                label: "Reset Filters",
                onClick: () => {
                  setSelectedStatus("All");
                  setSearchQuery("");
                },
                icon: ArrowRight,
              }}
              secondaryAction={{
                label: "Browse Studios",
                href: "/studios",
              }}
            />
          ) : (
            /* ── Bookings List ── */
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const bookingId =
                  typeof booking._id === "object" && booking._id !== null
                    ? (booking._id as { $oid: string }).$oid
                    : booking._id || "";

                const isPending = (booking.status || "").toLowerCase() === "pending";

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
                            backgroundImage: `url(${booking.studioImage ||
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
                            <span className="text-[11px] font-medium text-text-muted">
                              {booking.studioCategory}
                            </span>
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

                        {/* Action Buttons with Shadcn Tooltips for Compact/Mobile Displays */}
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger
                              className="inline-flex"
                              render={
                                <Link href={`/studios/${booking.studioId}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-2.5 sm:px-3 rounded-lg text-xs font-semibold border-border bg-surface-2 text-text-secondary hover:text-text-primary cursor-pointer"
                                  >
                                    <Eye className="size-3.5" />
                                    <span className="hidden sm:inline ml-1">View Studio</span>
                                  </Button>
                                </Link>
                              }
                            />
                            <TooltipContent side="top">
                              <span>View Studio Details</span>
                            </TooltipContent>
                          </Tooltip>

                          {/* "Cancel Booking" option strictly for Pending slots with tooltip on icon */}
                          {isPending && (
                            <Tooltip>
                              <TooltipTrigger
                                className="inline-flex"
                                render={
                                  <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => setCancelTarget(bookingId)}
                                    className="h-8 px-2.5 sm:px-3 rounded-lg text-xs font-semibold cursor-pointer border border-red-500/30 bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/25 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                  >
                                    <XCircle className="size-3.5 text-red-500" />
                                    <span className="hidden sm:inline ml-1">Cancel Booking</span>
                                  </Button>
                                }
                              />
                              <TooltipContent side="top">
                                <span>Cancel this pending booking</span>
                              </TooltipContent>
                            </Tooltip>
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

        {/* Confirmation Modal for Cancelling Booking */}
        <Dialog open={!!cancelTarget} onOpenChange={(open) => !open && !isCancelling && setCancelTarget(null)}>
          <DialogContent className="sm:max-w-md bg-surface-1 border-border">
            <DialogHeader className="gap-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mb-1">
                <AlertTriangle className="size-5" />
              </div>
              <DialogTitle className="text-base sm:text-sm font-bold text-text-primary">
                Cancel this booking?
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Are you sure you want to cancel this pending studio reservation? Its status will be updated to Cancelled and the booking slot will be released.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-row items-center justify-end gap-2 pt-4 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isCancelling}
                onClick={() => setCancelTarget(null)}
                className="h-8 rounded-lg text-xs font-semibold cursor-pointer border-border hover:bg-surface-2"
              >
                Keep Booking
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isCancelling}
                onClick={() => cancelTarget && handleCancelBooking(cancelTarget)}
                className="h-8 rounded-lg text-xs font-semibold cursor-pointer border border-red-500/30 bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin mr-1.5" />
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
