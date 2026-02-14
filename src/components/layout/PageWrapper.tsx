import { ReactNode } from "react";
import { motion, type Transition } from "framer-motion";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4,
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
