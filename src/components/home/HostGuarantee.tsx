import React from "react";
import { ShieldCheck, UserCheck, Wrench, Headphones, Shield } from "lucide-react";

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description: "Every booking includes property damage and host protection coverage.",
  },
  {
    icon: UserCheck,
    title: "Verified Profiles",
    description: "Hosts and creators are identity-checked for secure reservations.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    description: "Verified gear checklists and workspace standards for production safety.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    description: "Round-the-clock priority assistance for fast check-in and session support.",
  },
];

export function HostGuarantee() {
  return (
    <section id="guarantee" className="relative py-12 sm:py-16 border-t border-border/60 bg-surface-1/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary shadow-xs">
            <Shield className="size-3.5 text-primary" />
            <span>Peace of Mind</span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary"
          >
            Host Guarantee & Creator Support
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Built-in assurances so hosts share workspaces safely and creators book with confidence.
          </p>
        </div>

        {/* 4 Minimalist Assurance Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ASSURANCES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 p-4 rounded-xl border border-border/70 bg-surface-1/80 backdrop-blur-sm"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Icon className="size-4.5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-semibold text-text-primary">
                  {title}
                </h3>
                <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

