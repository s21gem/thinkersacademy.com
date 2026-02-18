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
        `
        rounded-2xl
        border border-primary/25
        bg-card/40
        px-6 py-7
        backdrop-blur-xl
        shadow-[0_20px_60px_-25px_rgba(255,215,0,0.18)]
        hover:shadow-[0_25px_70px_-25px_rgba(255,215,0,0.28)]
        transition-all duration-300
        `,
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-xs flex-col items-center text-center">
        
        {/* Icon container */}
        <div
          className="
            mb-4
            inline-flex h-12 w-12
            items-center justify-center
            rounded-2xl
            border border-primary/30
            bg-secondary/40
            text-primary
            shadow-[0_0_18px_rgba(255,215,0,0.25)]
          "
        >
          <span aria-hidden="true" className="drop-shadow-[0_0_6px_rgba(255,215,0,0.35)]">
            {icon}
          </span>
        </div>

        {/* Title */}
        <div className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground/80">
          {title}
        </div>

        {/* Value */}
        <div className="mt-2 text-[1.45rem] font-semibold tracking-tight sm:text-[1.7rem]">
          <span className="lux-number">{value}</span>
        </div>

        {/* Subtitle */}
        {subtitle ? (
          <div className="mt-2 text-[11px] tracking-wide text-muted-foreground/70">
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
}
