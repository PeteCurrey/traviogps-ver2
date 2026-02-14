import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show text after logo animation completes
    const textTimer = setTimeout(() => setShowText(true), 1600);
    // Start exit animation
    const exitTimer = setTimeout(() => setIsExiting(true), 3800);
    // Complete and unmount
    const completeTimer = setTimeout(() => onComplete(), 4800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Logo color matching the header logo (darker burnt orange/terracotta)
  const logoColor = "#a14c2e";

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            {/* Animated Logo - Two semi-circles, one from top, one from bottom */}
            <div className="flex items-center mb-10">
              {/* Left semi-circle - fades from top */}
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ 
                  y: 4, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 1.4, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2 
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left crescent - semi-circle facing right */}
                  <path
                    d="M20 2C10.06 2 2 10.06 2 20C2 29.94 10.06 38 20 38C20 38 20 29.94 20 20C20 10.06 20 2 20 2Z"
                    fill={logoColor}
                  />
                </svg>
              </motion.div>

              {/* Right semi-circle - fades from bottom */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ 
                  y: -4, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 1.4, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.35 
                }}
                style={{ marginLeft: "-36px" }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Right arc - semi-circle facing left */}
                  <path
                    d="M20 2C29.94 2 38 10.06 38 20C38 29.94 29.94 38 20 38C20 38 20 29.94 20 20C20 10.06 20 2 20 2Z"
                    fill={logoColor}
                  />
                </svg>
              </motion.div>

              {/* Text: DALES & PEAKS */}
              <motion.span
                className="ml-4 font-sans text-lg md:text-xl tracking-[0.25em] text-primary font-light uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: showText ? 1 : 0, 
                  x: showText ? 0 : 20 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Dales & Peaks
              </motion.span>
            </div>

            {/* Subtle glow effect */}
            <motion.div
              className="absolute pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ 
                duration: 2.5, 
                delay: 1.2,
                ease: "easeInOut" 
              }}
              style={{
                width: "200px",
                height: "100px",
                background: `radial-gradient(ellipse at center, ${logoColor}40 0%, transparent 70%)`,
                filter: "blur(25px)",
              }}
            />

            {/* Animated underline */}
            <motion.div
              className="h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: showText ? 140 : 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: showText ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Premium Estate Agents
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="splash-exit"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            {/* Static final logo state */}
            <div className="flex items-center mb-10">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "translateY(4px)" }}>
                <path
                  d="M20 2C10.06 2 2 10.06 2 20C2 29.94 10.06 38 20 38C20 38 20 29.94 20 20C20 10.06 20 2 20 2Z"
                  fill={logoColor}
                />
              </svg>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "-36px", transform: "translateY(-4px)" }}>
                <path
                  d="M20 2C29.94 2 38 10.06 38 20C38 29.94 29.94 38 20 38C20 38 20 29.94 20 20C20 10.06 20 2 20 2Z"
                  fill={logoColor}
                />
              </svg>
              <span className="ml-4 font-sans text-lg md:text-xl tracking-[0.25em] text-primary font-light uppercase">
                Dales & Peaks
              </span>
            </div>
            <div className="h-px bg-accent w-[140px]" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-5">
              Premium Estate Agents
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
