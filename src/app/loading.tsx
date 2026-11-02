import React from "react";
import { StudioLogoSpinner } from "@/components/shared/LoadingSkeleton";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
      <StudioLogoSpinner size="lg" label="Loading StudioSpace..." />
    </div>
  );
}

