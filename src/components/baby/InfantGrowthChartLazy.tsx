"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const InfantGrowthChart = dynamic(
  () => import("@/components/baby/InfantGrowthChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[420px] w-full rounded-xl" />,
  },
);

export default function InfantGrowthChartLazy({
  infantId,
}: {
  infantId: number;
}) {
  return <InfantGrowthChart infantId={infantId} />;
}
