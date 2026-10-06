import { getBanners } from "@/lib/api/banner";
import { BannerCarousel } from "./BannerCarousel";

export async function PromoBanner() {
  const banners = await getBanners();
  // console.log("banners", banners);
  if (banners.length === 0) return null;

  return (
    <section className="container mx-auto px-4 sm:px-8">
      <BannerCarousel banners={banners} />
    </section>
  );
}
