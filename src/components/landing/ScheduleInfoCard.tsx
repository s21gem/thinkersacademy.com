import * as React from "react";

import { cn } from "@/lib/utils";

type ScheduleInfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  className?: string;
};

export function ScheduleInfoCard({
  icon,
  title,
  value,
  subtitle,
  className,
}: ScheduleInfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card/25 px-6 py-7 backdrop-blur-lg supports-[backdrop-filter]:bg-card/20",
        "shadow-[0_22px_70px_-55px_hsl(var(--foreground)/0.55)]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-xs flex-col items-center text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border/40 bg-secondary/35 text-primary">
          <span aria-hidden="true">{icon}</span>
        </div>

        <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
          {title}
        </div>

        <div className="mt-2 text-2xl font-extrabold tracking-[0.01em] sm:text-[1.7rem]">
          <span className="lux-number">{value}</span>
        </div>

        {subtitle ? (
          <div className="mt-2 text-xs text-muted-foreground">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}
