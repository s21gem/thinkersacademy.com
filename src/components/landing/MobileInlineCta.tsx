import { Button } from "@/components/ui/button";
type MobileInlineCtaProps = {
  id?: string;
  onClick: () => void;
  title?: string;
  label: string;
};

// Mobile-only inline CTA (lighter than sticky CTA)
export function MobileInlineCta({
  id,
  onClick,
  title = "একটা সিদ্ধান্ত",
  label
}: MobileInlineCtaProps) {
  return <section id={id} className="sm:hidden">
      <div className="lux-container">
        <div className="lux-card border-primary/20 bg-secondary/25 p-4 my-0 py-[23px]">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-[0.01em]">{title}</p>
              <p className="mt-1 whitespace-normal text-xs leading-snug text-muted-foreground my-0">
                এখনই এনরোল করে আপনার ফোকাস লক করুন।
              </p>
            </div>
            <Button
              variant="cta"
              size="sm"
              className="h-10 shrink-0 rounded-xl px-4 shadow-none hover:shadow-[var(--shadow-cta)]"
              onClick={onClick}
            >
              {label}
            </Button>
          </div>
        </div>
      </div>
    </section>;
}