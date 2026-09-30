"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function VendorCTASection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary via-primary/80 to-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto border border-white/30"
            whileHover={{ scale: 1.08, rotate: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <ShoppingBag className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Start Selling on BabyCare
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of vendors reaching parents who trust BabyCare. Grow
            your business with our trusted marketplace platform.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/vendor-register">
                <Button
                  size="lg"
                  className="cursor-pointer bg-white text-primary hover:bg-white/90 font-semibold py-4 text-lg h-auto"
                >
                  Register as Vendor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
