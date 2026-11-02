"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  DollarSign,
  Upload,
  Link as LinkIcon,
  Users,
  Maximize2,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  FileCheck2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  StudioCategory,
  CATEGORY_PRESETS,
  STUDIO_CATEGORIES,
  DAYS_OF_WEEK,
  API_BASE_URL,
} from "@/types/studio";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getToken";

export default function NewStudioPage() {
  const router = useRouter();
  const fileInputId = useId();
  const { data: session } = useSession();
  const user = session?.user;

  const MAX_IMAGES = 6;
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

  // ── Form State ──
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<StudioCategory>("Photo Studios");
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [rating, setRating] = useState<number | "">(4.9);
  const [minimumBookingHours, setMinimumBookingHours] = useState<number | "">(1);
  const [securityDeposit, setSecurityDeposit] = useState<number | "">(0);
  const [cancellationNoticeHours, setCancellationNoticeHours] = useState<number | "">(24);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [workspaceSize, setWorkspaceSize] = useState("");
  const [overview, setOverview] = useState("");

  // Images state (local files only)
  const [imageEntries, setImageEntries] = useState<
    Array<{ id: string; name: string; file: File; preview: string }>
  >([]);

  // Category-driven Dynamic Amenities & Equipment
  const activePresets = CATEGORY_PRESETS[category];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [customAmenitiesList, setCustomAmenitiesList] = useState<string[]>([]);
  const [customEquipmentList, setCustomEquipmentList] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [customEquipment, setCustomEquipment] = useState("");

  // Availability
  const [selectedDays, setSelectedDays] = useState<string[]>([...DAYS_OF_WEEK]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleCategoryChange = (newCat: StudioCategory) => {
    setCategory(newCat);
    setSelectedAmenities([]);
    setSelectedEquipment([]);
    setCustomAmenitiesList([]);
    setCustomEquipmentList([]);
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const toggleEquipment = (item: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (!trimmed) return;
    if (!customAmenitiesList.includes(trimmed) && !activePresets.amenities.includes(trimmed)) {
      setCustomAmenitiesList((prev) => [...prev, trimmed]);
    }
    if (!selectedAmenities.includes(trimmed)) {
      setSelectedAmenities((prev) => [...prev, trimmed]);
    }
    setCustomAmenity("");
  };

  const addCustomEquipment = () => {
    const trimmed = customEquipment.trim();
    if (!trimmed) return;
    if (!customEquipmentList.includes(trimmed) && !activePresets.equipment.includes(trimmed)) {
      setCustomEquipmentList((prev) => [...prev, trimmed]);
    }
    if (!selectedEquipment.includes(trimmed)) {
      setSelectedEquipment((prev) => [...prev, trimmed]);
    }
    setCustomEquipment("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = ""; // same file abar select korle jeno kaj kore
    if (selected.length === 0) return;

    const valid = selected.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        return false;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} is larger than 10MB.`);
        return false;
      }
      return true;
    });

    if (imageEntries.length + valid.length > MAX_IMAGES) {
      toast.error(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImageEntries((prev) => [
      ...prev,
      ...valid.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const removeImageEntry = (index: number) => {
    setImageEntries((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Form submit handler with complete arrays & validation
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageEntries.length === 0) {
      toast.error("Please add at least one studio image.");
      return;
    }

    if (selectedDays.length === 0) {
      toast.error("Please select at least one active booking day.");
      return;
    }

    setIsSubmitting(true);

    // Build formatted studio payload with arrays
    const studioData = {
      title: title.trim(),
      category,
      hourlyRate: Number(hourlyRate),
      rating: rating !== "" ? Number(rating) : 4.9,
      minimumBookingHours: minimumBookingHours !== "" ? Number(minimumBookingHours) : 1,
      securityDeposit: securityDeposit !== "" ? Number(securityDeposit) : 0,
      cancellationNoticeHours: cancellationNoticeHours !== "" ? Number(cancellationNoticeHours) : 24,
      capacity: Number(capacity),
      workspaceSize: workspaceSize.trim(),
      overview: overview.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),
      location: `${city.trim()}, ${state.trim()}`,
      amenities: selectedAmenities,
      equipment: selectedEquipment,
      availability: {
        days: selectedDays,
        startTime,
        endTime,
      },
      status: "active",
      // Host info from logged in user
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      hostId: user?.id,
      hostName: user?.name,
      hostEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    // text data JSON string hishebe, image file gulo alada field e
    const formData = new FormData();
    formData.append("data", JSON.stringify(studioData));
    imageEntries.forEach((img) => formData.append("images", img.file));

    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${API_BASE_URL}/studios/add-studio`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const resData = await res.json().catch(() => null);

      if (res.ok && (!resData || resData.success !== false)) {
        toast.success("Studio published successfully!");
        router.push("/my-studio-listings");
      } else {
        toast.error(resData?.message || "Failed to create studio listing. Please try again.");
      }
    } catch (error) {
      console.error("Studio publish error:", error);
      toast.error("Network error. Please make sure the backend server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 size-[350px] sm:size-[450px] rounded-full bg-primary/6 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl z-10">
        {/* Navigation back and header */}
        <div className="mb-6">
          <Link
            href="/my-studio-listings"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-primary transition-colors mb-3"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to My Studio Listings</span>
          </Link>

          <div className="flex items-center gap-2 mb-1">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-4" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Host Onboarding
            </span>
          </div>

          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
          >
            List a New Creative Studio
          </h3>
          <p className="mt-1 text-xs text-text-secondary">
            Fill in the essential information to publish your creative space to creators.
          </p>
        </div>

        {/* ── Single Compact Form Container ── */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 sm:p-7 backdrop-blur-xl shadow-md space-y-6"
        >
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* 1. Basic Details */}
          <div className="space-y-4">
            <h4
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xs font-bold uppercase tracking-wider text-text-muted pb-2 border-b border-border/60"
            >
              Studio Details
            </h4>

            {/* Studio Title */}
            <div className="space-y-1">
              <label htmlFor="title" className="block text-xs font-semibold text-text-primary">
                Studio Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Apex White Cyc Infinity Stage & Daylight Loft"
                className={cn(
                  "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary",
                  "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                )}
                required
              />
            </div>

            {/* Category & Hourly Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label htmlFor="category" className="block text-xs font-semibold text-text-primary">
                  Creative Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value as StudioCategory)}
                  className={cn(
                    "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary cursor-pointer",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  )}
                >
                  {STUDIO_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-surface-1 text-text-primary">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="hourlyRate" className="block text-xs font-semibold text-text-primary">
                  Hourly Rate ($ USD) *
                </label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="hourlyRate"
                    type="number"
                    name="hourlyRate"
                    min={1}
                    value={hourlyRate}
                    onChange={(e) =>
                      setHourlyRate(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="95"
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing, Security & Booking Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="space-y-1">
                <label htmlFor="minimumBookingHours" className="block text-xs font-semibold text-text-primary">
                  Minimum Booking (Hours) *
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="minimumBookingHours"
                    type="number"
                    name="minimumBookingHours"
                    min={1}
                    max={24}
                    value={minimumBookingHours}
                    onChange={(e) =>
                      setMinimumBookingHours(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="1"
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="securityDeposit" className="block text-xs font-semibold text-text-primary">
                  Security Deposit ($ USD)
                </label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="securityDeposit"
                    type="number"
                    name="securityDeposit"
                    min={0}
                    value={securityDeposit}
                    onChange={(e) =>
                      setSecurityDeposit(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="0"
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="cancellationNoticeHours" className="block text-xs font-semibold text-text-primary">
                  Cancellation Notice (Min Hours) *
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="cancellationNoticeHours"
                    type="number"
                    name="cancellationNoticeHours"
                    min={0}
                    value={cancellationNoticeHours}
                    onChange={(e) =>
                      setCancellationNoticeHours(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="24"
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Capacity, Dimensions & Initial Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label htmlFor="capacity" className="block text-xs font-semibold text-text-primary">
                  Max Capacity (Persons) *
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="capacity"
                    type="number"
                    name="capacity"
                    min={1}
                    value={capacity}
                    onChange={(e) =>
                      setCapacity(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="30"
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="workspaceSize" className="block text-xs font-semibold text-text-primary">
                  Floor Dimensions *
                </label>
                <div className="relative">
                  <Maximize2 className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="workspaceSize"
                    type="text"
                    name="workspaceSize"
                    value={workspaceSize}
                    onChange={(e) => setWorkspaceSize(e.target.value)}
                    placeholder="e.g. 2,200 sq ft"
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="rating" className="block text-xs font-semibold text-text-primary">
                  Initial Host Rating (1.0 - 5.0)
                </label>
                <input
                  id="rating"
                  type="number"
                  name="rating"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="4.9"
                  className={cn(
                    "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  )}
                />
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-1">
              <label htmlFor="overview" className="block text-xs font-semibold text-text-primary">
                Studio Overview *
              </label>
              <textarea
                id="overview"
                rows={3}
                name="overview"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Describe lighting setups, ceiling heights, power distribution, acoustics, and production atmosphere..."
                className={cn(
                  "w-full rounded-xl border border-border/80 bg-surface-2/50 p-2.5 text-xs text-text-primary",
                  "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                )}
                required
              />
            </div>
          </div>

          {/* 2. Location */}
          <div className="space-y-3.5 pt-2">
            <h4
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xs font-bold uppercase tracking-wider text-text-muted pb-2 border-b border-border/60"
            >
              Location
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label htmlFor="address" className="block text-xs font-semibold text-text-primary">
                  Full Street Address *
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 1701 South Congress Avenue, Suite 200"
                  className={cn(
                    "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  )}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor="city" className="block text-xs font-semibold text-text-primary">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Austin"
                  className={cn(
                    "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  )}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="state" className="block text-xs font-semibold text-text-primary">
                  State / Province *
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Texas"
                  className={cn(
                    "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  )}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="country" className="block text-xs font-semibold text-text-primary">
                  Country *
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. United States"
                  className={cn(
                    "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 px-3 text-xs text-text-primary",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  )}
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. Studio Images (Local Computer Upload -> Processed & Hosted via ImgBB) */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <h4
                style={{ fontFamily: "var(--font-display)" }}
                className="text-xs font-bold uppercase tracking-wider text-text-muted"
              >
                Studio Photos
              </h4>
              <span className="text-[11px] text-text-muted">
                {imageEntries.length} of {MAX_IMAGES} uploaded (ImgBB)
              </span>
            </div>

            {/* Choose from local computer */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Upload from Local Device (Max {MAX_IMAGES} photos, 10MB each) *
              </label>
              <div>
                <input
                  id={fileInputId}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor={fileInputId}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-5 w-full rounded-xl cursor-pointer",
                    "border border-dashed border-border/80 bg-surface-2/40 text-xs font-medium text-text-secondary",
                    "hover:border-primary/50 hover:bg-surface-2 hover:text-text-primary transition-all text-center"
                  )}
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Upload className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary">Click to select studio images</span>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Images will be uploaded to ImgBB and saved to your listing
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Selected File Badges / Thumbnails */}
            {imageEntries.length > 0 && (
              <div className="space-y-2 pt-1">
                <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                  Selected Images ({imageEntries.length}):
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {imageEntries.map((entry, idx) => (
                    <div
                      key={entry.id || idx}
                      className="group relative flex items-center gap-2 rounded-xl border border-border/70 bg-surface-2 p-1.5 pr-2.5 text-xs text-text-primary shadow-xs"
                    >
                      {/* Image thumbnail preview */}
                      <div
                        className="size-8 rounded-lg bg-cover bg-center shrink-0 border border-border/60"
                        style={{ backgroundImage: `url(${entry.preview})` }}
                      />
                      <span className="max-w-[150px] sm:max-w-[180px] truncate text-[11px] font-medium">
                        {entry.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImageEntry(idx)}
                        className="text-text-muted hover:text-red-500 transition-colors ml-1 p-0.5 rounded cursor-pointer"
                        aria-label="Remove image"
                        title="Remove image"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Dynamic Amenities & Equipment (Tags/Checkboxes) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <h4
                style={{ fontFamily: "var(--font-display)" }}
                className="text-xs font-bold uppercase tracking-wider text-text-muted"
              >
                Features & Gear for {category}
              </h4>
              <span className="text-[11px] text-text-muted">
                {selectedAmenities.length + selectedEquipment.length} item(s) selected
              </span>
            </div>

            {/* Category-Specific Amenities (Tags / Checkboxes) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-text-primary">
                  Included Amenities (Tags / Checkboxes)
                </label>
                <span className="text-[10px] text-text-muted">
                  {selectedAmenities.length} selected
                </span>
              </div>

              {/* Combined standard presets + user's added custom amenities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {[...activePresets.amenities, ...customAmenitiesList].map((item) => {
                  const isChecked = selectedAmenities.includes(item);
                  const isCustom = customAmenitiesList.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAmenity(item)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left text-xs transition-all cursor-pointer group",
                        isChecked
                          ? "border-primary bg-primary/10 text-text-primary font-semibold shadow-xs"
                          : "border-border/70 bg-surface-2/40 text-text-secondary hover:border-border hover:bg-surface-2/70"
                      )}
                    >
                      {/* Visual Checkbox element */}
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-[4px] border shrink-0 transition-colors",
                          isChecked
                            ? "bg-primary border-primary text-primary-fg"
                            : "border-border bg-surface-1 group-hover:border-primary/50"
                        )}
                      >
                        {isChecked && (
                          <svg className="size-3 fill-current" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </span>
                      <span className="truncate flex-1">{item}</span>
                      {isCustom && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/15 px-1 rounded">
                          Custom
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Add custom amenity */}
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomAmenity();
                    }
                  }}
                  placeholder="Add custom amenity tag (e.g. 100A 3-Phase Camlock)..."
                  className="h-8.5 flex-1 rounded-xl border border-border/70 bg-surface-2/40 px-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/60"
                />
                <button
                  type="button"
                  onClick={addCustomAmenity}
                  className="inline-flex items-center gap-1 h-8.5 px-3 rounded-xl border border-border/80 bg-surface-2 text-xs font-semibold text-text-primary hover:border-primary/50 transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>

            {/* Category-Specific Equipment (Tags / Checkboxes) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-text-primary">
                  Dedicated Gear & Production Kit (Tags / Checkboxes)
                </label>
                <span className="text-[10px] text-text-muted">
                  {selectedEquipment.length} selected
                </span>
              </div>

              {/* Combined standard presets + user's added custom equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {[...activePresets.equipment, ...customEquipmentList].map((item) => {
                  const isChecked = selectedEquipment.includes(item);
                  const isCustom = customEquipmentList.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleEquipment(item)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left text-xs transition-all cursor-pointer group",
                        isChecked
                          ? "border-primary bg-primary/10 text-text-primary font-semibold shadow-xs"
                          : "border-border/70 bg-surface-2/40 text-text-secondary hover:border-border hover:bg-surface-2/70"
                      )}
                    >
                      {/* Visual Checkbox element */}
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-[4px] border shrink-0 transition-colors",
                          isChecked
                            ? "bg-primary border-primary text-primary-fg"
                            : "border-border bg-surface-1 group-hover:border-primary/50"
                        )}
                      >
                        {isChecked && (
                          <svg className="size-3 fill-current" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </span>
                      <span className="truncate flex-1">{item}</span>
                      {isCustom && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/15 px-1 rounded">
                          Custom
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Add custom equipment */}
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={customEquipment}
                  onChange={(e) => setCustomEquipment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomEquipment();
                    }
                  }}
                  placeholder="Add custom gear tag (e.g. Aputure 600d Pro Light)..."
                  className="h-8.5 flex-1 rounded-xl border border-border/70 bg-surface-2/40 px-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/60"
                />
                <button
                  type="button"
                  onClick={addCustomEquipment}
                  className="inline-flex items-center gap-1 h-8.5 px-3 rounded-xl border border-border/80 bg-surface-2 text-xs font-semibold text-text-primary hover:border-primary/50 transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Availability Schedule */}
          <div className="space-y-3.5 pt-2">
            <h4
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xs font-bold uppercase tracking-wider text-text-muted pb-2 border-b border-border/60"
            >
              Availability Hours
            </h4>

            {/* Operating Days */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Active Booking Days
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DAYS_OF_WEEK.map((day) => {
                  const isActive = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={cn(
                        "px-3 py-1 rounded-lg border text-xs font-semibold transition-all",
                        isActive
                          ? "border-primary bg-primary/15 text-primary shadow-xs"
                          : "border-border/60 bg-surface-2/40 text-text-muted hover:border-border"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operational Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label htmlFor="startTime" className="block text-xs font-semibold text-text-primary">
                  Studio Opening Time *
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="endTime" className="block text-xs font-semibold text-text-primary">
                  Studio Closing Time *
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={cn(
                      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-8.5 pr-3 text-xs text-text-primary",
                      "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    )}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions (UI only) */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-text-muted text-center sm:text-left">
              Host verification notice: Your host profile name and email will be linked automatically when published.
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Link
                href="/my-studio-listings"
                className={cn(
                  "flex-1 sm:flex-none flex items-center justify-center h-9 px-4 rounded-xl text-xs font-semibold",
                  "border border-border bg-surface-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                )}
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "flex-1 sm:flex-none flex items-center justify-center gap-2 h-9 px-5 rounded-xl text-xs font-bold cursor-pointer",
                  "bg-primary text-primary-fg shadow-md",
                  "hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
                  "active:scale-98 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Studio</span>
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
