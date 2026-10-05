"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { Banner } from "@/types/banner";
import Link from "next/link";

const AUTOPLAY_MS = 3000;

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const multiple = banners.length > 1;

  return (
    <div className="overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={multiple}
        allowTouchMove={multiple}
        grabCursor={multiple}
        autoplay={
          multiple
            ? {
                delay: AUTOPLAY_MS,
                disableOnInteraction: false, // keep auto-sliding after a manual swipe
                pauseOnMouseEnter: true,
              }
            : false
        }
      >
        {banners.map((banner, i) => {
          const image = (
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority={i === 0}
              sizes="(max-width: 1536px) 100vw, 1536px"
              draggable={false}
              className="object-cover"
            />
          );

          const slideClass = "relative block aspect-[1920/720] w-full";

          return (
            <SwiperSlide key={`${banner.image}-${i}`}>
              {banner.url ? (
                <Link
                  href={banner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={banner.title}
                  className={slideClass}
                >
                  {image}
                </Link>
              ) : (
                <div className={slideClass}>{image}</div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
