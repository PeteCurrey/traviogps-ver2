import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface DalesAndPeaksLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function DalesAndPeaksLogo({ className, size = "md" }: DalesAndPeaksLogoProps) {
  const sizeClasses = {
    sm: "text-base md:text-lg",
    md: "text-lg md:text-xl",
    lg: "text-xl md:text-2xl"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <MapPin className={cn(iconSizes[size], "text-accent")} />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
      </div>
      <span className={cn(
        "font-bold tracking-tight",
        sizeClasses[size]
      )} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <span className="text-foreground">Trav</span>
        <span className="text-accent">io</span>
      </span>
    </div>
  );
}
