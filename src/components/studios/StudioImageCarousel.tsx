"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface StudioImageCarouselProps {
  images: string[];
  title: string;
}

export function StudioImageCarousel({ images, title }: StudioImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
        ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/70 bg-surface-2 shadow-lg group">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".studio-carousel-prev",
          nextEl: ".studio-carousel-next",
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-primary !w-6 !rounded-full transition-all",
          bulletClass: "inline-block size-2 rounded-full bg-white/60 mx-1 cursor-pointer transition-all",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-[280px] sm:h-[400px] lg:h-[480px]"
      >
        {displayImages.map((src, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full">
            <div
              className="size-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
              role="img"
              aria-label={`${title} image ${idx + 1}`}
            />
            {/* Subtle bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows (shown when more than 1 image) */}
      {displayImages.length > 1 && (
        <>
          <button
            type="button"
            className="studio-carousel-prev absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/80 hover:scale-105 active:scale-95 disabled:opacity-0"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            className="studio-carousel-next absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/80 hover:scale-105 active:scale-95 disabled:opacity-0"
            aria-label="Next photo"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Photo Counter Badge */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white border border-white/10 shadow-sm">
            <ImageIcon className="size-3.5" />
            <span>
              {activeIndex + 1} / {displayImages.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

