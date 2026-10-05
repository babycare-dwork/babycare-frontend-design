"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  "Designed for long-lasting dryness",
  "Breathable, soft-touch material",
  "Gentle on delicate skin",
];

export function DiaperSpotlight() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-full lg:w-1/2"
          >
            <p className="eyebrow mb-3">Diaper spotlight</p>
            <h2 className="text-[34px] leading-[42px] sm:text-[44px] sm:leading-[52px] tracking-[-0.01em] font-extrabold text-ink mb-4">
              Diapers built for comfort
            </h2>
            <p className="text-base sm:text-lg leading-[26px] sm:leading-[30px] text-ink-muted mb-6 max-w-[60ch]">
              Gentle on delicate skin and made to keep your baby dry and
              comfortable all day and night.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-5 rounded-full bg-leaf shrink-0">
                    <Check className="size-3 text-surface-raised" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-[22px] text-ink-muted">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Button asChild>
              <Link href="/products?category=diapers-hygiene">
                Explore diapers
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>

          {/* Media side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative p-4 sm:p-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 rotate-[-4deg] rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-sprout-soft"
            />
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-md bg-muted">
              <Image
                src="/sleep-baby-diaper.jpg"
                alt="BabyCare diaper product"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-2 right-6 flex items-center gap-3 rounded-full bg-surface-raised py-2 pl-2 pr-5 shadow-md">
              <span className="flex size-11 items-center justify-center rounded-full bg-sky-soft text-shield">
                <Droplets className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-[15px] font-bold text-ink">
                Dry all night
              </span>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
