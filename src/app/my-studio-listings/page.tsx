"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  ArrowRight,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  Clock,
  Star,
  Users,
  LayoutGrid,
  Table as TableIcon,
  ShieldCheck,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { API_BASE_URL, StudioListing } from "@/types/studio";
import { authClient, useSession } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { getTokenFromClient } from "@/lib/getToken";

export default function MyStudiosPage() {
  const [userStudios, setUserStudios] = useState<StudioListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: session } = useSession();
  const hostEmail = session?.user?.email;

  useEffect(() => {
    if (!hostEmail) {
      setLoading(false);
      return;
    }

    async function getMyStudios() {
      setLoading(true);
      try {

        const token = await getTokenFromClient();

        const res = await fetch(`${API_BASE_URL}/my-studio-listings/${hostEmail}`, {
          headers: {
            authorization: `Bearer ${token}`,
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUserStudios(data);
        }
      } catch (err) {
        console.error("Error loading user studio listings:", err);
      } finally {
        setLoading(false);
      }
    }

    getMyStudios();
  }, [hostEmail]);

  // Filtered by search query
  const filteredStudios = userStudios.filter((studio) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      studio.title.toLowerCase().includes(q) ||
      studio.category.toLowerCase().includes(q) ||
      studio.city?.toLowerCase().includes(q) ||
      studio.location?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/3 size-[350px] sm:size-[450px] rounded-full bg-primary/6 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl z-10 space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>

            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
            >
              My Studio Listings
            </h3>
            <p className="mt-0.5 text-xs text-text-secondary">
              Manage your spaces, live booking availability, hourly rates, and studio profiles
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {userStudios.length > 0 && (
              /* View Toggle: Card vs Table */
              <div className="flex items-center rounded-xl border border-border/80 bg-surface-1 p-0.5 text-text-muted">
                <button
                  type="button"
                  onClick={() => setViewMode("card")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    viewMode === "card"
                      ? "bg-primary text-primary-fg shadow-xs"
                      : "hover:text-text-primary"
                  )}
                  title="Card View"
                >
                  <LayoutGrid className="size-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    viewMode === "table"
                      ? "bg-primary text-primary-fg shadow-xs"
                      : "hover:text-text-primary"
                  )}
                  title="Table View"
                >
                  <TableIcon className="size-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            )}

            <Link
              href="/studios/new"
              className={cn(
                "inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-xs font-bold",
                "bg-primary text-primary-fg shadow-md",
                "hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
                "active:scale-98 transition-all shrink-0"
              )}
            >
              <Plus className="size-3.5" />
              <span>Add New Studio</span>
            </Link>
          </div>
        </div>

        {/* ── SEARCH & STATS BAR (Shown when user has studios) ── */}
        {userStudios.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your workspaces..."
                className="h-9 w-full rounded-xl border border-border/80 bg-surface-1/90 pl-8.5 pr-3 text-xs text-text-primary focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted"
              />
            </div>
            <p className="text-xs text-text-secondary self-center sm:self-auto">
              You own <strong className="text-text-primary">{userStudios.length}</strong> studio{" "}
              {userStudios.length === 1 ? "space" : "spaces"}
            </p>
          </div>
        )}

        {/* ── LOADING SKELETON ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 rounded-2xl border border-border/60 bg-surface-1/50 animate-pulse p-4 space-y-3"
              >
                <div className="h-36 w-full rounded-xl bg-surface-2" />
                <div className="h-4 w-3/4 rounded-md bg-surface-2" />
                <div className="h-3 w-1/2 rounded-md bg-surface-2" />
                <div className="h-8 w-full rounded-xl bg-surface-2 mt-auto" />
              </div>
            ))}
          </div>
        ) : userStudios.length === 0 ? (
          /* ── EMPTY STATE UI ── */
          <Card className="rounded-2xl border border-border/80 bg-surface-1/90 p-8 sm:p-12 text-center backdrop-blur-xl shadow-md ring-0 gap-0">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary mb-4 shadow-sm">
              <Building2 className="size-7" strokeWidth={1.75} />
            </div>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-base sm:text-lg font-bold text-text-primary"
            >
              You haven&apos;t listed any studio spaces yet
            </h2>

            <p className="mt-1.5 text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
              Monetize your photography cyc wall, podcast lounge, cinema sound stage, or recording suite.
              Reach thousands of verified creators looking for hourly bookings.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/studios/new"
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-6 rounded-xl text-xs font-bold",
                  "bg-primary text-primary-fg shadow-md",
                  "hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
                  "active:scale-98 transition-all"
                )}
              >
                <Plus className="size-4" />
                <span>List Your First Studio</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Card>
        ) : viewMode === "card" ? (
          /* ── CARD FORMAT ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudios.map((studio) => {
              const studioId =
                typeof studio._id === "object" && studio._id !== null
                  ? (studio._id as { $oid: string }).$oid
                  : studio._id || "";

              const displayImage =
                studio.images && studio.images.length > 0
                  ? studio.images[0]
                  : "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop";

              return (
                <Card
                  key={studioId}
                  className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-border/80 bg-surface-1/90 shadow-sm backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-lg p-0 gap-0 ring-0"
                >
                  {/* Visual Header */}
                  <div className="relative h-44 w-full bg-surface-2 overflow-hidden shrink-0">
                    <div
                      className="size-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${displayImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />

                    {/* Category & Status */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-lg bg-surface-1/90 backdrop-blur-md border border-border/70 px-2.5 py-0.5 text-[11px] font-semibold text-text-primary shadow-xs">
                        {studio.category}
                      </span>
                      <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 px-2 py-0.5 text-[10px] font-bold">
                        {studio.status || "active"}
                      </span>
                    </div>

                    {/* Hourly Rate */}
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-lg font-extrabold text-white drop-shadow-md">
                        ${studio.hourlyRate}
                      </span>
                      <span className="text-xs font-medium text-white/85 ml-1">/ hr</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <CardContent className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-0">
                    <div>
                      <h4
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-sm sm:text-base font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors"
                      >
                        {studio.title}
                      </h4>

                      <div className="mt-2 flex items-center justify-between text-xs text-text-secondary gap-2">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="size-3.5 text-primary shrink-0" />
                          <span className="truncate">{studio.location || `${studio.city}, ${studio.state}`}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-text-muted shrink-0">
                          <Users className="size-3" />
                          <span>{studio.capacity} guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: View Details, Update & Delete */}
                    <div className="mt-4 pt-3.5 border-t border-border/60 flex items-center justify-between gap-2">
                      <Link
                        href={`/studios/${studioId}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-primary transition-colors"
                      >
                        <Eye className="size-3.5" />
                        <span>View Details</span>
                      </Link>

                      <div className="flex items-center gap-1.5">
                        {/* Update Button */}
                        <Link href={`/studios/edit/${studioId}`}>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg border border-border/80 bg-surface-2 text-xs font-medium text-text-primary hover:border-primary/50 hover:text-primary active:scale-95 transition-all cursor-pointer"
                          >
                            <Edit3 className="size-3" />
                            <span>Update</span>
                          </button>
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg border border-destructive/30 bg-destructive/10 text-xs font-medium text-destructive hover:bg-destructive/20 active:scale-95 transition-all"
                        >
                          <Trash2 className="size-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* ── TABLE FORMAT ── */
          <Card className="rounded-2xl border border-border/80 bg-surface-1/90 shadow-md backdrop-blur-md overflow-hidden p-0 gap-0 ring-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border/80 bg-surface-2/60 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">
                      Studio Space
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Hourly Rate
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredStudios.map((studio) => {
                    const studioId =
                      typeof studio._id === "object" && studio._id !== null
                        ? (studio._id as { $oid: string }).$oid
                        : studio._id || "";

                    const displayImage =
                      studio.images && studio.images.length > 0
                        ? studio.images[0]
                        : "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop";

                    return (
                      <tr
                        key={studioId}
                        className="hover:bg-surface-2/40 transition-colors"
                      >
                        {/* Title & Thumbnail */}
                        <td className="py-3.5 pl-4 pr-3 sm:pl-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="size-10 rounded-lg bg-cover bg-center shrink-0 border border-border/60"
                              style={{ backgroundImage: `url(${displayImage})` }}
                            />
                            <div>
                              <Link
                                href={`/studios/${studioId}`}
                                className="font-bold text-text-primary hover:text-primary transition-colors line-clamp-1"
                              >
                                {studio.title}
                              </Link>
                              <span className="text-[11px] text-text-muted">
                                Capacity: {studio.capacity} guests
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-3 py-3.5 whitespace-nowrap text-text-secondary">
                          <span className="rounded-md border border-border/70 bg-surface-2 px-2 py-0.5 text-[11px] font-medium">
                            {studio.category}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="px-3 py-3.5 whitespace-nowrap text-text-secondary">
                          {studio.city || studio.location}
                        </td>

                        {/* Rate */}
                        <td className="px-3 py-3.5 whitespace-nowrap font-bold text-text-primary">
                          ${studio.hourlyRate} / hr
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                            {studio.status || "active"}
                          </span>
                        </td>

                        {/* Actions: View, Update, Delete */}
                        <td className="py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/studios/${studioId}`}
                              className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-2 transition-colors"
                              title="View details"
                            >
                              <Eye className="size-3.5" />
                            </Link>

                            <Link href={`/studios/edit/${studioId}`}>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 h-7 px-2 rounded-lg border border-border/80 bg-surface-2 text-[11px] font-medium text-text-primary hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                              >
                                <Edit3 className="size-3" />
                                <span>Update</span>
                              </button>
                            </Link>

                            <button
                              type="button"
                              className="inline-flex items-center gap-1 h-7 px-2 rounded-lg border border-destructive/30 bg-destructive/10 text-[11px] font-medium text-destructive hover:bg-destructive/20 transition-colors"
                            >
                              <Trash2 className="size-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
