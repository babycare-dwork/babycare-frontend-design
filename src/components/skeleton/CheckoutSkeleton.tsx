import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`space-y-4 rounded-lg bg-card p-4 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default function CheckoutSkeleton() {
  return (
    <main
      className="min-h-screen bg-background"
      aria-busy="true"
      aria-label="Loading checkout"
    >
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:py-8">
        {/* Page title */}
        <Skeleton className="mb-4 h-8 w-40 sm:mb-6 sm:h-9" />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="space-y-4 sm:space-y-6 lg:col-span-7">
            {/* Order items */}
            <SectionCard>
              <Skeleton className="h-6 w-32" />
              <Separator />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 shrink-0 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Delivery address */}
            <SectionCard>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2 rounded-lg border p-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Billing details */}
            <SectionCard>
              <Skeleton className="h-6 w-36" />
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldSkeleton />
                <FieldSkeleton />
                <div className="sm:col-span-2">
                  <FieldSkeleton />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <FieldSkeleton />
                <FieldSkeleton />
                <div className="sm:col-span-2">
                  <FieldSkeleton />
                </div>
              </div>
            </SectionCard>

            {/* Payment method */}
            <SectionCard>
              <Skeleton className="h-6 w-36" />
              <Separator />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
            </SectionCard>
          </section>

          {/* Order summary */}
          <aside className="lg:col-span-5">
            <SectionCard>
              <Skeleton className="h-6 w-32" />
              <Separator />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-11 w-full rounded-md" />
            </SectionCard>
          </aside>
        </div>
      </div>
    </main>
  );
}

export function OrderItemsSkeleton() {
  return (
    <div
      className="space-y-3"
      aria-busy="true"
      aria-label="Loading order items"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 shrink-0 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  );
}

export function SummarySkeleton() {
  return (
    <div
      className="space-y-4 rounded-lg bg-card p-4 shadow-sm sm:p-6"
      aria-busy="true"
      aria-label="Loading order summary"
    >
      <Skeleton className="h-6 w-32" />
      <Separator />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  );
}
