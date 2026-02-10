import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealVariant = "up" | "fade" | "scale";

type RevealOnceProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variant?: RevealVariant;
  /** IntersectionObserver threshold (0..1) */
  threshold?: number;
  /** Root margin like "0px 0px -10% 0px" */
  rootMargin?: string;
};

export function RevealOnce({
  children,
  className,
  as = "div",
  variant = "up",
  threshold = 0.18,
  rootMargin = "0px 0px -12% 0px",
}: RevealOnceProps) {
  const Comp = as as any;
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"out" | "in">("out");

  const baseClass = useMemo(() => {
    if (variant === "fade") return "reveal-fade";
    if (variant === "scale") return "reveal-scale";
    return "reveal";
  }, [variant]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setState("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setState("in");
          io.disconnect(); // one-time reveal
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Comp ref={ref} data-state={state} className={cn(baseClass, className)}>
      {children}
    </Comp>
  );
}
