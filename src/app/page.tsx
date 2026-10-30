import { HeroSlider } from "@/components/home/HeroSlider";
import { StudioCategories } from "@/components/home/StudioCategories";
import { FeaturedStudios } from "@/components/home/FeaturedStudios";
import { HowBookingWorks } from "@/components/home/HowBookingWorks";
import { HostGuarantee } from "@/components/home/HostGuarantee";
import { AboutUs } from "@/components/home/AboutUs";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Interactive Hero Slider with 3 High-res Studio Category Slides */}
      <HeroSlider />

      {/* Browse by Studio Categories (Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops) */}
      <StudioCategories />

      {/* Featured Studios Section (Dynamic 6 Top-rated studios with image, price, rating, location & details button) */}
      <FeaturedStudios />

      {/* Section 1: How Booking Works (Horizontal slider on mobile, 4-step grid on desktop) */}
      <HowBookingWorks />

      {/* Section 2: Host Guarantee & Creator Assurances (Ticket Carousel on mobile, grid on desktop) */}
      <HostGuarantee />

      {/* Section 3: About Us (Mission, Platform Stats, and Core Philosophy) */}
      <AboutUs />
    </div>
  );
}
