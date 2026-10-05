"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  BABY_CARE_FACEBOOK_URL,
  BABY_CARE_INSTAGRAM_URL,
} from "@/config/app-constant";
import { cn } from "@/lib/utils";

export function Footer() {
  const socialMediaLinks = [
    {
      label: "Facebook",
      href: BABY_CARE_FACEBOOK_URL,
      icon: <Facebook size={20} />,
    },
    {
      label: "Instagram",
      href: BABY_CARE_INSTAGRAM_URL,
      icon: <Instagram size={20} />,
    },
  ];

  const serviceLinks = [
    { label: "Vaccination Schedules", href: "#" },
    { label: "Healthcare Centers", href: "#" },
    { label: "Baby Care Tips", href: "#" },
    { label: "Expert Guidance", href: "#" },
  ];

  const categoryLinks = [
    { label: "Nutrition", href: "#" },
    { label: "Baby Care & Bath", href: "#" },
    { label: "Feeding & Nursing", href: "#" },
    { label: "Diapers & Changing", href: "#" },
  ];

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success(`Subscribed successfully with ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-navy text-on-navy pt-16 pb-8 sm:pt-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="space-y-4 sm:space-y-6">
            <Link href="/" className="inline-block rounded-2xl bg-surface-raised px-4 py-2">
              <Image
                src="/logo.png"
                alt="Babycare Studios Logo"
                width={100}
                height={100}
                className="w-auto h-14 sm:h-16"
              />
            </Link>
            <p className="text-sm leading-[22px] text-on-navy/80 max-w-xs">
              A complete baby care platform offering genuine products, smart
              health tools, vaccination tracking, and trusted guidance for
              modern parents.
            </p>
            <div className="flex gap-3" role="list">
              {socialMediaLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-full bg-on-navy/10 text-on-navy hover:bg-on-navy/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  aria-label={`Visit our ${link.label} page`}
                  role="listitem"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <h4 className="font-display text-lg leading-[26px] font-bold text-on-navy mb-4 sm:mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-sm leading-[22px] text-on-navy/80">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-sm hover:text-on-navy hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Shop Categories">
            <h4 className="font-display text-lg leading-[26px] font-bold text-on-navy mb-4 sm:mb-6">
              Shop categories
            </h4>
            <ul className="space-y-3 text-sm leading-[22px] text-on-navy/80">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-sm hover:text-on-navy hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-display text-lg leading-[26px] font-bold text-on-navy mb-4 sm:mb-6">
              Newsletter
            </h4>
            <p className="text-sm leading-[22px] text-on-navy/80 mb-4">
              Receive 10% off your first order, exclusive updates, inspiration
              and more.
            </p>
            <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                className={cn(
                  "h-12 w-full rounded-full border-[1.5px] border-on-navy/40 bg-on-navy/5 pl-5 pr-14 text-base text-on-navy",
                  "transition-colors focus-visible:outline-none focus-visible:border-sky focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                  "placeholder:text-on-navy/60",
                )}
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex size-10 items-center justify-center rounded-full bg-coral-strong text-on-coral hover:brightness-94 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                aria-label="Subscribe to newsletter"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-on-navy/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-on-navy/80">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Babycare Studios. All rights reserved.
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            <Link
              href="/privacy-policy"
              className="rounded-sm hover:text-on-navy hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms-conditions"
              className="rounded-sm hover:text-on-navy hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Terms & conditions
            </Link>
            <Link
              href="#"
              className="rounded-sm hover:text-on-navy hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Orders & returns
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
