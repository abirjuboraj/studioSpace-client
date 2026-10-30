import { HeroSlider } from "@/components/home/HeroSlider";
import { HowBookingWorks } from "@/components/home/HowBookingWorks";
import { HostGuarantee } from "@/components/home/HostGuarantee";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Interactive Hero Slider with 3 High-res Studio Category Slides */}
      <HeroSlider />

      {/* Section 1: How Booking Works (4-Step Creator Workflow) */}
      <HowBookingWorks />

      {/* Section 2: Host Guarantee & Creator Assurances ($1M Protection, Safety, Support) */}
      <HostGuarantee />
    </div>
  );
}
