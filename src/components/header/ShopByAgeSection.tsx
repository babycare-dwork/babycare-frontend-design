"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { toneClasses, toneOrder } from "@/components/Tag";
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
    range: "0–6",
    unit: "months",
  },
  {
    label: "6 - 12 Months",
    value: "6-12",
    tagline: "Exploring & teething",
    icon: Sparkles,
    range: "6–12",
    unit: "months",
  },
  {
    label: "12 - 24 Months",
    value: "12-24",
    tagline: "First steps",
    icon: Footprints,
    range: "1–2",
    unit: "years",
  },
  {
    label: "24 - 36 Months",
    value: "24-36",
    tagline: "Active toddler",
    icon: Backpack,
    range: "2–3",
    unit: "years",
  },
  {
    label: "36 Months+",
    value: "36+",
    tagline: "Big kid essentials",
    icon: PartyPopper,
    range: "3+",
    unit: "years",
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
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Growth stages"
          title="Shop by age"
          lead="Find products picked for your little one's exact stage of growth."
          align="center"
          className="mb-10 sm:mb-12"
        />

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5"
        >
          {ageStages.map((stage, i) => {
            const Icon = stage.icon;
            const tone = toneClasses[toneOrder[i % toneOrder.length]];
            return (
              <motion.li
                key={stage.value}
                variants={cardVariants}
                className={
                  i === ageStages.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }
              >
                <Link
                  href={`/products?stage=${stage.value}`}
                  aria-label={`Shop ${stage.label} — ${stage.tagline}`}
                  className={`group relative flex h-full flex-col items-center overflow-hidden rounded-t-[999px] rounded-b-2xl ${tone.bg} px-4 pb-6 pt-10 text-center transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  <span
                    className={`mb-4 flex size-14 items-center justify-center rounded-full bg-surface-raised shadow-sm ${tone.ink}`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>

                  <span className="font-brand text-[34px] leading-10 font-bold tracking-[-0.01em] text-ink sm:text-[40px] sm:leading-[44px]">
                    {stage.range}
                  </span>
                  <span className="mb-3 text-sm font-bold text-ink-muted">
                    {stage.unit}
                  </span>
                  <span className="mb-5 text-sm leading-5 text-ink-muted">
                    {stage.tagline}
                  </span>

                  <span
                    className={`mt-auto flex size-10 items-center justify-center rounded-full bg-surface-raised ${tone.ink} shadow-sm transition-transform duration-200 ease-out group-hover:translate-x-1`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
