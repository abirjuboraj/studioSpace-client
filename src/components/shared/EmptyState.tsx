import React from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Plus, Search, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ElementType;
    variant?: "primary" | "outline";
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ElementType;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border/80 bg-surface-1/60 backdrop-blur-md shadow-xs",
        className
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary mb-4 shadow-xs">
        <Icon className="size-7" strokeWidth={1.75} />
      </div>

      <h3
        style={{ fontFamily: "var(--font-display)" }}
        className="text-base sm:text-lg font-bold text-text-primary tracking-tight"
      >
        {title}
      </h3>

      <p className="mt-1.5 text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action && (
            action.href ? (
              <Link href={action.href}>
                <Button
                  className={cn(
                    "inline-flex items-center gap-2 h-10 px-5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md",
                    action.variant === "outline"
                      ? "border border-border/80 bg-surface-2 text-text-primary hover:border-primary/50 hover:bg-surface-2/80"
                      : "bg-primary text-primary-fg hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-98"
                  )}
                >
                  {action.icon && <action.icon className="size-3.5" />}
                  <span>{action.label}</span>
                </Button>
              </Link>
            ) : (
              <Button
                type="button"
                onClick={action.onClick}
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md",
                  action.variant === "outline"
                    ? "border border-border/80 bg-surface-2 text-text-primary hover:border-primary/50 hover:bg-surface-2/80"
                    : "bg-primary text-primary-fg hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-98"
                )}
              >
                {action.icon && <action.icon className="size-3.5" />}
                <span>{action.label}</span>
              </Button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs font-semibold border-border/80 bg-surface-1 text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors cursor-pointer"
                >
                  {secondaryAction.icon && <secondaryAction.icon className="size-3.5" />}
                  <span>{secondaryAction.label}</span>
                </Button>
              </Link>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={secondaryAction.onClick}
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs font-semibold border-border/80 bg-surface-1 text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors cursor-pointer"
              >
                {secondaryAction.icon && <secondaryAction.icon className="size-3.5" />}
                <span>{secondaryAction.label}</span>
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}

