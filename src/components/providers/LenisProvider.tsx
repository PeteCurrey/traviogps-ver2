"use client";

import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
        }) as unknown as { destroy: () => void; raf: (time: number) => void };

        lenisRef.current = lenis;

        function raf(time: number) {
          if (lenis) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
        }

        requestAnimationFrame(raf);
      } catch (err) {
        // Lenis not available; graceful fallback
        console.warn("Lenis smooth scroll unavailable:", err);
      }
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
