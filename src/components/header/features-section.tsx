"use client";

import { Shield, TruckIcon, BellRing } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Genuine Products",
    description: "Carefully sourced genuine products you can trust.",
  },
  {
    icon: TruckIcon,
    title: "Home Delivery",
    description: "Safe, timely delivery of baby essentials to your home.",
  },
  {
    icon: BellRing,
    title: "Vaccine Schedules",
    description: "Timely reminders for vaccination schedules.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="w-full bg-gradient-to-br from-primary via-primary/80 to-primary py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* soft glow accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center group"
                variants={itemVariants}
              >
                <motion.div
                  className="mb-5 md:mb-6 rounded-2xl bg-white/10 backdrop-blur-sm p-5 md:p-6 border border-white/20 shadow-xl"
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "rgba(255,255,255,0.18)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <Icon className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-white stroke-[1.5]" />
                </motion.div>
                <h3 className="mb-3 text-xl md:text-2xl font-bold text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
