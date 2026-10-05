"use client";
import { HeroSection } from "@/components/header/HeroSection";
import { CategoryList } from "@/components/category/CategoryList";
import ProductCard from "@/components/product/ProductCard";
import { TestimonialSection } from "@/components/Slider/Testimonial";
import { AppPromo } from "@/components/Slider/App-promo";
import { useProducts } from "@/hooks/useProduct";
import { FeaturesSection } from "@/components/header/features-section";
import { VendorCTASection } from "@/components/header/VendorCTASection";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutStory } from "@/components/header/AboutStory";
import { DiaperSpotlight } from "@/components/header/DiaperSpotlight";
import { ShopByAgeSection } from "@/components/header/ShopByAgeSection";
import { PromoBanner } from "@/components/header/PromoBanner";
import { SectionHeading } from "@/components/SectionHeading";

export default function Page() {
  const { products, isLoading } = useProducts({
    page: 1,
    per_page: 8,
  });
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoryList />
      <PromoBanner />
      <ShopByAgeSection />
      <section className="py-16 sm:py-24 bg-surface-sunken">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-10 sm:mb-12 gap-4">
            <SectionHeading
              eyebrow="Authentic & certified"
              title="Latest in store"
              lead="Discover authentic, pediatrician-approved baby essentials for everyday happiness."
            />

            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-1 text-[15px] font-bold text-shield hover:underline underline-offset-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products.map((item, i) => (
                  <ProductCard product={item} key={i} />
                ))}
          </div>

          <div className="flex justify-center mt-8 sm:hidden">
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-[15px] font-bold text-shield hover:underline underline-offset-4"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <DiaperSpotlight />
      <AboutStory />
      <TestimonialSection />
      <AppPromo />
      <VendorCTASection />
    </main>
  );
}
