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
      {isRecommended ? (
        <div className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2">
           <div className="whitespace-nowrap rounded-full border border-primary/55 bg-primary px-3 py-1 text-[10px] font-extrabold leading-none tracking-[0.16em] text-primary-foreground shadow-[var(--shadow-lux)] sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            RECOMMENDED PATH
          </div>
        </div>
      ) : null}

      <Card
        className={cn(
          "lux-card lux-card-hover relative overflow-hidden rounded-[2rem] border bg-card/20 backdrop-blur-xl",
          // Thicker, more "frame-like" border as in reference
          isRecommended
            ? "border-primary/75 bg-primary/5 shadow-[0_28px_90px_-44px_hsl(var(--primary)/0.70)]"
            : "border-metal/25",
          // Soft inner stroke
          isRecommended
            ? "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-primary/30"
            : "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-foreground/10",
          // Subtle highlight wash
          isRecommended
            ? "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/30 before:via-primary/14 before:to-transparent before:opacity-100"
            : "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-secondary/55 before:via-secondary/25 before:to-transparent before:opacity-100",
          className,
        )}
      >
        {/* Background icon (subtle) */}
        {icon ? (
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
        ) : null}

        <CardHeader className="relative z-20 pb-3">
          <div className="flex items-center gap-5">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-2 text-xs font-extrabold tracking-[0.18em]",
                isRecommended
                  ? "border-primary/45 bg-primary/10 text-primary"
                  : "border-border bg-secondary/35 text-muted-foreground",
              )}
            >
              OPTION {option}
            </span>
            <span
              className={cn(
                "h-px flex-1",
                isRecommended ? "bg-primary/30" : "bg-border",
              )}
            />
          </div>
        </CardHeader>

        <CardContent className="relative z-20 pt-2">{children}</CardContent>
      </Card>
    </div>
  );
}
