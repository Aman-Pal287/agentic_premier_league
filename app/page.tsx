import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <DashboardShell>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card neon-border border-0 bg-transparent md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Live Match Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-400">
            Step 1 complete — project scaffold ready. Next: IPL mock data & simulation.
          </CardContent>
        </Card>
        <Card className="glass-card border-0 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-400">
            AI Insights · Predictions · Quiz · Fan Reactions
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
