import { DashboardShell } from "@/components/layout/DashboardShell";
import { LiveSimulationPreview } from "@/components/dev/LiveSimulationPreview";

export default function Home() {
  return (
    <DashboardShell>
      <LiveSimulationPreview />
    </DashboardShell>
  );
}
