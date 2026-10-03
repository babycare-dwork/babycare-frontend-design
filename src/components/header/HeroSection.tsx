"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Heart,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/Tag";

// Hero photo — any regular photo works: it is cropped to a circle (object-cover),
// so keep the child's face near the centre. Swap the file in /public to change it.
const HERO_IMAGE = {
  src: "/baby.png",
  alt: "Smiling baby playing with colourful stacking toys",
};

// Organic, slightly lopsided outline for the photo backdrop — soft like the mark.
const BLOB = "rounded-[46%_54%_42%_58%/55%_45%_55%_45%]";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const float = (delay: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Soft background washes */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-40 -top-40 size-[640px] bg-sky-soft/70 ${BLOB}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-48 size-[420px] rounded-full bg-blush-soft/70"
      />

      <div className="container relative mx-auto grid items-center gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <p className="eyebrow mb-4">Trusted baby care</p>

          <h1
            id="hero-heading"
            className="mb-5 font-display text-[40px] leading-[48px] font-extrabold tracking-[-0.01em] text-ink sm:text-[56px] sm:leading-[64px]"
          >
            Care that grows with{" "}
            <span className="relative inline-block">
              your little one
              <svg
                aria-hidden="true"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-coral"
              >
                <path
                  d="M3 11 C 70 3, 150 3, 297 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mb-8 max-w-[52ch] text-lg leading-[30px] text-ink-muted">
            Genuine baby essentials, vaccination reminders and trusted health
            guidance — all in one calm, caring place for your family.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="pr-2 has-[>svg]:pr-2">
              <Link href="/products">
                Shop essentials
                <span className="ml-1 flex size-10 items-center justify-center rounded-full bg-on-shield text-shield">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/vaccination-schedule">
                <CalendarCheck className="size-5" />
                Vaccination schedule
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-5 fill-honey text-honey" />
              ))}
            </div>
            <p className="text-sm font-semibold text-ink-muted">
              Loved by parents across Nepal
            </p>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-[540px]"
        >
          {/* Dashed orbit + tinted blob */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-dashed border-sky"
          />
          <div
            aria-hidden="true"
            className={`absolute inset-[7%] bg-honey-soft ${BLOB}`}
          />
          <div className="absolute inset-[11%] overflow-hidden rounded-full border-[6px] border-surface-raised bg-sky-soft shadow-md">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 420px"
              className="object-cover"
            />
          </div>

          {/* Doodles — never over text, 40–60% opacity */}
          <Heart
            aria-hidden="true"
            className="absolute right-[6%] top-[8%] size-8 fill-coral/60 text-coral/60"
          />
          <Star
            aria-hidden="true"
            className="absolute bottom-[14%] right-[2%] size-7 fill-honey/60 text-honey/60"
          />
          <Sparkles
            aria-hidden="true"
            className="absolute left-[4%] top-[42%] size-6 text-sky"
          />

          {/* Trust badges on the photo's edge */}
          <motion.div
            {...float(0)}
            className="absolute left-0 top-[10%] sm:-left-4"
          >
            <TrustBadge
              tone="sprout"
              icon={ShieldCheck}
              title="100% genuine"
              subtitle="Verified products"
            />
          </motion.div>
          <motion.div
            {...float(1.2)}
            className="absolute right-0 top-[48%] hidden sm:block sm:-right-4"
          >
            <TrustBadge
              tone="sky"
              icon={CalendarCheck}
              title="Never miss a vaccine"
              subtitle="Timely reminders"
            />
          </motion.div>
          <motion.div
            {...float(2.4)}
            className="absolute bottom-[4%] left-[6%]"
          >
            <TrustBadge
              tone="blush"
              icon={Truck}
              title="Home delivery"
              subtitle="Safe & on time"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
