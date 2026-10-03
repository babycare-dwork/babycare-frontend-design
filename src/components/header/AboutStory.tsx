"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  "Pediatrician-reviewed product selection",
  "Trusted local pharmacy & store partners",
  "Fast, careful delivery to your doorstep",
];

export function AboutStory() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-honey-soft sm:-left-6 sm:-top-6"
            />
            <div
              aria-hidden="true"
              className="absolute -right-3 bottom-10 size-20 rounded-full border-2 border-dashed border-coral/60"
            />
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/baby-mom.png"
                alt="Parent caring for a baby"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            </div>

            {/* floating stat card */}
            <div className="hidden sm:flex -mt-10 ml-6 lg:ml-10 items-center gap-3 bg-card rounded-full shadow-md py-2 pl-2 pr-5 relative z-10 w-fit">
              <div className="flex items-center justify-center size-11 rounded-full bg-sprout-soft shrink-0">
                <ShieldCheck className="size-5 text-leaf" />
              </div>
              <div>
                <p className="font-display text-[15px] font-bold text-ink leading-none mb-1">
                  Verified & safe
                </p>
                <p className="text-xs text-ink-muted leading-none">
                  Every product checked for quality
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-full lg:w-1/2"
          >
            <p className="eyebrow mb-3">Our story</p>
            <h2 className="text-[34px] leading-[42px] sm:text-[44px] sm:leading-[52px] tracking-[-0.01em] font-extrabold text-ink mb-4">
              Built by parents, for parents
            </h2>
            <p className="text-base sm:text-lg leading-[26px] sm:leading-[30px] text-ink-muted mb-6 max-w-[60ch]">
              BabyCare started with a simple idea: parenting shouldn&apos;t feel
              overwhelming. We bring together safe products, trusted healthcare
              guidance, and timely reminders so you can spend less time worrying
              and more time enjoying the little moments.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-5 rounded-full bg-leaf shrink-0">
                    <Check className="size-3 text-surface-raised" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-[22px] text-ink-muted">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-primary text-white text-sm font-semibold px-6 py-3 shadow-sm hover:bg-primary/90 transition-colors"
            >
              Learn Our Story
            </Link> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
