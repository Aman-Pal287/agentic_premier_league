"use client";

import { MatchProvider } from "@/context/MatchContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MatchProvider>{children}</MatchProvider>;
}
