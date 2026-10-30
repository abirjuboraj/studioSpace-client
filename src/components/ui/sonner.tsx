"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface-1 group-[.toaster]:text-text-primary group-[.toaster]:border-border/80 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-text-secondary text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-fg font-semibold",
          cancelButton:
            "group-[.toast]:bg-surface-2 group-[.toast]:text-text-secondary",
          error: "group-[.toaster]:border-red-500/40 text-red-400",
          success: "group-[.toaster]:border-emerald-500/40 text-emerald-400",
        },
      }}
      {...props}
    />
  );
}

