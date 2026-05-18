import { DashboardShell } from "@/components/layout/DashboardShell";
import { MockDataPreview } from "@/components/dev/MockDataPreview";

export default function Home() {
  return (
    <DashboardShell>
      <MockDataPreview />
    </DashboardShell>
  );
}
