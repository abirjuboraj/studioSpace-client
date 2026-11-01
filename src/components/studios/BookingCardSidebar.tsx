"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck, Sparkles } from "lucide-react";
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

  const studioId =
    typeof studio._id === "object" && studio._id !== null
      ? (studio._id as { $oid: string }).$oid
      : studio._id || "";

  const rating = typeof studio.rating === "number" ? studio.rating : 4.9;

  const handleOpenBooking = () => {
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

        {/* Booking Perks / Guarantee */}
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-center justify-between">
            <span>Minimum session</span>
            <span className="font-semibold text-text-primary">1 hour</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Instant confirmation</span>
            <span className="font-semibold text-emerald-500">Yes</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Cancellation</span>
            <span className="font-semibold text-text-primary">Free up to 48 hrs</span>
          </div>
        </div>

        {/* Book the workspace button */}
        <Button
          type="button"
          onClick={handleOpenBooking}
          className="w-full flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-sm font-bold bg-primary text-primary-fg shadow-lg hover:bg-primary-hover hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-98 transition-all cursor-pointer"
        >
          <Sparkles className="size-4" />
          <span>Book the workspace</span>
        </Button>

        <p className="text-[11px] text-center text-text-muted">
          You won&apos;t be charged immediately. You can review all details in the reservation modal.
        </p>
      </Card>

      {/* Booking Dialog Modal */}
      <BookingModal
        studio={studio}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}

