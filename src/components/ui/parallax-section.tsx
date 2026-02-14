import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  speed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function ParallaxSection({
  children,
  className,
  backgroundImage,
  speed = 0.3,
  overlay = true,
  overlayOpacity = 0.6,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-10%", "10%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.1, 1, 1.1]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y, scale }}
        >
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {overlay && (
            <div
              className="absolute inset-0 bg-background"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </motion.div>
      )}
      {children}
    </div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-50 * speed, 50 * speed]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Text reveal on scroll
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade in on scroll
interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

export function FadeInOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  const yUp = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, 0]);
  const yDown = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-40, 0]);
  const xLeft = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-40, 0]);

  const getTransforms = (): { x?: MotionValue<number>; y?: MotionValue<number> } => {
    switch (direction) {
      case "up":
        return { y: yUp };
      case "down":
        return { y: yDown };
      case "left":
        return { x: xLeft };
      case "right":
        return { x: xRight };
      default:
        return { y: yUp };
    }
  };

  const transforms = getTransforms();

  return (
    <motion.div
      ref={ref}
      style={{ opacity, ...transforms }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
