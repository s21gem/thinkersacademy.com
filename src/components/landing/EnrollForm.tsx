import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const enrollSchema = z.object({
  name: z.string().trim().min(2, "নাম লিখুন").max(100, "নাম খুব বড়"),
  phone: z
    .string()
    .trim()
    .min(10, "সঠিক মোবাইল নাম্বার দিন")
    .max(20, "সঠিক মোবাইল নাম্বার দিন")
    .regex(/^[0-9+\-\s()]+$/, "সঠিক মোবাইল নাম্বার দিন"),
  email: z.string().trim().email("সঠিক ইমেইল দিন").max(255, "সঠিক ইমেইল দিন"),
});

type EnrollValues = z.infer<typeof enrollSchema>;

export function EnrollForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnrollValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const [successName, setSuccessName] = useState<string | null>(null);

  const onSubmit = async (values: EnrollValues) => {
    // Frontend-only MVP: show premium confirmation.
    // (Hook this up to Cloud later for real enrollment + payment.)
    setSuccessName(values.name);
    reset();
  };

  const FloatingField = ({
    id,
    label,
    type,
    inputMode,
    autoComplete,
    placeholder,
    error,
    registerKey,
  }: {
    id: string;
    label: string;
    type?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    placeholder?: string;
    error?: string;
    registerKey: keyof EnrollValues;
  }) => {
    const field = register(registerKey);
    return (
      <div className="grid gap-2">
        <div className="relative">
          <Input
            id={id}
            type={type}
            inputMode={inputMode}
            autoComplete={autoComplete}
            placeholder={placeholder ?? " "}
            className={
              "peer h-12 rounded-lg bg-card/40 px-3 pt-5 text-sm transition-[box-shadow,transform,opacity] duration-200 ease-out" +
              (error ? " border-cta/50 focus-visible:ring-1 focus-visible:ring-ring" : "")
            }
            {...field}
            onChange={(e) => {
              setSuccessName(null);
              field.onChange(e);
            }}
          />
          <label
            htmlFor={id}
            className="pointer-events-none absolute left-3 top-3.5 origin-left text-sm text-muted-foreground transition-[transform,opacity] duration-200 ease-out peer-placeholder-shown:translateY-[0.55rem] peer-placeholder-shown:scale-100 peer-focus:-translate-y-1 peer-focus:scale-[0.86] peer-[:not(:placeholder-shown)]:-translate-y-1 peer-[:not(:placeholder-shown)]:scale-[0.86]"
          >
            {label}
          </label>
        </div>
        {error && <p className="text-xs text-cta/85">{error}</p>}
      </div>
    );
  };

  return (
    <Card className="lux-card border-primary/25">
      {/* Keep the glassy card exactly as-is, but render an empty surface inside */}
      <div className="p-6 min-h-[420px] sm:min-h-[460px]" aria-hidden="true" />
    </Card>
  );
}
