import InfantCalculatorForm from "@/components/baby/InfantCalculatorForm";
import InfantCalculatorHistory from "@/components/baby/InfantCalculatorHistory";
import InfantGrowthChartLazy from "@/components/baby/InfantGrowthChartLazy";

export default async function InfantCalculationPage({
  params,
}: {
  params: Promise<{ infantId: string }>;
}) {
  const { infantId: rawId } = await params;
  const infantId = Number(rawId);

  if (!infantId || isNaN(infantId)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Invalid infant ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-soft p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Infant Growth Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Calculate and track your infant&apos;s growth metrics over time.
          </p>
        </div>

        <InfantCalculatorForm infantId={infantId} />
        <InfantGrowthChartLazy infantId={infantId} />
        <InfantCalculatorHistory infantId={infantId} />
      </div>
    </div>
  );
}
