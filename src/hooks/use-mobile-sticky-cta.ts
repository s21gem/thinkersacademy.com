import { useEffect, useMemo, useRef, useState } from "react";

type UseMobileStickyCtaOptions = {
  enabled: boolean;
  heroId: string;
  pricingId: string;
  enrollId: string;
  inlineCtaIds?: string[];
  copyDefault: string;
  copyAlt: string;
  copyAltDelayMs?: number;
};

type UseMobileStickyCtaReturn = {
  visible: boolean;
  minimized: boolean;
  label: string;
  markInteracted: () => void;
};

// Mobile-only CTA controller:
// - Shows after hero
// - Hides when Pricing / Enroll / Inline CTA blocks are in view
// - Minimizes on scroll down, expands on scroll up
// - Rotates copy once (default -> alt) after a delay unless user interacts
export function useMobileStickyCta(options: UseMobileStickyCtaOptions): UseMobileStickyCtaReturn {
  const {
    enabled,
    heroId,
    pricingId,
    enrollId,
    inlineCtaIds = [],
    copyDefault,
    copyAlt,
    copyAltDelayMs = 7000,
  } = options;

  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [label, setLabel] = useState(copyDefault);
  const interactedRef = useRef(false);
  const formFocusRef = useRef(false);
  const inlineInViewRef = useRef(false);
  const pricingInViewRef = useRef(false);
  const enrollInViewRef = useRef(false);

  const markInteracted = () => {
    interactedRef.current = true;
  };

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }

    // Copy shift timer (max 2 copies)
    const t = window.setTimeout(() => {
      if (!interactedRef.current) setLabel(copyAlt);
    }, copyAltDelayMs);
    return () => window.clearTimeout(t);
  }, [enabled, copyAlt, copyAltDelayMs]);

  useEffect(() => {
    if (!enabled) return;

    const enrollEl = document.getElementById(enrollId);
    if (!enrollEl) return;

    // Hide sticky CTA while user is focused on any form input.
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("input, textarea, select, button")) {
        formFocusRef.current = true;
        // visibility will reconcile on next tick/scroll
      }
    };
    const onFocusOut = () => {
      formFocusRef.current = false;
    };

    enrollEl.addEventListener("focusin", onFocusIn);
    enrollEl.addEventListener("focusout", onFocusOut);
    return () => {
      enrollEl.removeEventListener("focusin", onFocusIn);
      enrollEl.removeEventListener("focusout", onFocusOut);
    };
  }, [enabled, enrollId]);

  useEffect(() => {
    if (!enabled) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;

          if (id === pricingId) {
            // “Fully visible” isn't realistic for tall sections on mobile.
            // We treat "fully visible" as "dominant in viewport".
            pricingInViewRef.current = entry.intersectionRatio >= 0.6;
          }
          if (id === enrollId) {
            enrollInViewRef.current = entry.isIntersecting;
          }

          if (inlineCtaIds.includes(id)) {
            // Inline CTA blocks are designed to replace sticky CTA temporarily.
            inlineInViewRef.current = entry.isIntersecting;
          }
        }
      },
      {
        threshold: [0, 0.2, 0.4, 0.6],
        rootMargin: "0px 0px -10% 0px",
      },
    );

    const pricingEl = document.getElementById(pricingId);
    const enrollEl = document.getElementById(enrollId);
    if (pricingEl) obs.observe(pricingEl);
    if (enrollEl) obs.observe(enrollEl);

    inlineCtaIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [enabled, pricingId, enrollId, inlineCtaIds]);

  useEffect(() => {
    if (!enabled) return;

    const heroEl = document.getElementById(heroId);
    if (!heroEl) return;

    let raf = 0;
    let lastY = window.scrollY;

    const reconcile = () => {
      raf = 0;

      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      const heroHeight = heroEl.offsetHeight || 0;
      const pastHero = y > Math.max(0, heroHeight - 64);

      const shouldHide =
        pricingInViewRef.current ||
        enrollInViewRef.current ||
        inlineInViewRef.current ||
        formFocusRef.current;

      setVisible(pastHero && !shouldHide);

      // minimize only when CTA is meant to be present and user scrolls down
      if (!reduceMotion) {
        if (delta > 0) setMinimized(true);
        if (delta < 0) setMinimized(false);
      } else {
        setMinimized(false);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(reconcile);
    };

    // initial state
    reconcile();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, heroId, reduceMotion]);

  return { visible, minimized, label, markInteracted };
}
