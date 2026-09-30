import Image from "next/image";
import { Check, PlayCircle, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { BABY_CARE_PLAY_STORE_URL } from "@/config/app-constant";
import Link from "next/link";

const features = [
  "Vaccination Reminders",
  "Quick Re-orders",
  "Pediatric Clinic Directory",
  "Growth Milestones Tracker",
];

export function AppPromo() {
  return (
    <section className="py-10 sm:py-16 bg-[#f7f6f2]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <Smartphone size={14} className="shrink-0" />
                Available on Android
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 md:mb-5 leading-tight">
                Download our App
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mb-6 md:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Parenting made easier. Download our app for safe baby products,
                timely vaccination reminders, healthcare access, and trusted
                guidance — all in one place.
              </p>

              <div className="flex justify-center lg:justify-start mb-8 md:mb-10">
                <Link
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-full flex items-center justify-center gap-3 cursor-pointer transition-colors duration-300 shadow-md"
                  href={BABY_CARE_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on Google Play"
                >
                  <PlayCircle size={24} className="shrink-0" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-wide">
                      Get it on
                    </span>
                    <span className="text-sm sm:text-base font-bold">
                      Google Play
                    </span>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto lg:mx-0">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-green-600 shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
                <div className="rounded-[2rem] border-4 border-green-100 overflow-hidden shadow-lg">
                  <Image
                    src="/app-promo.png"
                    alt="Baby Care App Interface"
                    width={400}
                    height={320}
                    className={cn("w-full h-auto object-contain")}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
