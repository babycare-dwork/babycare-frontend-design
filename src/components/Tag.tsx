import type React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Tone = "blush" | "sky" | "honey" | "sprout";

/** Fill + text-safe ink for each soft tint. Rotate blush → sky → honey → sprout. */
export const toneClasses: Record<Tone, { bg: string; ink: string; solid: string }> = {
  blush: { bg: "bg-blush-soft", ink: "text-coral-strong", solid: "bg-coral" },
  sky: { bg: "bg-sky-soft", ink: "text-shield", solid: "bg-sky" },
  honey: { bg: "bg-honey-soft", ink: "text-honey-ink", solid: "bg-honey" },
  sprout: { bg: "bg-sprout-soft", ink: "text-leaf", solid: "bg-sprout" },
};

export const toneOrder: Tone[] = ["blush", "sky", "honey", "sprout"];

/** Soft pill label for categories and highlights. Not interactive. */
export function Tag({
  tone = "sky",
  icon: Icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  const t = toneClasses[tone];
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full px-4 text-sm font-bold",
        t.bg,
        t.ink,
        className,
      )}
    >
      {Icon ? (
        <Icon className="size-4" aria-hidden="true" />
      ) : (
        <span className="size-2 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

/** Floating pill with an icon disc — sits on the edge of hero photos. */
export function TrustBadge({
  tone = "sky",
  icon: Icon,
  title,
  subtitle,
  className,
}: {
  tone?: Tone;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  const t = toneClasses[tone];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full bg-surface-raised py-2 pl-2 pr-5 shadow-md",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full",
          t.bg,
          t.ink,
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="font-display text-[15px] leading-[18px] font-bold text-ink">
          {title}
        </span>
        {subtitle && (
          <span className="text-xs font-semibold text-ink-muted">{subtitle}</span>
        )}
      </span>
    </div>
  );
}
