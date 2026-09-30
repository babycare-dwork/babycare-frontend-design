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

export default function Page() {
  const { products, isLoading } = useProducts({
    page: 1,
    per_page: 8,
  });
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoryList />
      <ShopByAgeSection />
      <DiaperSpotlight />
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-primary mb-1 sm:mb-1.5 uppercase">
                Authentic &amp; Certified
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-1 sm:mb-2 uppercase">
                Latest <span className="text-primary">In Store</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-500 max-w-xl">
                Discover authentic, pediatrician-approved baby essentials for
                everyday happiness.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 shrink-0"
            >
              View All Products
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
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <AboutStory />
      <TestimonialSection />
      <FeaturesSection />
      <AppPromo />
      <VendorCTASection />
    </main>
  );
}
