"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Sparkles,
  Loader2,
  Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { API_BASE_URL, StudioListing } from "@/types/studio";
import { getTokenFromClient } from "@/lib/getToken";

interface BookingModalProps {
  studio: StudioListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ studio, open, onOpenChange }: BookingModalProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  // Form state
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState(studio.availability?.startTime || "10:00");
  const [endTime, setEndTime] = useState(studio.availability?.endTime || "14:00");
  const [expectedPersons, setExpectedPersons] = useState<number | "">("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safe studio ID extraction
  const studioId =
    typeof studio._id === "object" && studio._id !== null
      ? (studio._id as { $oid: string }).$oid
      : studio._id || "";

  const minBookingHours = studio.minimumBookingHours || 1;
  const securityDeposit = typeof studio.securityDeposit === "number" ? studio.securityDeposit : 0;
  const cancellationNoticeHours = studio.cancellationNoticeHours || 24;

  // Dynamic cost calculation based on booking hours
  const { totalHours, bookingCost, totalCost, isValidTimeRange } = useMemo(() => {
    if (!startTime || !endTime) {
      return { totalHours: 0, bookingCost: 0, totalCost: 0, isValidTimeRange: false };
    }

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const startMinutes = startH * 60 + (startM || 0);
    const endMinutes = endH * 60 + (endM || 0);

    const diffMinutes = endMinutes - startMinutes;
    if (diffMinutes <= 0) {
      return { totalHours: 0, bookingCost: 0, totalCost: 0, isValidTimeRange: false };
    }

    const hours = Math.round((diffMinutes / 60) * 10) / 10;
    const timeCost = Math.round(hours * studio.hourlyRate);
    const finalTotal = timeCost + securityDeposit;

    return {
      totalHours: hours,
      bookingCost: timeCost,
      totalCost: finalTotal,
      isValidTimeRange: true,
    };
  }, [startTime, endTime, studio.hourlyRate, securityDeposit]);

  // Minimum date allowed is today
  const todayString = new Date().toISOString().split("T")[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Private check: if not logged in, redirect to login with callback URL
    if (!user) {
      toast.info("Authentication Required", {
        description: "Please sign in to reserve this creative workspace.",
      });
      const callback = `/studios/${studioId}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(callback)}`);
      return;
    }

    if (!isValidTimeRange || totalHours <= 0) {
      toast.error("Invalid Booking Times", {
        description: "Ending time must be later than starting time.",
      });
      return;
    }

    if (totalHours < minBookingHours) {
      toast.error("Minimum Booking Duration Required", {
        description: `This workspace requires a minimum reservation of ${minBookingHours} hour${minBookingHours > 1 ? "s" : ""}.`,
      });
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      studioId,
      studioTitle: studio.title,
      studioCategory: studio.category,
      studioImage: studio.images?.[0] || "",
      hourlyRate: studio.hourlyRate,
      bookingDate,
      startTime,
      endTime,
      totalHours,
      bookingCost,
      securityDeposit,
      totalCost,
      cancellationNoticeHours,
      expectedPersons: Number(expectedPersons) || 1,
      specialRequirements: specialRequirements.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingPayload),
      });

      const resData = await res.json().catch(() => null);

      if (res.ok && (!resData || resData.success !== false)) {
        toast.success("Workspace Booking Requested!", {
          description: `Total: $${totalCost} for ${totalHours} hours. Host will confirm your slot.`,
        });
        onOpenChange(false);
        router.push("/my-bookings");
      } else {
        toast.error(resData?.message || "Failed to submit booking request.");
      }
    } catch (error) {
      console.error("Booking error:", error);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-lg p-4 sm:p-6 bg-surface-1 border border-border/80 shadow-2xl rounded-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
        showCloseButton={true}
      >
        <DialogHeader className="gap-1.5 text-left border-b border-border/60 pb-3.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/25 font-bold text-[10px] uppercase tracking-wider"
            >
              {studio.category}
            </Badge>

          </div>

          <DialogTitle
            style={{ fontFamily: "var(--font-display)" }}
            className="text-lg sm:text-2xl font-bold tracking-tight text-text-primary leading-snug"
          >
            Book {studio.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-text-secondary">
            Select your session schedule, guest headcount, and requirements for the host.
          </DialogDescription>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={handleBookingSubmit} className="space-y-4 pt-1">
          {/* Booking Date */}
          <div className="space-y-1.5">
            <Label htmlFor="bookingDate" className="text-xs font-semibold text-text-primary">
              <Calendar className="size-3.5 text-primary inline mr-1.5" />
              Booking Date *
            </Label>
            <Input
              id="bookingDate"
              type="date"
              min={todayString}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
              className="h-9 text-xs bg-surface-2/60 border-border/80 focus-visible:border-primary/70"
            />
          </div>

          {/* Operational Hours: Start & End Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="startTime" className="text-xs font-semibold text-text-primary">
                <Clock className="size-3.5 text-primary inline mr-1.5" />
                Start Time *
              </Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="h-9 text-xs bg-surface-2/60 border-border/80 focus-visible:border-primary/70"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="endTime" className="text-xs font-semibold text-text-primary">
                <Clock className="size-3.5 text-primary inline mr-1.5" />
                End Time *
              </Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="h-9 text-xs bg-surface-2/60 border-border/80 focus-visible:border-primary/70"
              />
            </div>
          </div>

          {/* Expected Persons */}
          <div className="space-y-1.5">
            <Label htmlFor="expectedPersons" className="text-xs font-semibold text-text-primary">
              <Users className="size-3.5 text-primary inline mr-1.5" />
              Expected Persons *
            </Label>
            <Input
              id="expectedPersons"
              type="number"
              min={1}
              max={typeof studio.capacity === "number" ? studio.capacity : 100}
              placeholder={`e.g. 5 (Max capacity: ${studio.capacity})`}
              value={expectedPersons}
              onChange={(e) =>
                setExpectedPersons(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
              className="h-9 text-xs bg-surface-2/60 border-border/80 focus-visible:border-primary/70"
            />
          </div>

          {/* Special Requirements / Note */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="specialRequirements" className="text-xs font-semibold text-text-primary">
                <FileText className="size-3.5 text-primary inline mr-1.5" />
                Notes & Special Requirements
              </Label>
              <span className="text-[10px] text-text-muted">Optional</span>
            </div>
            <Textarea
              id="specialRequirements"
              rows={2}
              placeholder="e.g. Bringing cinema cameras, heavy lighting equipment, props, or catering..."
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              className="text-xs bg-surface-2/60 border-border/80 focus-visible:border-primary/70 min-h-16"
            />
          </div>

          <Separator className="my-2 bg-border/60" />

          {/* ── Cost Breakdown Summary Card ── */}
          <div className="rounded-xl border border-border/70 bg-surface-2/50 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Hourly Rate</span>
              <span className="font-semibold text-text-primary">
                ${studio.hourlyRate} / hr
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>
                Estimated Duration{" "}
                <span className="text-[11px] text-text-muted">
                  (min {minBookingHours} hr{minBookingHours > 1 ? "s" : ""})
                </span>
              </span>
              <span className="font-semibold text-text-primary">
                {isValidTimeRange ? `${totalHours} hrs` : "Select times"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Time Booking Cost</span>
              <span className="font-semibold text-text-primary">
                ${bookingCost}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <span>Security Deposit</span>
                <span className="text-[10px] text-text-muted">(refundable)</span>
              </span>
              <span className="font-semibold text-text-primary">
                {securityDeposit > 0 ? `+$${securityDeposit}` : "$0"}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
              <span>Cancellation Window</span>
              <span>Up to {cancellationNoticeHours} hrs prior</span>
            </div>

            <Separator className="bg-border/60 my-1.5" />

            {/* Total Cost Display */}
            <div className="flex items-baseline justify-between pt-0.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Total Due
                </span>
                <p className="text-[10px] text-text-muted">Booking time + security deposit</p>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-primary">
                  ${totalCost}
                </span>
                <span className="text-[10px] text-text-muted ml-1">USD</span>
              </div>
            </div>
          </div>

          {/* Authentication Status Notice */}
          {!user && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[11px]">
              <Lock className="size-3.5 shrink-0" />
              <span>You will be prompted to log in before your reservation is finalized.</span>
            </div>
          )}

          {/* Modal Action CTA Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs h-9 rounded-xl border-border bg-surface-1 text-text-secondary hover:text-text-primary"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting || !isValidTimeRange}
              className="text-xs h-9 px-5 rounded-xl font-bold bg-primary text-primary-fg hover:bg-primary-hover shadow-md hover:shadow-primary/25 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  <span>Reserving Workspace...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 mr-1.5" />
                  <span>Confirm & Book</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

