"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Baby,
  Footprints,
  Sparkles,
  Backpack,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

export const ageStages = [
  {
    label: "0 - 6 Months",
    value: "0-6",
    tagline: "Newborn essentials",
    icon: Baby,
  },
  {
    label: "6 - 12 Months",
    value: "6-12",
    tagline: "Exploring & teething",
    icon: Sparkles,
  },
  {
    label: "12 - 24 Months",
    value: "12-24",
    tagline: "First steps",
    icon: Footprints,
  },
  {
    label: "24 - 36 Months",
    value: "24-36",
    tagline: "Active toddler",
    icon: Backpack,
  },
  {
    label: "36 Months+",
    value: "36+",
    tagline: "Big kid essentials",
    icon: PartyPopper,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export function ShopByAgeSection() {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-6 sm:mb-10 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary mb-1 sm:mb-1.5 uppercase">
              Growth Stages
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-1 sm:mb-2">
              <span className="text-gray-800">Shop by</span>{" "}
              <span className="text-primary">Age</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              Find products picked for your little one&apos;s exact stage of
              growth.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {ageStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <motion.div key={stage.value} variants={cardVariants}>
                <Link
                  href={`/products?stage=${encodeURIComponent(stage.value)}`}
                  className="group relative flex flex-col items-center text-center h-full rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                    <Icon
                      className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>

                  <p className="text-[11px] sm:text-xs font-medium text-gray-400 mb-1">
                    {stage.tagline}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                    {stage.label}
                  </h3>

                  <span className="mt-auto inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary">
                    Shop
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
