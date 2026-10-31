"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Aperture,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UI interaction states
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Password criteria check helpers
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasValidLength = password.length >= 6;

  // Inline feedback message for unmet criteria
  const getPasswordValidationMessage = () => {
    if (!password) return null;
    const missing: string[] = [];
    if (!hasValidLength) missing.push("at least 6 characters");
    if (!hasUppercase) missing.push("1 uppercase letter (A-Z)");
    if (!hasLowercase) missing.push("1 lowercase letter (a-z)");

    if (missing.length === 0) return null;
    return `Must include: ${missing.join(", ")}.`;
  };

  const passwordValidationMessage = getPasswordValidationMessage();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Password validation criteria check
    if (!hasValidLength) {
      const err = "Password must be at least 6 characters long.";
      setFormError(err);
      toast.error("Invalid password", { description: err });
      return;
    }

    if (!hasUppercase) {
      const err = "Password must contain at least one uppercase letter (A-Z).";
      setFormError(err);
      toast.error("Invalid password", { description: err });
      return;
    }

    if (!hasLowercase) {
      const err = "Password must contain at least one lowercase letter (a-z).";
      setFormError(err);
      toast.error("Invalid password", { description: err });
      return;
    }

    if (!agreedToTerms) {
      const err = "Please agree to the Terms of Service & Privacy Policy.";
      setFormError(err);
      toast.error("Terms Required", { description: err });
      return;
    }

    setIsSubmitting(true);

    try {
      // Better-Auth email and password signup
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
      });



      if (error) {
        const errorMsg =
          error.message || "Failed to create account. Please check your details.";
        setFormError(errorMsg);
        toast.error("Registration Failed", {
          description: errorMsg,
        });
        setIsSubmitting(false);
        return;
      }

      // Successful registration -> Navigate directly to Login page
      toast.success("Account created successfully!", {
        description: "Redirecting you to login...",
      });

      setTimeout(() => {
        router.push("/login");
      }, 900);
    } catch (err: unknown) {
      const genericMsg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFormError(genericMsg);
      toast.error("Registration Error", {
        description: genericMsg,
      });
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Google sign-up failed.";
      toast.error("Google Sign-Up Error", { description: msg });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[350px] sm:size-[550px] rounded-full bg-primary/8 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 size-[300px] sm:size-[400px] rounded-full bg-accent/6 blur-[160px] pointer-events-none" />

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
            Create Your Account
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs text-text-secondary">
            Join the peer-to-peer network of creative studios and production crews
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-border/80 bg-surface-1/90 p-5 sm:p-8 backdrop-blur-xl shadow-xl relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Form Top Error Notification */}
          {formError && (
            <div className="mb-4 sm:mb-5 flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-2.5 sm:p-3 text-[11px] sm:text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{formError}</div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-3 sm:space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-text-primary"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className={cn(
                    "h-9.5 sm:h-10 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-9 pr-3 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
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
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@creativestudio.com"
                  className={cn(
                    "h-9.5 sm:h-10 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-9 pr-3 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  required
                />
              </div>
            </div>

            {/* Profile Image URL Input */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="image"
                  className="block text-xs font-semibold text-text-primary"
                >
                  Profile Image URL
                </label>

              </div>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="image"
                  type="url"
                  name="imageUrl"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className={cn(
                    "h-9.5 sm:h-10 w-full rounded-xl border border-border/80 bg-surface-2/50 pl-9 pr-3 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-primary/70 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                />
              </div>
            </div>

            {/* Password Field with Small Error Text */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-text-primary"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="At least 6 characters (1 upper, 1 lower)"
                  className={cn(
                    "h-9.5 sm:h-10 w-full rounded-xl border bg-surface-2/50 pl-9 pr-10 text-xs text-text-primary",
                    "placeholder:text-text-muted transition-all duration-200",
                    passwordValidationMessage
                      ? "border-amber-500/60 focus:border-amber-500 focus:ring-amber-500/20"
                      : "border-border/80 focus:border-primary/70 focus:ring-primary/20",
                    "focus:bg-surface-2 focus:outline-none focus:ring-2"
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

              {/* Small Validation Text Below Password Input */}
              {passwordValidationMessage && (
                <p className="text-[11px] font-medium text-amber-500 dark:text-amber-400 pl-1 pt-0.5 animate-in fade-in-50 duration-150">
                  {passwordValidationMessage}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="size-3.5 mt-0.5 rounded border-border bg-surface-2 text-primary focus:ring-primary/30"
                required
              />
              <label htmlFor="terms" className="text-[11px] text-text-secondary leading-normal select-none">
                I agree to the StudioSpace{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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

          {/* Google Sign-up Button with Authentic Google Icon */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
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
            <span>Sign up with Google</span>
          </button>

        </div>

        {/* Redirect to Login */}
        <p className="mt-4 sm:mt-5 text-center text-xs text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:text-primary-hover underline underline-offset-4"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
