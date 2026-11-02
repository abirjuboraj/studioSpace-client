"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

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
  const router = useRouter();
  const { data: session } = useSession();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHostSpaceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.info("Account Required", {
        description: "Please sign in to list and monetize your space.",
      });
      router.push("/login?callbackUrl=/add-studio");
      return;
    }
    router.push("/add-studio");
  };

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
        className="relative h-[490px] sm:h-[580px] lg:h-[700px] w-full"
      >
        {HERO_SLIDES.map((slide) => {
          const Icon = slide.icon;
          return (
            <SwiperSlide key={slide.id} className="relative h-full w-full">
              {/* Background Image with Cinematic Overlays */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Dark mode overlays */}
                <div className="hidden dark:block absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

                {/* Light mode: NO global overlay over the image! The image is 100% natural, crisp, and vivid on the right.
                    Only a smooth dark gradient on the left half behind the text content for crystal-clear readability. */}
                <div className="dark:hidden absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent w-full md:w-3/4 lg:w-3/5 pointer-events-none" />
                <div className="dark:hidden absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Amber/Violet spot glow (Dark mode only) */}
                <div
                  className="hidden dark:block absolute -top-32 -left-20 size-[350px] sm:size-[500px] rounded-full blur-[140px] pointer-events-none"
                  style={{ background: slide.accentGlow }}
                />
              </div>

              {/* Slide Content Container */}
              <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 z-10 py-6 sm:py-0">
                <div className="max-w-2xl lg:max-w-3xl">
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-primary backdrop-blur-md mb-3 sm:mb-5 shadow-xs">
                    <Icon className="size-3 sm:size-3.5 text-primary" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Headline */}
                  <h1
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white dark:text-text-primary leading-[1.15] sm:leading-[1.12]"
                  >
                    {slide.title}{" "}
                    <span className="text-gradient block sm:inline">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-2.5 sm:mt-4 text-xs sm:text-base lg:text-lg font-medium text-white/95 dark:text-text-primary/90 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {slide.subtitle}
                  </p>

                  {/* Body description (hidden on tiny screens to avoid excessive height) */}
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs lg:text-sm text-zinc-300 dark:text-text-secondary leading-relaxed max-w-xl hidden sm:block">
                    {slide.description}
                  </p>

                  {/* Primary CTA Buttons */}
                  <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                    <Link
                      href="/studios"
                      className={cn(
                        "group inline-flex items-center gap-1.5 sm:gap-2 h-9 sm:h-11 px-4 sm:px-6 rounded-xl",
                        "bg-primary text-primary-fg text-xs sm:text-sm font-semibold shadow-md",
                        "hover:bg-primary-hover hover:shadow-[0_0_24px_rgba(245,158,11,0.45)]",
                        "active:scale-95 transition-all duration-200"
                      )}
                    >
                      <span>Explore Studios</span>
                      <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleHostSpaceClick}
                      className={cn(
                        "inline-flex items-center gap-1.5 sm:gap-2 h-9 sm:h-11 px-3.5 sm:px-5 rounded-xl cursor-pointer",
                        "border border-white/30 dark:border-border/80 bg-black/40 dark:bg-surface-1/70 backdrop-blur-md",
                        "text-white dark:text-text-primary text-xs sm:text-sm font-medium",
                        "hover:border-primary/50 hover:bg-black/60 dark:hover:bg-surface-2 hover:text-primary",
                        "active:scale-95 transition-all duration-200"
                      )}
                    >
                      <Building className="size-3.5 sm:size-4 text-primary" />
                      <span>Host Your Space</span>
                    </button>
                  </div>

                </div>

                {/* Floating Preview Card on Large Screens (Placed safely in mid-right to avoid overlaying carousel controls) */}
                <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-2.5 rounded-2xl border border-white/20 dark:border-border/80 bg-black/60 dark:bg-surface-1/80 p-4.5 shadow-2xl backdrop-blur-xl w-72">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white dark:text-text-primary">{slide.badgeText}</span>
                    <span className="font-bold text-primary">{slide.badgePrice}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-300 dark:text-text-muted">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Instant Booking Enabled</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Navigation & Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous Slide"
            className="flex size-7.5 sm:size-9 items-center justify-center rounded-lg sm:rounded-xl border border-border/80 bg-surface-1/80 text-text-secondary backdrop-blur-md transition-all hover:border-primary/50 hover:bg-surface-2 hover:text-primary active:scale-90"
          >
            <ChevronLeft className="size-3.5 sm:size-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next Slide"
            className="flex size-7.5 sm:size-9 items-center justify-center rounded-lg sm:rounded-xl border border-border/80 bg-surface-1/80 text-text-secondary backdrop-blur-md transition-all hover:border-primary/50 hover:bg-surface-2 hover:text-primary active:scale-90"
          >
            <ChevronRight className="size-3.5 sm:size-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1 sm:gap-1.5 ml-1 sm:ml-2">
            {HERO_SLIDES.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => swiperInstance?.slideToLoop(dotIndex)}
                aria-label={`Go to slide ${dotIndex + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === dotIndex
                    ? "w-5 sm:w-7 bg-primary shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                    : "w-1.5 sm:w-2 bg-border hover:bg-text-muted"
                )}
              />
            ))}
          </div>
        </div>
      </Swiper>
    </section>
  );
}
