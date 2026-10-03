"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Store, Users, Wallet } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const benefits = [
  { icon: Users, text: "Reach parents who already trust BabyCare" },
  { icon: Wallet, text: "Simple listing, transparent payouts" },
  { icon: BadgeCheck, text: "A verified-seller badge on your store" },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function VendorCTASection() {
  return (
    <section className="bg-blush-soft">
      <motion.div
        className="container mx-auto grid items-center gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div variants={itemVariants}>
          <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-surface-raised text-coral-strong shadow-sm">
            <Store className="size-6" aria-hidden="true" />
          </span>
          <p className="eyebrow mb-3">For brands & stores</p>
          <h2 className="mb-4 font-display text-[34px] leading-[42px] font-extrabold tracking-[-0.01em] text-ink sm:text-[44px] sm:leading-[52px]">
            Start selling on BabyCare
          </h2>
          <p className="max-w-[52ch] text-base leading-[26px] text-ink-muted sm:text-lg sm:leading-[30px]">
            Join the vendors reaching parents across Nepal. Grow your business
            on a marketplace built around trust.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          <ul className="flex flex-col gap-3">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-raised text-coral-strong">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-base font-semibold text-ink">{text}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" variant="cta" className="self-start">
            <Link href="/vendor-register">
              Register as vendor
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
