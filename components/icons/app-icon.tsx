import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AppIconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/** Consistent icon styling — slightly heavier stroke, human/product feel */
export function AppIcon({
  icon: Icon,
  className,
  size = 18,
  strokeWidth = 1.85,
}: AppIconProps) {
  return (
    <Icon
      className={cn("shrink-0", className)}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}
