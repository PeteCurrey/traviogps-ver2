import { useRef, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

// Generate unique visitor ID
export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem("dp_visitor_id");
    if (!id) {
      id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("dp_visitor_id", id);
    }
    setVisitorId(id);
  }, []);

  return visitorId;
}

// 3D Tilt effect hook for property cards
export function useTilt(options: { max?: number; scale?: number; speed?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { max = 15, scale = 1.02, speed = 400 } = options;

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) * max;

    setTransform({ rotateX, rotateY, scale });
  }, [max, scale, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove as any);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove as any);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const style = {
    transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  };

  return { ref, style, transform };
}

// Magnetic button effect hook
export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  }, [strength, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove as any);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove as any);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0 ? "transform 0.3s ease-out" : "none",
  };

  return { ref, style, position };
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setProgress(currentProgress);
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { progress, scrollY };
}

// Element in view hook with threshold
export function useInView(options: { threshold?: number; once?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0.1, once = false } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
}

// Parallax effect hook
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const elementTop = rect.top + scrollPosition;
      const relativeScroll = scrollPosition - elementTop + window.innerHeight;
      setOffset(relativeScroll * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, prefersReducedMotion]);

  return { ref, offset, style: { transform: `translateY(${offset}px)` } };
}

// Recently viewed properties hook
export function useRecentlyViewed(maxItems: number = 6) {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dp_recently_viewed");
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addViewed = useCallback((propertySlug: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((slug) => slug !== propertySlug);
      const updated = [propertySlug, ...filtered].slice(0, maxItems);
      localStorage.setItem("dp_recently_viewed", JSON.stringify(updated));
      return updated;
    });
  }, [maxItems]);

  const clearViewed = useCallback(() => {
    localStorage.removeItem("dp_recently_viewed");
    setRecentlyViewed([]);
  }, []);

  return { recentlyViewed, addViewed, clearViewed };
}
