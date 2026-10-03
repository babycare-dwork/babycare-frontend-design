import type React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  /** lg = display (44px), md = h2 (28px) */
  size?: "lg" | "md";
  id?: string;
  className?: string;
}

/**
 * Opens every section: eyebrow (Montserrat, uppercase, coral-strong) →
 * title (Nunito 800, always ink) → optional lead (body-lg, ink-muted, ≤60ch).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "lg",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          "font-display font-extrabold text-ink",
          size === "lg"
            ? "text-[34px] leading-[42px] tracking-[-0.01em] sm:text-[44px] sm:leading-[52px]"
            : "text-[28px] leading-9",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className="max-w-[60ch] text-base leading-[26px] text-ink-muted sm:text-lg sm:leading-[30px]">
          {lead}
        </p>
      )}
    </div>
  );
}
