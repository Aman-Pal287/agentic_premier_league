import { DashboardHeader } from "@/components/layout/DashboardHeader";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
      <footer className="border-t border-white/5 py-4 text-center text-xs text-slate-600">
        MatchMind AI · IPL Second-Screen Demo · Built with Next.js & Gemini
      </footer>
    </div>
  );
}
