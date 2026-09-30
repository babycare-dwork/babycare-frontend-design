"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  "Pediatrician-reviewed product selection",
  "Trusted local pharmacy & store partners",
  "Fast, careful delivery to your doorstep",
];

export function AboutStory() {
  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-4/3 rounded-[2rem] overflow-hidden shadow-xl">
              <Image
                src="/baby-mom.png"
                alt="Parent caring for a baby"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* floating stat card */}
            <div className="hidden sm:flex -mt-10 ml-6 lg:ml-10 items-center gap-3 bg-white rounded-2xl shadow-lg px-5 py-4 border border-gray-100 relative z-10 w-fit">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                  Verified & Safe
                </p>
                <p className="text-xs text-gray-500 leading-none">
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
            <p className="text-xs font-semibold tracking-wide text-primary mb-2">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Built by parents, for parents
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6 max-w-2xl">
              BabyCare started with a simple idea: parenting shouldn&apos;t feel
              overwhelming. We bring together safe products, trusted healthcare
              guidance, and timely reminders so you can spend less time worrying
              and more time enjoying the little moments.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">
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
