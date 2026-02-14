import { useRef, useState, useCallback, useEffect, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
  speed = 400,
  glare = true,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform({ rotateX, rotateY, scale });
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [maxTilt, scale, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        scale: transform.scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      {children}

      {/* Glare effect */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

// Simpler version with just tilt transform style
export function useTiltStyle(options: { max?: number; scale?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { max = 10, scale = 1.02 } = options;

  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.1s ease-out",
      });
    },
    [max, scale, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
    });
  }, []);

  return { ref, style, handleMouseMove, handleMouseLeave };
}
