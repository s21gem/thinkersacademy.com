import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type OptionCardProps = {
  option: "01" | "02";
  variant?: "default" | "recommended";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function OptionCard({
  option,
  variant = "default",
  children,
  icon,
  className,
}: OptionCardProps) {
  const isRecommended = variant === "recommended";

  return (
    <div className="relative">
      {/* RECOMMENDED BADGE */}
      {isRecommended && (
        <div className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2">
          <div className="
            whitespace-nowrap rounded-full
            border-2 border-primary/70
            bg-primary px-3 py-1
            text-[10px] font-extrabold
            leading-none tracking-[0.16em]
            text-primary-foreground
            shadow-[var(--shadow-lux)]
            sm:px-4 sm:text-xs sm:tracking-[0.18em]
          ">
            RECOMMENDED PATH
          </div>
        </div>
      )}

      <Card
        className={cn(
          "lux-card lux-card-hover relative overflow-hidden rounded-[2rem] backdrop-blur-xl",
          // MAIN FRAME (border thickness + visibility)
          isRecommended
            ? "border-2 border-primary/70 bg-primary/5 shadow-[0_28px_90px_-44px_hsl(var(--primary)/0.70)]"
            : "border-2 border-foreground/30 bg-card/20",
          // INNER STROKE (glass frame)
          isRecommended
            ? "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-2 after:ring-primary/35"
            : "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-foreground/25",
          // SUBTLE LIGHT WASH
          isRecommended
            ? "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/30 before:via-primary/14 before:to-transparent before:opacity-100"
            : "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-secondary/50 before:via-secondary/25 before:to-transparent before:opacity-100",
          className,
        )}
      >
        {/* BACKGROUND ICON */}
        {icon && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-7 right-7 z-10 opacity-[0.12]",
              isRecommended && "opacity-[0.18]",
            )}
          >
            <div className={cn("text-foreground", isRecommended && "text-primary")}>
              {icon}
            </div>
          </div>
        )}

        {/* HEADER */}
        <CardHeader className="relative z-20 pb-3">
          <div className="flex items-center gap-5">
            {/* OPTION PILL */}
            <span
              className={cn(
                "inline-flex items-center rounded-full border-2 px-4 py-2 text-xs font-extrabold tracking-[0.18em]",
                isRecommended
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-foreground/60 bg-secondary/40 text-foreground/85",
              )}
            >
              OPTION {option}
            </span>

            {/* DIVIDER LINE */}
            <span
              className={cn(
                "h-[2px] flex-1",
                isRecommended ? "bg-primary/35" : "bg-foreground/45",
              )}
            />
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="relative z-20 pt-2">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
