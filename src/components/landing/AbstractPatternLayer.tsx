export function AbstractPatternLayer() {
  // Purely decorative background layer (pattern sits behind particles + all content).
  return (
    <div
      aria-hidden="true"
      className="lux-pattern-layer pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
