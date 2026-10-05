import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <div className="rounded-2xl bg-card p-2.5 shadow-sm sm:p-3 space-y-3">
        {/* Image */}
        <Skeleton className="aspect-square w-full rounded-xl" />

        <div className="space-y-2 px-1">
            {/* Title */}
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />

            {/* Price */}
            <Skeleton className="h-5 w-1/3" />

            {/* Actions */}
            <div className="flex gap-2 pt-1">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 flex-1 rounded-full" />
            </div>
        </div>
        </div>
    );
}
