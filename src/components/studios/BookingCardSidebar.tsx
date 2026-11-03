"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck, Sparkles, Ban } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudioListing } from "@/types/studio";
import { BookingModal } from "@/components/studios/BookingModal";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface BookingCardSidebarProps {
  studio: StudioListing;
}

export function BookingCardSidebar({ studio }: BookingCardSidebarProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [isBookedState, setIsBookedState] = useState<boolean>(studio.isBooked === true);

  const isBooked = isBookedState || studio.isBooked === true;

  const studioId =
    typeof studio._id === "object" && studio._id !== null
      ? (studio._id as { $oid: string }).$oid
      : studio._id || "";

  const rating = typeof studio.rating === "number" ? studio.rating : 4.9;
  const minHours = studio.minimumBookingHours || 1;
  const securityDeposit = typeof studio.securityDeposit === "number" ? studio.securityDeposit : 0;
  const cancelHours = studio.cancellationNoticeHours || 24;

  const handleOpenBooking = () => {
    // If studio is already booked, do not allow opening the modal
    if (isBooked) {
      toast.error("Unavailable", {
        description: "This studio is already booked and currently unavailable.",
      });
      return;
    }

    // If not logged in, redirect directly to login with callback URL
    if (!session?.user) {
      toast.info("Sign in required", {
        description: "Please log in to continue booking this workspace.",
      });
      const callback = `/studios/${studioId}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(callback)}`);
      return;
    }

    setModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setIsBookedState(true);
    setModalOpen(false);
  };

  return (
    <>
      <Card className="rounded-2xl border border-border/80 bg-surface-1/95 p-5 sm:p-6 shadow-xl backdrop-blur-xl space-y-5 ring-0 gap-0">
        {/* Hourly Rate Display */}
        <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
          <div>
            <span className="text-3xl font-black text-text-primary tracking-tight">
              ${studio.hourlyRate}
            </span>
            <span className="text-xs text-text-muted font-medium ml-1.5">/ hour</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-text-primary">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Booking Info / Guidelines */}
        <div className="space-y-2.5 text-xs text-text-secondary border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <span>Minimum booking</span>
            <span className="font-semibold text-text-primary">
              {minHours} {minHours === 1 ? "hour" : "hours"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Security deposit</span>
            <span className="font-semibold text-text-primary">
              ${securityDeposit}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Cancellation window</span>
            <span className="font-semibold text-text-primary">
              {cancelHours} hrs prior
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Availability</span>
            <span
              className={
                isBooked
                  ? "font-semibold text-rose-500 dark:text-rose-400"
                  : "font-semibold text-emerald-500"
              }
            >
              {isBooked ? "Booked" : "Available"}
            </span>
          </div>
        </div>

        {/* Unavailable alert banner when isBooked is true */}
        {isBooked && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2.5">
            <Ban className="size-4 shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">
              This studio is already booked and currently unavailable.
            </p>
          </div>
        )}

        {/* Book the workspace button */}
        <Button
          type="button"
          disabled={isBooked}
          onClick={handleOpenBooking}
          className={`w-full flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-sm font-bold transition-all ${
            isBooked
              ? "bg-muted text-muted-foreground border border-border/60 cursor-not-allowed opacity-75 shadow-none hover:bg-muted"
              : "bg-primary text-primary-fg shadow-lg hover:bg-primary-hover hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-98 cursor-pointer"
          }`}
        >
          {isBooked ? (
            <>
              <Ban className="size-4" />
              <span>Currently Unavailable</span>
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              <span>Book the workspace</span>
            </>
          )}
        </Button>

        <p className="text-[11px] text-center text-text-muted">
          {isBooked
            ? "New reservations cannot be placed while this studio is booked."
            : "You won't be charged immediately. You can review all details in the reservation modal."}
        </p>
      </Card>

      {/* Booking Dialog Modal */}
      <BookingModal
        studio={{ ...studio, isBooked }}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onBookingSuccess={handleBookingSuccess}
      />
    </>
  );
}

