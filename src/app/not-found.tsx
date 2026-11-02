import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Background ambient decorative light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[420px] sm:size-[560px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full mx-auto text-center space-y-6">
        {/* Creative Studio 404 Illustration / Art */}
        <div className="relative mx-auto size-52 sm:size-64 flex items-center justify-center">
          {/* Subtle glowing backdrop circle */}
          <div className="absolute inset-0 rounded-full bg-surface-1/80 border border-border/80 shadow-2xl backdrop-blur-md" />

          {/* Studio Set Illustration in SVG */}
          <svg
            className="relative size-40 sm:size-48 text-text-primary"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Studio Floor Line */}
            <path
              d="M20 160h160"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-border"
            />

            {/* Studio Backdrop Paper Roll & Stand */}
            <path
              d="M45 40h110v105a10 10 0 0 1-10 10H55a10 10 0 0 1-10-10V40z"
              fill="currentColor"
              className="text-surface-2/70"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Backdrop stand poles */}
            <path
              d="M40 30v130M160 30v130"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-primary/70"
            />
            {/* Top crossbar */}
            <path
              d="M35 36h130"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-primary"
            />
            {/* Stand tripod feet */}
            <path
              d="M40 160l-12 15M40 160l12 15M160 160l-12 15M160 160l12 15"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-text-muted"
            />

            {/* Studio Spotlight Left */}
            <g className="text-primary animate-pulse">
              <path
                d="M30 65l22 14-8 12-22-14 8-12z"
                fill="currentColor"
                className="text-primary"
              />
              <path
                d="M48 75l35 30-15 25-35-30z"
                fill="currentColor"
                className="text-primary/15"
              />
            </g>

            {/* Cinema Camera on Tripod Center-Right */}
            <g className="text-text-primary">
              {/* Camera Body */}
              <rect
                x="88"
                y="95"
                width="28"
                height="18"
                rx="3"
                fill="currentColor"
                className="text-surface-1"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Camera Lens */}
              <path
                d="M116 100l10-4v16l-10-4v-8z"
                fill="currentColor"
                className="text-primary"
              />
              {/* Film Reels on top */}
              <circle
                cx="96"
                cy="90"
                r="5"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary/80"
              />
              <circle
                cx="107"
                cy="90"
                r="5"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary/80"
              />
              {/* Tripod legs */}
              <path
                d="M102 113v47M102 113l-14 47M102 113l14 47"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-text-secondary"
              />
            </g>

            {/* Sound Wave / Acoustic Lines */}
            <path
              d="M75 110v10M70 105v20M65 112v6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-amber-400"
            />

            {/* Floating 404 Badge */}
            <g transform="translate(130, 48)">
              <rect
                x="0"
                y="0"
                width="48"
                height="24"
                rx="6"
                fill="currentColor"
                className="text-primary"
              />
              <text
                x="24"
                y="16"
                textAnchor="middle"
                fontSize="12"
                fontWeight="800"
                fill="currentColor"
                className="text-primary-fg"
                fontFamily="var(--font-display)"
              >
                404
              </text>
            </g>
          </svg>
        </div>

        {/* Text Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
            <span>Studio Space Not Found</span>
          </div>

          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary tracking-tight"
          >
            Lights Out! This Stage Doesn&apos;t Exist.
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            The studio listing, workspace page, or creative room you are looking for has been moved, unpublished, or does not exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-xs sm:text-sm font-bold bg-primary text-primary-fg hover:bg-primary-hover shadow-lg hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-98 transition-all cursor-pointer"
            >
              <Home className="size-4" />
              <span>Return to Home</span>
            </Button>
          </Link>

          <Link href="/studios" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-xs sm:text-sm font-semibold border-border/80 bg-surface-1 text-text-primary hover:border-primary/50 hover:bg-surface-2 transition-all cursor-pointer"
            >
              <Compass className="size-4" />
              <span>Explore Studios</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

