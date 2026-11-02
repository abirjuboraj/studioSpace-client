import React from "react";
import { cn } from "@/lib/utils";

export function StudioLogoSpinner({
  className,
  size = "md",
  label = "Loading...",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing ambient glow */}
        <div
          className={cn(
            sizeClasses[size],
            "absolute rounded-full bg-primary/20 blur-md animate-ping pointer-events-none"
          )}
        />

        {/* Outer spinning gradient ring */}
        <div
          className={cn(
            sizeClasses[size],
            "rounded-full border-2 border-primary/20 border-t-primary animate-spin"
          )}
        />

        {/* Center glowing logo mark */}
        <div
          className={cn(
            "absolute flex items-center justify-center rounded-full bg-surface-1 border border-primary/40 shadow-xs",
            size === "sm" ? "size-6" : size === "md" ? "size-9" : "size-12"
          )}
        >
          <svg
            className={cn(iconSizes[size], "text-primary")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>

      {label && (
        <p className="text-xs font-semibold text-text-secondary tracking-wide animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

export function StudioCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface-1/60 p-0 overflow-hidden shadow-xs animate-pulse">
      {/* Visual cover image */}
      <div className="relative h-48 w-full bg-surface-2/80" />
      {/* Body content */}
      <div className="p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-2/3 rounded-lg bg-surface-2" />
          <div className="h-5 w-14 rounded-full bg-surface-2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3.5 rounded-full bg-surface-2" />
          <div className="h-3 w-1/2 rounded-md bg-surface-2" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="h-5 w-20 rounded-md bg-surface-2" />
          <div className="h-5 w-24 rounded-md bg-surface-2" />
        </div>
        <div className="pt-3 border-t border-border/60 flex items-center justify-between">
          <div className="h-5 w-20 rounded-md bg-surface-2" />
          <div className="h-8 w-24 rounded-xl bg-surface-2" />
        </div>
      </div>
    </div>
  );
}

export function StudioDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-36 rounded-md bg-surface-2" />

      {/* Main hero image skeleton */}
      <div className="h-80 sm:h-96 w-full rounded-3xl bg-surface-2/80" />

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 w-3/4 rounded-xl bg-surface-2" />
          <div className="h-4 w-1/3 rounded-md bg-surface-2" />
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border border-border/60 bg-surface-1">
            <div className="h-10 rounded-lg bg-surface-2" />
            <div className="h-10 rounded-lg bg-surface-2" />
            <div className="h-10 rounded-lg bg-surface-2" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-surface-2" />
            <div className="h-4 w-5/6 rounded-md bg-surface-2" />
            <div className="h-4 w-2/3 rounded-md bg-surface-2" />
          </div>
        </div>

        <div className="h-80 rounded-2xl border border-border/70 bg-surface-1 p-6 space-y-4">
          <div className="h-8 w-1/2 rounded-lg bg-surface-2" />
          <div className="h-4 w-full rounded-md bg-surface-2" />
          <div className="h-4 w-full rounded-md bg-surface-2" />
          <div className="h-11 w-full rounded-xl bg-surface-2 mt-6" />
        </div>
      </div>
    </div>
  );
}

