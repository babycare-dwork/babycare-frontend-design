"use client";

import { FC } from "react";
import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "Cash on Delivery" | "Esewa";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  disabled?: boolean;
}

const methods: {
  value: PaymentMethod;
  title: string;
  description: string;
  image: string;
  badge?: string;
}[] = [
  {
    value: "Cash on Delivery",
    title: "Cash on Delivery",
    description: "Pay in cash when your order arrives at your door.",
    image: "/payment/cod.png",
  },
  {
    value: "Esewa",
    title: "eSewa",
    description: "Pay instantly and securely with your eSewa wallet.",
    image: "/payment/esewa.png",
    badge: "Digital Wallet",
  },
];

const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Payment method"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
    >
      {methods.map((method) => {
        const selected = value === method.value;

        return (
          <button
            key={method.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(method.value)}
            className={cn(
              "group relative flex flex-col gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-60",
              selected
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm",
            )}
          >
            {/* check indicator */}
            <span
              className={cn(
                "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                selected
                  ? "scale-100 border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 bg-transparent",
              )}
              aria-hidden="true"
            >
              {selected && <Check className="h-3 w-3" />}
            </span>

            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white">
                <Image
                  src={method.image}
                  alt={`${method.title} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="font-semibold leading-tight">{method.title}</p>
                {method.badge && (
                  <span className="mt-1 inline-block rounded-full bg-[#60BB46]/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#3f8c2b]">
                    {method.badge}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {method.description}
            </p>

            {method.value === "Esewa" && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-[#60BB46]"
                  aria-hidden="true"
                />
                Secure online payment
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
