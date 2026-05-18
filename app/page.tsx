import { DashboardShell } from "@/components/layout/DashboardShell";
import { MatchDashboard } from "@/components/match/MatchDashboard";

export default function Home() {
  return (
    <DashboardShell>
      <MatchDashboard />
    </DashboardShell>
  );
}
