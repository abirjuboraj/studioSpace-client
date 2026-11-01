import { HeroSlider } from "@/components/home/HeroSlider";
import { StudioCategories } from "@/components/home/StudioCategories";
import { FeaturedStudios } from "@/components/home/FeaturedStudios";
import { HowBookingWorks } from "@/components/home/HowBookingWorks";
import { AboutUs } from "@/components/home/AboutUs";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSlider />
      <StudioCategories />
      <FeaturedStudios />
      <HowBookingWorks />
      <AboutUs />
    </div>
  );
}
