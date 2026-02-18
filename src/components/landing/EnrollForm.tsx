import { Card } from "@/components/ui/card";

export function EnrollForm() {
  return (
    <Card className="lux-card border-primary/25 relative overflow-hidden">
      
      {/* Optional subtle glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Empty space for WP overlay */}
      <div className="p-6 min-h-[420px] sm:min-h-[460px]" />

    </Card>
  );
}
 