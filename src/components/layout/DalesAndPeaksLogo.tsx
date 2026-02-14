import { cn } from "@/lib/utils";
import dalesAndPeaksLogo from "@/assets/dales-peaks-logo.png";

interface DalesAndPeaksLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function DalesAndPeaksLogo({ className, size = "md" }: DalesAndPeaksLogoProps) {
  const sizeClasses = {
    sm: "h-6 md:h-8",
    md: "h-10 md:h-12",
    lg: "h-14 md:h-16"
  };

  return (
    <img 
      src={dalesAndPeaksLogo} 
      alt="Dales & Peaks" 
      className={cn(
        "w-auto object-contain mix-blend-screen",
        sizeClasses[size],
        className
      )}
    />
  );
}
