import { Button } from "@/components/ui/button";
type DesktopInlineCtaProps = {
  id?: string;
  onClick: () => void;
  title?: string;
  label?: string;
};

// Desktop/tablet inline CTA (keeps mobile CTA untouched)
export function DesktopInlineCta({
  id,
  onClick,
  title = "আপনি প্রস্তুত?",
  label = "এখনই এনরোল করুন"
}: DesktopInlineCtaProps) {
  return <section id={id} className="hidden sm:block">
      <div className="lux-container">
        <div className="lux-card border-primary/20 bg-secondary/25 p-6 py-[23px] my-0 mb-[35px] mt-0">
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-[0.01em]">{title}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                এখনই এনরোল করে আপনার ফোকাস লক করুন।
              </p>
            </div>

            <Button variant="cta" size="lg" className="h-12 shrink-0 rounded-xl px-7 shadow-none hover:shadow-[var(--shadow-cta)]" onClick={onClick}>
              {label}
            </Button>
          </div>
        </div>
      </div>
    </section>;
}