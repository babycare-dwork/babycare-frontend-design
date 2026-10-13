"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EsewaFailurePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <XCircle className="h-14 w-14 text-destructive" />
      <h1 className="text-2xl font-bold">Payment failed or cancelled</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Your payment was not completed. Your order is still pending. You can try
        again or choose Cash on Delivery.
      </p>
      <Button asChild>
        <Link href="/cart">Back to cart</Link>
      </Button>
    </main>
  );
}
