import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 neon-border">
              <Zap className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                MatchMind <span className="text-cyan-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400">IPL Second-Screen Companion</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-amber-500/50 text-amber-400">
              IPL 2025
            </Badge>
            <Badge variant="outline" className="border-[#004ba0]/50 text-blue-300">
              MI vs CSK
            </Badge>
            <Badge variant="outline" className="text-slate-400">
              Wankhede
            </Badge>
            <Badge className="border-red-500/30 bg-red-500/20 text-red-400 live-pulse">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500" />
              LIVE
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
