"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Sparkles,
  Building2,
  SlidersHorizontal,
  X,
  Search,
  Camera,
  Film,
  Mic2,
  Music4,
  Palette,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StudioCard } from "@/components/studios/StudioCard";
import { API_BASE_URL, STUDIO_CATEGORIES, StudioListing } from "@/types/studio";
import { StudioCardSkeleton, StudioLogoSpinner } from "@/components/shared/LoadingSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";

interface CategoryBadgeConfig {
  label: string;
  category: string;
  icon: React.ElementType;
}

const CATEGORY_BADGES: CategoryBadgeConfig[] = [
  { label: "All Studios", category: "All", icon: Layers },
  { label: "Photo Studios", category: "Photo Studios", icon: Camera },
  { label: "Sound Stages", category: "Sound Stages", icon: Film },
  { label: "Podcast Rooms", category: "Podcast Rooms", icon: Mic2 },
  { label: "Music Suites", category: "Music Suites", icon: Music4 },
  { label: "Art Workshops", category: "Art Workshops", icon: Palette },
];

function StudiosListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategoryParam = searchParams.get("category");
  // Match parameter to categories or default to "All"
  const matchedCategory = STUDIO_CATEGORIES.includes(initialCategoryParam as any)
    ? (initialCategoryParam as string)
    : "All";

  const [selectedCategory, setSelectedCategory] = useState<string>(matchedCategory);
  const [studios, setStudios] = useState<StudioListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state if URL search param changes
  useEffect(() => {
    const param = searchParams.get("category");
    if (param && STUDIO_CATEGORIES.includes(param as any)) {
      setSelectedCategory(param);
    } else if (!param) {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Fetch all studios from backend
  useEffect(() => {
    async function fetchStudios() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/studios`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setStudios(data);

        }
      } catch (err) {
        console.error("Error loading studios:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudios();
  }, []);

  // Handle badge click (acts as category filter / sort)
  const handleBadgeClick = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      router.push("/studios", { scroll: false });
    } else {
      router.push(`/studios?category=${encodeURIComponent(category)}`, {
        scroll: false,
      });
    }
  };

  // Filter studios based on category badge & search query
  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const matchesCategory =
        selectedCategory === "All" || studio.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studio.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studio.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studio.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [studios, selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: studios.length };
    STUDIO_CATEGORIES.forEach((cat) => {
      counts[cat] = studios.filter((s) => s.category === cat).length;
    });
    return counts;
  }, [studios]);

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 size-[400px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Verified Production Spaces</span>
            </div>

            {/* Standard H3 heading with font-bold & xl size as requested */}
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
            >
              Explore Creative Studios
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
              Discover and book peer-to-peer soundstages, photography lofts, vocal booths, and creator ateliers.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, city, location..."
              className={cn(
                "h-9.5 w-full rounded-xl border border-border/80 bg-surface-1/90 pl-8.5 pr-8 text-xs text-text-primary",
                "focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted"
              )}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Category Badges Sort / Filter Section ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <SlidersHorizontal className="size-3 text-primary" />
              <span>Filter by Studio Category</span>
            </p>
            <span className="text-xs text-text-secondary">
              Showing{" "}
              <strong className="text-text-primary">{filteredStudios.length}</strong>{" "}
              {filteredStudios.length === 1 ? "studio" : "studios"}
            </span>
          </div>

          {/* Badges list */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_BADGES.map((badge) => {
              const Icon = badge.icon;
              const isSelected = selectedCategory === badge.category;
              const count = categoryCounts[badge.category] ?? 0;

              return (
                <button
                  key={badge.category}
                  type="button"
                  onClick={() => handleBadgeClick(badge.category)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer",
                    isSelected
                      ? "border border-primary bg-primary text-primary-fg shadow-sm shadow-primary/25 scale-[1.02]"
                      : "border border-border/70 bg-surface-1/80 text-text-secondary hover:text-text-primary hover:border-primary/40 hover:bg-surface-2"
                  )}
                >
                  <Icon className={cn("size-3.5", isSelected ? "text-primary-fg" : "text-primary")} />
                  <span>{badge.label}</span>
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
        </div>

        {/* ── Studios Cards Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filteredStudios.map((studio) => {
              const key =
                typeof studio._id === "object" && studio._id !== null
                  ? (studio._id as { $oid: string }).$oid
                  : studio._id || studio.title;
              return <StudioCard key={key} studio={studio} />;
            })}
          </div>
        ) : (
          /* Empty State */
          <EmptyState
            icon={Building2}
            title={`No studios found in ${selectedCategory === "All" ? "this query" : selectedCategory}`}
            description="We couldn't find workspaces matching your current selection. Try resetting filters or search terms, or be the first to host one."
            action={{
              label: "Reset Filters",
              onClick: () => {
                setSelectedCategory("All");
                setSearchQuery("");
                router.push("/studios", { scroll: false });
              },
              icon: SlidersHorizontal,
            }}
            secondaryAction={{
              label: "Add Studio Space",
              href: "/add-studio",
              icon: ArrowRight,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
          <StudioLogoSpinner size="md" label="Loading creative studios..." />
        </div>
      }
    >
      <StudiosListContent />
    </Suspense>
  );
}
