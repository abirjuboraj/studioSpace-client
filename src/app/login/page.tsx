"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Aperture,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  // Form states: strictly email, password, google
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password) {
      const err = "Please enter both email and password.";
      setFormError(err);
      toast.error("Required fields", { description: err });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        const errorMsg = error.message || "Invalid email or password.";
        setFormError(errorMsg);
        toast.error("Sign In Failed", { description: errorMsg });
        setIsSubmitting(false);
        return;
      }

      toast.success("Welcome back!", {
        description: "Redirecting to your dashboard...",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: unknown) {
      const genericMsg =
        err instanceof Error ? err.message : "Failed to sign in. Please try again.";
      setFormError(genericMsg);
      toast.error("Sign In Error", { description: genericMsg });
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Google sign-in failed.";
      toast.error("Google Sign-In Error", { description: msg });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[350px] sm:size-[500px] rounded-full bg-primary/8 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 size-[300px] sm:size-[400px] rounded-full bg-accent/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md sm:max-w-lg relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-5 sm:mb-6">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2.5 sm:mb-3">
            <div className="flex size-8.5 sm:size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20 shadow-xs">
              <Aperture className="size-4.5 sm:size-5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.8} />
            </div>
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className="text-lg sm:text-xl font-bold tracking-tight text-text-primary"
            >
              Studio<span className="text-primary">Space</span>
            </span>
          </Link>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
          >
            Welcome Back
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs text-text-secondary">
            Sign in to manage your studio bookings, slots, and listings
          </p>
        </div>

        {/* Login Card (Mirrors Register Card architecture) */}
        <div className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 sm:p-8 backdrop-blur-xl shadow-xl relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Form Error Alert */}
          {formError && (
            <div className="mb-4 sm:mb-5 flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-2.5 sm:p-3 text-[11px] sm:text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{formError}</div>
            </div>
          )}

          {/* Login Form: Strictly Email and Password */}
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-3.5">
            {/* Email Field */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-text-primary"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@studiospace.com"
                  className={cn(
                    "h-9.5 sm:h-10 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-9 pr-3 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-text-primary"
                >
                  Password
                </label>

              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="••••••••"
                  className={cn(
                    "h-9.5 sm:h-10 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-9 pr-10 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex items-center justify-center gap-2 w-full h-9.5 sm:h-10 px-4 rounded-xl text-xs font-bold",
                "bg-primary text-primary-fg shadow-md",
                "hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "active:scale-98 transition-all duration-200 mt-2"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4 sm:my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/70" />
            </div>
            <span className="relative bg-surface-1 px-3 text-[10px] uppercase font-bold tracking-wider text-text-muted">
              Or
            </span>
          </div>

          {/* Google Sign-in Button with Authentic Google Icon */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className={cn(
              "flex items-center justify-center gap-2.5 w-full h-9.5 sm:h-10 px-4 rounded-xl text-xs font-semibold",
              "border border-border/80 bg-surface-2/60 text-text-primary",
              "hover:border-primary/40 hover:bg-surface-2 transition-all duration-200 shadow-xs active:scale-98",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {isGoogleLoading ? (
              <Loader2 className="size-4 animate-spin text-primary" />
            ) : (
              <FcGoogle className="size-4.5 shrink-0" />
            )}
            <span>Sign in with Google</span>
          </button>

        </div>

        {/* Redirect to Register */}
        <p className="mt-4 sm:mt-5 text-center text-xs text-text-secondary">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-bold text-primary hover:text-primary-hover underline underline-offset-4"
          >
            Create Creator Account
          </Link>
        </p>
      </div>
    </div>
  );
}
