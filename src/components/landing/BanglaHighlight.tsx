import * as React from "react";

type BanglaHighlightProps = {
  /** Wrap gold-highlight phrases with <BanglaHighlight>phrase</BanglaHighlight> */
  children: React.ReactNode;
  className?: string;
};

export function BanglaHighlight({ children, className }: BanglaHighlightProps) {
  return (
    <span
      className={
        "lux-gold lux-highlight font-semibold tracking-tight [text-shadow:0_0_18px_hsl(var(--premium)/0.15)] " +
        (className ?? "")
      }
    >
      {children}
    </span>
  );
}
