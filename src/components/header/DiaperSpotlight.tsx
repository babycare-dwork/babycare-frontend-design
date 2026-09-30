"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CloudIcon } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Designed for long-lasting dryness",
  "Breathable, soft-touch material",
  "Gentle on delicate skin",
];

export function DiaperSpotlight() {
  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 leading-tight">
              Diapers Built for Comfort.
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6 max-w-2xl">
              Gentle on delicate skin and made to keep your baby dry and
              comfortable all day and night.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/products?category=diapers-hygiene"
              className="inline-flex items-center justify-center rounded-full bg-primary text-white text-sm font-semibold px-6 py-3 shadow-sm hover:bg-primary/90 transition-colors"
            >
              Explore Diapers
            </Link>
          </motion.div>

          {/* Media side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-4/3 rounded-[2rem] overflow-hidden shadow-xl bg-gray-50">
              <Image
                src="/sleep-baby-diaper.jpg"
                alt="BabyCare diaper product"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
