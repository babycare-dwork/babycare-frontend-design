import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";
import CheckoutSkeleton from "@/components/skeleton/CheckoutSkeleton";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutClient />
    </Suspense>
  );
}
