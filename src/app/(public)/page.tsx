import { Suspense } from "react";
import { HeroSection } from "@/components/header/HeroSection";
import { CategoryList } from "@/components/category/CategoryList";
import { TestimonialSection } from "@/components/Slider/Testimonial";
import { AppPromo } from "@/components/Slider/App-promo";
import { FeaturesSection } from "@/components/header/features-section";
import { VendorCTASection } from "@/components/header/VendorCTASection";
import { AboutStory } from "@/components/header/AboutStory";
import { DiaperSpotlight } from "@/components/header/DiaperSpotlight";
import { ShopByAgeSection } from "@/components/header/ShopByAgeSection";
import { PromoBanner } from "@/components/header/PromoBanner";
import { LatestProducts } from "@/components/header/LatestProducts";

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoryList />
      <Suspense fallback={null}>
        <PromoBanner />
      </Suspense>
      <ShopByAgeSection />
      <LatestProducts />
      <DiaperSpotlight />
      <AboutStory />
      <TestimonialSection />
      <AppPromo />
      <VendorCTASection />
    </main>
  );
}
