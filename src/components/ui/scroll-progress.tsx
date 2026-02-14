import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

export function ScrollProgress({
  className,
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 z-50 bg-accent origin-left",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{
        scaleX,
        height,
      }}
    />
  );
}

// Circular scroll progress indicator
interface CircularProgressProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

export function CircularScrollProgress({
  className,
  size = 48,
  strokeWidth = 3,
  showPercentage = false,
}: CircularProgressProps) {
  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-accent"
          style={{
            pathLength,
            strokeDasharray: circumference,
            strokeDashoffset: 0,
          }}
        />
      </svg>
      {showPercentage && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-xs font-medium"
          style={{
            opacity: scrollYProgress,
          }}
        >
          {/* Display percentage */}
        </motion.span>
      )}
    </div>
  );
}
