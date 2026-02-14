import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, spring, delay, hasAnimated]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

interface StatsCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
  icon?: React.ReactNode;
}

export function StatsCounter({
  value,
  label,
  prefix,
  suffix,
  decimals,
  delay = 0,
  icon,
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="text-center"
    >
      {icon && (
        <div className="mb-3 flex justify-center text-accent">{icon}</div>
      )}
      <div className="font-serif text-display-3 md:text-display-2 text-foreground mb-2">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          delay={delay * 0.1}
        />
      </div>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
}
