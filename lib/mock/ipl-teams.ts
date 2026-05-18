import type { IPLTeamId } from "@/lib/types/match";

export interface IPLTeam {
  id: IPLTeamId;
  name: string;
  short: string;
  city: string;
  primary: string;
  secondary: string;
}

export const IPL_TEAMS: Record<IPLTeamId, IPLTeam> = {
  MI: {
    id: "MI",
    name: "Mumbai Indians",
    short: "MI",
    city: "Mumbai",
    primary: "#004BA0",
    secondary: "#D1AB3E",
  },
  CSK: {
    id: "CSK",
    name: "Chennai Super Kings",
    short: "CSK",
    city: "Chennai",
    primary: "#FFFF3C",
    secondary: "#0081E9",
  },
};

export function getTeam(id: IPLTeamId): IPLTeam {
  return IPL_TEAMS[id];
}
