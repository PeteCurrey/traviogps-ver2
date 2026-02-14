import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1200);
    const exitTimer = setTimeout(() => setIsExiting(true), 3000);
    const completeTimer = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const logoContent = (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MapPin className="h-10 w-10 text-accent" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>

        <motion.span
          className="font-bold text-2xl md:text-3xl tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-foreground">RAM</span>
          <span className="text-accent ml-2">Tracking</span>
        </motion.span>
      </div>

      <motion.div
        className="h-px bg-accent"
        initial={{ width: 0 }}
        animate={{ width: showText ? 120 : 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />

      <motion.p
        className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Fleet Management Solutions
      </motion.p>
    </div>
  );

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {logoContent}
        </motion.div>
      ) : (
        <motion.div
          key="splash-exit"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {logoContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
