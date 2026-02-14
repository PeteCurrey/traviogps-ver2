import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  children: React.ReactNode;
}

export function MagneticButton({
  strength = 0.4,
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      setPosition({ x: distanceX, y: distanceY });
    },
    [strength, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <Button ref={ref} className={cn("btn-premium", className)} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}

// Premium CTA button with shimmer effect
export function PremiumCTA({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  return (
    <MagneticButton
      strength={0.3}
      className={cn(
        "relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90",
        "px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </MagneticButton>
  );
}
