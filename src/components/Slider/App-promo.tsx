import Image from "next/image";
import { BellRing, Check, PlayCircle, Repeat, Stethoscope, TrendingUp } from "lucide-react";
import { BABY_CARE_PLAY_STORE_URL } from "@/config/app-constant";
import Link from "next/link";
import { toneClasses, toneOrder } from "@/components/Tag";

const features = [
  { label: "Vaccination reminders", icon: BellRing },
  { label: "Quick re-orders", icon: Repeat },
  { label: "Pediatric clinic directory", icon: Stethoscope },
  { label: "Growth milestones tracker", icon: TrendingUp },
];

export function AppPromo() {
  return (
    <section className="relative overflow-hidden bg-sky-soft">
      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 size-[560px] -translate-y-1/2 rounded-full border-[48px] border-surface-raised/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-surface-raised/40"
      />

      <div className="container relative mx-auto grid items-center gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="mb-5 inline-flex h-8 items-center gap-2 rounded-full bg-surface-raised px-4 text-sm font-bold text-leaf shadow-sm">
            <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            Free on Android
          </span>

          <h2 className="mb-4 font-display text-[34px] leading-[42px] font-extrabold tracking-[-0.01em] text-ink sm:text-[44px] sm:leading-[52px]">
            Parenting, made easier — in your pocket
          </h2>

          <p className="mx-auto mb-8 max-w-[52ch] text-base leading-[26px] text-ink-muted sm:text-lg sm:leading-[30px] lg:mx-0">
            Safe baby products, timely vaccination reminders, healthcare access
            and trusted guidance — all in one app.
          </p>

          <ul className="mx-auto mb-10 grid max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mx-0">
            {features.map(({ label, icon: Icon }, i) => {
              const tone = toneClasses[toneOrder[i % toneOrder.length]];
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-full bg-surface-raised/70 py-1.5 pl-1.5 pr-4"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${tone.bg} ${tone.ink}`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">{label}</span>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-center lg:justify-start">
            <Link
              className="flex h-14 items-center justify-center gap-3 rounded-full bg-navy px-6 text-on-navy transition-all duration-200 ease-out hover:-translate-y-px hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sky-soft"
              href={BABY_CARE_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <PlayCircle size={26} className="shrink-0" aria-hidden="true" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  Get it on
                </span>
                <span className="text-base font-bold">Google Play</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[440px]">
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-full bg-surface-raised"
          />
          <Image
            src="/app-promo.png"
            alt="BabyCare app showing vaccination reminders and featured products"
            width={1354}
            height={1436}
            sizes="(max-width: 1024px) 80vw, 440px"
            className="relative h-auto w-full object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
