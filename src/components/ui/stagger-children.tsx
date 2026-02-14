import { ReactNode, Children, isValidElement } from "react";
import { motion, Variants, useReducedMotion, Variant } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
}

const animations: Record<string, { hidden: Variant; visible: Variant }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
};

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  animation = "fade-up",
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: animations[animation].hidden,
        visible: {
          ...(typeof animations[animation].visible === "object"
            ? animations[animation].visible
            : {}),
          transition: {
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Grid variant with staggered animation
interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  columns?: number;
  staggerDelay?: number;
}

export function StaggerGrid({
  children,
  className,
  columns = 3,
  staggerDelay = 0.05,
}: StaggerGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const gridClasses = cn(
    "grid gap-6 grid-cols-1 md:grid-cols-2",
    columns === 3 && "lg:grid-cols-3",
    columns === 4 && "lg:grid-cols-4",
    columns === 2 && "lg:grid-cols-2",
    className
  );

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      };

  return (
    <motion.div
      className={gridClasses}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
