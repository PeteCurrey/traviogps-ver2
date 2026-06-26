import { cn } from "@/lib/utils";

interface TravioLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TravioLogo({ className, size = "md" }: TravioLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Gold diamond mark */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            size === "sm" ? "w-6 h-6" : size === "md" ? "w-7 h-7" : "w-8 h-8"
          )}
        >
          <polygon
            points="12,2 22,12 12,22 2,12"
            fill="#FF6B1A"
            opacity="0.9"
          />
          <polygon
            points="12,6 18,12 12,18 6,12"
            fill="#0B0F19"
          />
          <circle cx="12" cy="12" r="2" fill="#FF6B1A" />
        </svg>
      </div>
      <span
        className={cn("font-bold tracking-tight leading-none", sizeClasses[size])}
        style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
      >
        <span style={{ color: "#F5F5F5" }}>Trav</span>
        <span style={{ color: "#FF6B1A" }}>io</span>
      </span>
    </div>
  );
}
