import { Button } from "@/components/ui/button";

type StickyCtaBarProps = {
  onEnrollClick: () => void;
  label: string;
  visible: boolean;
  minimized: boolean;
};

export function StickyCtaBar({ onEnrollClick, label, visible, minimized }: StickyCtaBarProps) {
  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-50 sm:hidden transition-[transform,opacity] duration-200 ease-out will-change-transform " +
        (visible ? "opacity-100" : "pointer-events-none opacity-0")
      }
      style={{ transform: visible ? "translateY(0)" : "translateY(10px)" }}
      aria-hidden={!visible}
    >
      <div className="border-t border-primary/30 bg-background">
        <div
          className={
            "lux-container flex items-center gap-3 transition-transform duration-200 ease-out origin-bottom will-change-transform " +
            (minimized ? "scale-y-[0.92]" : "scale-y-100")
          }
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
        >
          <Button
            variant="cta"
            size="lg"
            className="ml-auto h-11 w-full rounded-xl px-5"
            onClick={onEnrollClick}
          >
            {label}
          </Button>
        </div>
      </div>
    </div>
  );
}
