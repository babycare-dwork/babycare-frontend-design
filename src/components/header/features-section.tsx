"use client";

import { BellRing, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { toneClasses, type Tone } from "@/components/Tag";

const features: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  tone: Tone;
}[] = [
  {
    icon: ShieldCheck,
    title: "Genuine products",
    description: "Sourced from verified brands and stores.",
    tone: "blush",
  },
  {
    icon: Truck,
    title: "Home delivery",
    description: "Safe, timely delivery to your door.",
    tone: "sky",
  },
  {
    icon: BellRing,
    title: "Vaccine reminders",
    description: "Every dose on time, automatically.",
    tone: "honey",
  },
  {
    icon: Stethoscope,
    title: "Health guidance",
    description: "Growth tools and nearby clinics.",
    tone: "sprout",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Trust strip — four promises in a row on the sunken band, no boxes. */
export function FeaturesSection() {
  return (
    <section
      aria-label="Why parents trust BabyCare"
      className="border-y border-line bg-surface-sunken"
    >
      <motion.ul
        className="container mx-auto grid grid-cols-1 gap-x-6 gap-y-6 px-4 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const tone = toneClasses[feature.tone];
          return (
            <motion.li
              key={feature.title}
              variants={itemVariants}
              className={`flex items-center gap-4 ${
                i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
              }`}
            >
              <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-raised shadow-sm ${tone.ink}`}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg leading-[26px] font-bold text-ink">
                  {feature.title}
                </span>
                <span className="block text-sm leading-[22px] text-ink-muted">
                  {feature.description}
                </span>
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
