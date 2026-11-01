import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Building2 } from "lucide-react";
import { StudioCard } from "@/components/studios/StudioCard";
import { API_BASE_URL, StudioListing } from "@/types/studio";

async function getFeaturedStudios(): Promise<StudioListing[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/featured-studios`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch featured studios:", res.status);
      return [];
    }

    const data = await res.json();
    // Return array safely if wrapped in { studios: [...] } or direct array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.studios)) return data.studios;
    if (Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching featured studios:", error);
    return [];
  }
}

export async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 border-b border-border/60 bg-surface-1/30 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-10 size-[500px] rounded-full bg-accent/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-primary mb-2.5 shadow-xs">
              <Sparkles className="size-3.5" />
              <span>Top Rated Creative Spaces</span>
            </div>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
            >
              Featured <span className="text-gradient">Studio Spaces</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Hand-picked, top-reviewed production spaces with transparent hourly pricing and instant confirmation.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover group shrink-0"
          >
            <span>View All Studios</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── RESPONSIVE STUDIOS GRID ── */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {studios.map((studio) => {
              const key =
                typeof studio._id === "object" && studio._id !== null
                  ? (studio._id as { $oid: string }).$oid
                  : studio._id || studio.title;
              return <StudioCard key={key} studio={studio} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-border/70 bg-surface-1/60">
            <Building2 className="size-12 text-text-muted mb-3" />
            <h3 className="text-base font-semibold text-text-primary">No studios available yet</h3>
            <p className="text-xs text-text-secondary mt-1 max-w-sm">
              Be the first host to list a creative space and start welcoming creators today.
            </p>
            <Link
              href="/add-studio"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:bg-primary-hover transition-colors"
            >
              <span>List Your Studio</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
