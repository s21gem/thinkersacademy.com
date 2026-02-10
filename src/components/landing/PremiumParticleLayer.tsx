import { useEffect, useMemo, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  drift: number;
  hue: "premium" | "metal";
  alpha: number;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function getCssHsl(varName: "--premium" | "--metal") {
  // Variables are stored as: "46 74% 54%" (space-separated HSL).
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || (varName === "--premium" ? "46 74% 54%" : "0 0% 78%");
}

function isProbablyLowEnd() {
  const nav = navigator as unknown as {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  // Conservative heuristics: used only to reduce particle density.
  const mem = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  return mem <= 4 || cores <= 4;
}

export function PremiumParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    active: false,
  });
  const scrollRef = useRef({ y: 0, ty: 0 });
  const lastTsRef = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);

  const settings = useMemo(() => {
    const mobile = window.matchMedia?.("(max-width: 640px)").matches ?? false;
    const lowEnd = isProbablyLowEnd();

    // Density tuned to be nearly imperceptible; scaled by viewport area.
    const density = mobile ? 0.000028 : 0.00004; // particles per px
    const max = mobile ? 56 : 120;
    const min = mobile ? 18 : 36;

    return {
      mobile,
      lowEnd,
      density,
      min,
      max,

      // Interactions: subtle and cinematic
      pointerRadius: mobile ? 0 : 110,
      pointerForce: mobile ? 0 : 0.0026,
      scrollParallaxMax: 12,
    };
  }, []);

  useEffect(() => {
    // Avoid running during SSR (not applicable here) + honor reduced motion.
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const premium = getCssHsl("--premium");
    const metal = getCssHsl("--metal");

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const w = Math.max(1, Math.floor(window.innerWidth));
      const h = Math.max(1, Math.floor(window.innerHeight));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const rawCount = Math.round(area * settings.density);
      const baseCount = clamp(rawCount, settings.min, settings.max);
      const count = settings.lowEnd ? Math.max(settings.min, Math.floor(baseCount * 0.7)) : baseCount;

      // Rebuild particles on resize for stable distribution.
      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const isGold = i % 5 !== 0; // mostly premium
        const r = lerp(0.55, 1.25, Math.random());
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx: lerp(-0.018, 0.018, Math.random()),
          vy: lerp(-0.012, 0.012, Math.random()),
          drift: lerp(0.0008, 0.0024, Math.random()),
          hue: isGold ? "premium" : "metal",
          alpha: isGold ? lerp(0.14, 0.22, Math.random()) : lerp(0.08, 0.14, Math.random()),
        });
      }
      particlesRef.current = next;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (settings.mobile) return;
      pointerRef.current.active = true;
      pointerRef.current.tx = e.clientX;
      pointerRef.current.ty = e.clientY;
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };
    const onScroll = () => {
      // Subtle vertical depth shift, capped.
      scrollRef.current.ty = window.scrollY;
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      } else {
        lastTsRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Cinematic easing: ~200–400ms response
    const easeTo = (cur: number, target: number, dt: number, ms = 260) => {
      const t = 1 - Math.exp(-dt / ms);
      return lerp(cur, target, t);
    };

    const tick = (ts: number) => {
      rafRef.current = requestAnimationFrame(tick);

      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);

      const last = lastTsRef.current || ts;
      const dt = clamp(ts - last, 8, 40);
      lastTsRef.current = ts;

      // Ease pointer + scroll targets
      pointerRef.current.x = easeTo(pointerRef.current.x, pointerRef.current.tx, dt, 220);
      pointerRef.current.y = easeTo(pointerRef.current.y, pointerRef.current.ty, dt, 220);
      scrollRef.current.y = easeTo(scrollRef.current.y, scrollRef.current.ty, dt, 320);

      const scrollOffset = clamp(scrollRef.current.y * 0.015, -settings.scrollParallaxMax, settings.scrollParallaxMax);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const pr = pointerRef.current;
      const hasPointer = pr.active && settings.pointerRadius > 0;
      const radius = settings.pointerRadius;
      const force = settings.pointerForce;

      for (const p of particlesRef.current) {
        // Gentle drift: very small, no sudden direction changes
        const ax = (Math.random() - 0.5) * p.drift;
        const ay = (Math.random() - 0.5) * p.drift;
        p.vx = clamp(p.vx + ax, -0.035, 0.035);
        p.vy = clamp(p.vy + ay, -0.03, 0.03);

        // Cursor interaction (subtle repulsion)
        if (hasPointer) {
          const dx = p.x - pr.x;
          const dy = (p.y - pr.y);
          const d2 = dx * dx + dy * dy;
          const r2 = radius * radius;
          if (d2 > 1 && d2 < r2) {
            const d = Math.sqrt(d2);
            const t = 1 - d / radius;
            const k = force * t;
            p.vx += (dx / d) * k;
            p.vy += (dy / d) * k;
          }
        }

        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const y = p.y + scrollOffset;
        if (y < -20 || y > h + 20) continue;

        // Soft dot/orb: no glow, no hard edges
        const hsl = p.hue === "premium" ? premium : metal;
        ctx.fillStyle = `hsl(${hsl} / ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Keep it behind all UI layers; never block clicks.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ contain: "layout paint size", willChange: "transform" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
