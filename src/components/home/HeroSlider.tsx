"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera,
  Mic2,
  Film,
  Building,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Swiper core & modules styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideData {
  id: string;
  tag: string;
  icon: React.ElementType;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  badgeText: string;
  badgePrice: string;
  image: string;
  accentGlow: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: "photography-soundstage",
    tag: "Photography & Commercial",
    icon: Camera,
    title: "Book Premier Photography &",
    highlight: "Cyc Wall Studios",
    subtitle: "High-spec infinity walls, pre-lit RGB soundstages, and ceiling grid systems.",
    description: "Designed for commercial campaigns, editorial portraiture, and music videos with full vehicle drive-in access and natural daylight control.",
    badgeText: "Apex Infinity Stage A",
    badgePrice: "from $75/hr",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    accentGlow: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "recording-podcast",
    tag: "Audio & Music Suites",
    icon: Mic2,
    title: "Acoustically Tuned Music &",
    highlight: "Podcast Lounges",
    subtitle: "Treated vocal booths, multi-cam podcast setups, and Dolby Atmos mastering suites.",
    description: "Plug-and-record your podcast with dedicated multi-camera 4K rigs, Shure SM7B mics, and broadcast-grade switcher systems with sound engineers on demand.",
    badgeText: "Skyline Audio Lab",
    badgePrice: "from $60/hr",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop",
    accentGlow: "rgba(139, 92, 246, 0.35)",
  },
  {
    id: "cinema-stages",
    tag: "Film & Virtual Production",
    icon: Film,
    title: "Cinema Sound Stages &",
    highlight: "Creative Warehouses",
    subtitle: "30ft clear ceiling heights, 3-phase power drops, and soundproofing for full crews.",
    description: "From indie short films to feature productions. Reserve vetted stages with green rooms, hair & makeup stations, grip trucks, and seamless load-in docks.",
    badgeText: "Warehouse 14 Stage B",
    badgePrice: "from $120/hr",
    image: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2096&auto=format&fit=crop",
    accentGlow: "rgba(245, 158, 11, 0.4)",
  },
];

export function HeroSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-background">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="relative h-[620px] sm:h-[660px] lg:h-[720px] w-full"
      >
        {HERO_SLIDES.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <SwiperSlide key={slide.id} className="relative h-full w-full">
              {/* Background Image with Cinematic Overlays */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Multi-layer studio lighting gradient overlays */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
                {/* Amber/Violet spot glow */}
                <div
                  className="absolute -top-32 -left-20 size-[500px] rounded-full blur-[140px] pointer-events-none"
                  style={{ background: slide.accentGlow }}
                />
              </div>

              {/* Slide Content Container */}
              <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-2xl lg:max-w-3xl">
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur-md mb-5 shadow-xs">
                    <Icon className="size-3.5 text-primary" />
                    <span>{slide.tag}</span>
                    <span className="size-1 rounded-full bg-primary" />
                    <span className="text-text-muted font-normal">Peer-to-Peer</span>
                  </div>

                  {/* Punchy Headline */}
                  <h1
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1] sm:leading-[1.12]"
                  >
                    {slide.title}{" "}
                    <span className="text-gradient block sm:inline">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-4 text-base sm:text-lg font-medium text-text-primary/90 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* Body description */}
                  <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Primary CTA Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <Link
                      href="/studios"
                      className={cn(
                        "group inline-flex items-center gap-2 h-11 px-6 rounded-xl",
                        "bg-primary text-primary-fg text-sm font-semibold shadow-md",
                        "hover:bg-primary-hover hover:shadow-[0_0_24px_rgba(245,158,11,0.45)]",
                        "active:scale-95 transition-all duration-200"
                      )}
                    >
                      <span>Explore Studios</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/studios"
                      className={cn(
                        "inline-flex items-center gap-2 h-11 px-5 rounded-xl",
                        "border border-border/80 bg-surface-1/70 backdrop-blur-md",
                        "text-text-primary text-sm font-medium",
                        "hover:border-primary/40 hover:bg-surface-2 hover:text-primary",
                        "active:scale-95 transition-all duration-200"
                      )}
                    >
                      <Building className="size-4 text-primary" />
                      <span>Host Your Space</span>
                    </Link>
                  </div>

                  {/* Quick Social Proof / Feature Highlights */}
                  <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-border/50 text-xs text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-500" />
                      <span>Instant Confirmation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-500" />
                      <span>Zero Hidden Studio Fees</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="size-4 text-primary" />
                      <span>$1M Host Protection</span>
                    </div>
                  </div>
                </div>

                {/* Floating Preview Card on Large Screens */}
                <div className="hidden lg:flex absolute right-8 bottom-16 flex-col gap-2 rounded-2xl border border-border/80 bg-surface-1/80 p-4 shadow-2xl backdrop-blur-xl w-72">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary">{slide.badgeText}</span>
                    <span className="font-bold text-primary">{slide.badgePrice}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time Dynamic Slots Available</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Navigation & Slide Indicators */}
        <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2.5">
          {/* Custom Arrows */}
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous Slide"
            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface-1/80 text-text-secondary backdrop-blur-md transition-all hover:border-primary/50 hover:bg-surface-2 hover:text-primary active:scale-90"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next Slide"
            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface-1/80 text-text-secondary backdrop-blur-md transition-all hover:border-primary/50 hover:bg-surface-2 hover:text-primary active:scale-90"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 ml-2">
            {HERO_SLIDES.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => swiperInstance?.slideToLoop(dotIndex)}
                aria-label={`Go to slide ${dotIndex + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === dotIndex
                    ? "w-7 bg-primary shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                    : "w-2 bg-border hover:bg-text-muted"
                )}
              />
            ))}
          </div>
        </div>
      </Swiper>
    </section>
  );
}

