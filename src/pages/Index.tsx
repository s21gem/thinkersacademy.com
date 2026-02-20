import { BanglaHighlight } from "@/components/landing/BanglaHighlight";
import { AbstractPatternLayer } from "@/components/landing/AbstractPatternLayer";
import { EnrollForm } from "@/components/landing/EnrollForm";
import { DesktopInlineCta } from "@/components/landing/DesktopInlineCta";
import { MobileInlineCta } from "@/components/landing/MobileInlineCta";
import { PremiumParticleLayer } from "@/components/landing/PremiumParticleLayer";
import { StickyCtaBar } from "@/components/landing/StickyCtaBar";
import { OptionCard } from "@/components/landing/OptionCard";
import { ScheduleInfoCard } from "@/components/landing/ScheduleInfoCard";
import { RevealOnce } from "@/components/motion/RevealOnce";
import offerImage from "@/assets/thinkers-academy-offer.jpeg";
import headingImage from "@/assets/high-value-profit-secret-heading.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileStickyCta } from "@/hooks/use-mobile-sticky-cta";
import { AlarmClock, ArrowDown, ArrowDownRight, CalendarDays, CheckCircle2, Flame, Gem, Laptop, ShieldCheck, Timer, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
const Index = () => {
  const enrollId = "enroll";
  const heroRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const priceText = useMemo(() => "মাত্র ১৯০ টাকায়", []);
  const scrollToEnroll = () => {
    document.getElementById(enrollId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  const scrollToCheckout = () => {
  document.body.classList.add("page-exit");

  setTimeout(() => {
    window.location.href = "https://thinkersacademybd.com/step/msvp/";
  }, 280);
};

  const {
    visible: stickyVisible,
    minimized: stickyMinimized,
    label: stickyLabel,
    markInteracted
  } = useMobileStickyCta({
    enabled: isMobile,
    heroId: "hero",
    pricingId: "pricing",
    enrollId,
    inlineCtaIds: ["inline-cta-problem", "inline-cta-decision", "inline-cta-pricing"],
    copyDefault: "এনরোল করুন — মাত্র ১৯০ টাকা",
    copyAlt: "সিট সীমিত — এখনই এনরোল করুন",
    copyAltDelayMs: 7000
  });
  const onMobileCtaClick = () => {
    markInteracted();
    scrollToCheckout();
  };
  useEffect(() => {
    document.title = "HIGH VALUE PROFIT SECRET";
    const el = heroRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 100;
      const y = (e.clientY - r.top) / r.height * 100;
      el.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
      el.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="min-h-screen bg-background text-foreground">
      <AbstractPatternLayer />
      <PremiumParticleLayer />
      <div className="relative z-10">
        <StickyCtaBar onEnrollClick={onMobileCtaClick} label={stickyLabel} visible={stickyVisible} minimized={stickyMinimized} />

        {/* HERO */}
        <header
          id="hero"
          ref={(n) => (heroRef.current = n)}
          className="hero-surface hero-spotlight relative overflow-visible min-h-screen"
        >
          {/* Glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl sm:h-[720px] sm:w-[720px]" />
            <div className="absolute -bottom-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl sm:h-[720px] sm:w-[720px]" />
          </div>

          <div className="lux-container relative z-10 pt-20 pb-14 sm:pt-28 sm:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2 hero-pop-anim">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[1rem] font-semibold">
                  <Gem className="h-4 w-4" /> ২ দিনের লাইভ কোর্স
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-metal/35 bg-secondary/40 px-3 py-1 text-[1rem] font-semibold text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" /> সীমিত আসন
                </span>
              </div>

              {/* Image heading */}
              <div className="hero-pop-anim mb-6 flex justify-center">
                <img
                  src={headingImage}
                  alt="High Value Profit Secret"
                  className="h-auto w-[350px] sm:w-[600px]"
                />
              </div>

              {/* MAIN HERO TEXT */}
              <h1
                className="
                  lux-h2 text-balance font-hero font-semibold
                  tracking-[0.015em] leading-[1.25]
                  text-4xl sm:text-6xl lg:text-[4rem]
                "
              >
                <span
                  className="
                    hero-line-anim-1 block lg:pt-2 sm:pt-1 lg:pb-1 italic font-bold
                    bg-gradient-to-r from-primary to-primary
                    bg-clip-text text-transparent
                    text-[1.9rem] sm:text-[2.5rem] lg:text-[3.9rem]
                  "
                >
                  হাই-ভ্যালু প্রোডাক্টের গেম শিখুন
                </span>

                <span
                  className="
                    hero-line-anim-2 block lg:pt-1 my-3 sm:my-4 font-bold
                    bg-gradient-to-r from-white via-gray-350 to-gray-500
                    bg-clip-text text-transparent
                    text-[1.5rem] sm:text-[2.9rem] lg:text-[3rem]
                  "
                >
                  তখন টাকা আপনার জন্য কাজ করবে,
                </span>

                <span
                  className="
                    hero-line-anim-3 block lg:pt-1.5 font-bold
                    bg-gradient-to-r from-white via-gray-350 to-gray-500
                    bg-clip-text text-transparent
                    text-[1.5rem] sm:text-[2.9rem] lg:text-[3rem]
                  "
                >
                  আপনি টাকার জন্য না।
                </span>
              </h1>

              {/* Sub headline */}
              <p
                className="
                  lux-sub hero-sub-anim mt-6
                  text-balance leading-[1.6]
                  text-[0.95rem] sm:text-[1.3rem]
                  text-muted-foreground
                "
              >
                বিজনেসে আপনার প্রোডাক্ট কী সেটা বড় বিষয় না।
                <br />
                আপনি প্রোডাক্টটাকে মানুষের সামনে কীভাবে প্রেজেন্ট ও মার্কেটিং করছেন সেটাই আসল বিষয়।
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col items-center gap-4 hero-pop-anim">
                <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card/30 backdrop-blur">
                  <img src={offerImage} alt="Offer" className="w-full" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <ArrowDown className="h-8 w-8 text-primary/90 animate-bounce" />
                  <Button
                    variant="cta"
                    size="lg"
                    className="h-11 lg:h-12 rounded-xl px-7 font-buttonal lg:text-[1.3rem] text-[1rem]"
                    onClick={scrollToCheckout}
                  >
                    এখনই এনরোল করুন
                  </Button>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/10 px-5 py-3">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-sheen" />
                  </div>
                  <div className="relative text-center">
                    <div className="text-xs text-muted-foreground">Limited Time Offer</div>
                    <div className="text-lg font-extrabold">
                      <span className="lux-gold lux-number">{priceText}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[1.2rem] lg:text-[1.3rem] text-muted-foreground">সীমিত আসন</p>
              </div>

              <div className="mt-12">
                <div className="lux-divider" />
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* 2) PROBLEM AWARENESS / MINDSET SHIFT */}
          <section className="lux-section">
            <div className="lux-container">
              <RevealOnce as="div" className="mx-auto max-w-3xl" variant="up">
                <p className="lux-body text-xl sm:text-2xl">
                  সব ধনী মানুষরা একটা <BanglaHighlight>সিক্রেট</BanglaHighlight> জানে—
                  <br />
                  ধনী হওয়া মানে শুধু <BanglaHighlight>ইনকাম</BanglaHighlight> না,
                  <br />
                  বরং ইনকাম থেকে এমন একটা <BanglaHighlight>সিস্টেম</BanglaHighlight> বানানো
                  <br />
                  <BanglaHighlight>যেখানে টাকা আবার নতুন টাকার জন্ম দেয়।</BanglaHighlight>
                </p>
                <p className="lux-body mt-6 text-lg text-muted-foreground sm:text-xl">
                  আমরা প্রতিদিন অক্লান্ত পরিশ্রম করছি…
                  <br />
                  অথচ আমাদের টাকা বসে বসে ঘুমাচ্ছে।
                  <br />
                  কি অদ্ভুত, তাই না?
                </p>
              </RevealOnce>
            </div>
          </section>

          {/* HERO MEDIA (Video) */}
          <section className="lux-section pt-0">
            <div className="lux-container">
              <div className="-mx-4 sm:mx-auto sm:max-w-4xl">
                <RevealOnce as="div" variant="scale">
                  <Card className="lux-card border-primary/20">
                    <CardContent className="p-2 sm:p-4">
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          className="h-full w-full rounded-lg sm:rounded-xl"
                          src="https://www.youtube-nocookie.com/embed/j_QFj5W6xlw?rel=0&modestbranding=1&playsinline=1"
                          title="Course video"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </RevealOnce>
              </div>
            </div>
          </section>

          <MobileInlineCta id="inline-cta-problem" onClick={onMobileCtaClick} label="এনরোল — ১৯০ টাকা" title="আপনি প্রস্তুত?" />
          <DesktopInlineCta id="inline-cta-problem-desktop" onClick={scrollToCheckout} label="এখনই এনরোল করুন" title="আপনি প্রস্তুত?" />

          {/* 3) BODY vs MONEY COMPARISON */}
          <section className="lux-section pt-0">
            <div className="lux-container">
              <div className="grid gap-5 sm:grid-cols-2">
                <RevealOnce as="div" variant="scale">
                  <Card className="lux-card lux-card-hover border-metal/20">
                    <CardHeader>
                      <CardTitle className="lux-h2 sm:text-2xl tracking-[0.01em]">শরীর দিয়ে আয় করলে —</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      <ul className="grid sm:text-xl gap-3">
                        <li>শরীর যতটুকু পারে, ততটুকুই আয়</li>
                        <li>যত বেশি ঘাম, তত বেশি ক্লান্তি</li>
                        <li>শরীর একদিন ভেঙে পড়বে</li>
                        <li>আয়ও থেমে যাবে</li>
                      </ul>
                    </CardContent>
                  </Card>
                </RevealOnce>

                <RevealOnce as="div" variant="scale">
                  <Card className="lux-card lux-card-hover border-primary/25">
                    <CardHeader>
                      <CardTitle className="lux-h2 sm:text-2xl tracking-[0.01em]">টাকা দিয়ে আয় করলে —</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      <ul className="grid gap-3 sm:text-xl">
                        <li>টাকা ক্লান্ত হয় না</li>
                        <li>টাকা ছুটি নেয় না</li>
                        <li>টাকা ঘুমায় না</li>
                        <li>টাকা বুড়ো হয় না</li>
                      </ul>
                    </CardContent>
                  </Card>
                </RevealOnce>
              </div>

              <RevealOnce as="div" className="mt-7 text-center text-lg font-extrabold sm:text-xl" variant="fade">
                <span className="lux-gold lux-highlight sm:text-2xl">টাকা থামে না।</span>
              </RevealOnce>
            </div>
          </section>

          {/* 4) HIGH-VALUE PRODUCT CONCEPT */}
          <section className="lux-section">
            <div className="lux-container">
              <RevealOnce as="div" className="mx-auto max-w-3xl text-center" variant="up">
                <p className="lux-body text-lg sm:text-2xl">
                  আপনি যদি টাকাকে কর্মীর মতো ব্যবহার করতে চান এবং  
                  <br />
                  অল্প সময়ে বেশি টাকা ইনকাম করতে চান,
                  <br />
                  তাহলে আপনাকে খেলতে হবে
                  <br />
                  <BanglaHighlight>হাই-ভ্যালু প্রোডাক্টের গেম</BanglaHighlight>।
                </p>
                <p className="lux-body mt-6 text-base text-muted-foreground sm:text-xl">
                  কারণ হাই-ভ্যালু প্রোডাক্ট মানে—
                  <br />
                  <span className="lux-gold font-bold">অল্প বিক্রিতেই বড় প্রফিট।</span>
                </p>
              </RevealOnce>
            </div>
          </section>

          {/* 5) COURSE INTRO (Offer Reveal) */}
          <section className="lux-section pt-0">
            <div className="lux-container">
              <RevealOnce as="div" variant="scale">
                <Card className="lux-card border-primary/25">
                  <CardContent className="p-6 sm:p-10">
                    <div className="mx-auto max-w-3xl text-center">
                      <div className="text-2xl font-extrabold sm:text-3xl">
                        <span className="lux-gold lux-number lux-highlight">মাত্র ১৯০ টাকায়</span>
                      </div>
                      <p className="mt-2 sm:text-lg text-muted-foreground">এই ২ দিনের লাইভ কোর্সে আমরা শিখবো—</p>

                      <ul className="mx-auto mt-6 grid max-w-xl gap-3 text-left text-muted-foreground">
                        <li className="flex gap-3 sm:text-lg">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 lux-gold" />
                          কীভাবে হাই-ভ্যালু প্রোডাক্টের বিজনেস দাঁড় করাতে হয়
                        </li>
                        <li className="flex gap-3 sm:text-lg">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 lux-gold" />
                          কীভাবে টাকাকে কর্মী হিসেবে কাজ করাতে হয়
                        </li>
                      </ul>

                      <p className="mt-6 text-lg font-normal">
                        এটা খরচ না — এটা <span className="lux-gold">ইনভেস্ট</span>।
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </RevealOnce>
            </div>
          </section>

          {/* 6) AUTHORITY & CURIOSITY */}
          <section className="lux-section">
            <div className="lux-container">
              <RevealOnce as="div" className="mx-auto max-w-3xl" variant="up">
                <p className="lux-body text-lg sm:text-2xl">
                  বাংলাদেশের সবচেয়ে বড় বড় প্রতিষ্ঠানগুলোর
                  <br />
                  ফাউন্ডারদের ব্যাকগ্রাউন্ড দেখুন—
                </p>
                <p className="lux-body mt-4 text-base text-muted-foreground sm:text-xl">
                  তারা সবাই ধনী পরিবার থেকে আসেনি,
                  <br />
                  শুরুতে তাদের কাছে অনেক টাকা ছিল না।
                </p>
                <p className="mt-6 text-lg font-normal sm:text-2xl">
                  তাহলে রহস্যটা কোথায়?
                  <br />
                  রহস্যটা আছে <span className="lux-gold">সিস্টেম + স্কিলে</span>।
                </p>
              </RevealOnce>
            </div>
          </section>

          {/* 7) DECISION SECTION (Option Cards) */}
          <section className="lux-section pt-0">
            <div className="lux-container">
              <RevealOnce as="div" className="mx-auto mb-6 max-w-3xl text-center" variant="fade">
                 <div className="space-y-3">
                   <p className="lux-h2 text-balance text-3xl font-extrabold italic leading-[1.05] sm:text-5xl">
                     আপনার সামনে এখন <span className="lux-gold lux-number">২টি</span> অপশন আছে…
                   </p>
                   <p className="lux-body text-base lux-gold lux-highlight sm:text-2xl">কোনটি বেছে নিবেন?</p>

                 </div>
              </RevealOnce>

              <div className="grid gap-5 sm:grid-cols-2">
                <RevealOnce as="div" variant="scale">
                  <OptionCard
                    option="01"
                    icon={<ArrowDownRight className="h-14 w-14" />}
                    className="border border-foreground/25 hover:border-foreground/40 transition-colors"
                  >
                      <ul className="space-y-3 text-2xl font-semibold italic leading-[1.15] text-foreground/80 sm:text-3xl">
                        <li>অজ্ঞতার ঋণ পরিশোধ করা</li>
                        <li className="text-base font-medium not-italic text-muted-foreground sm:text-lg">
                          No Learning, No Growth.
                        </li>
                      </ul>
                  </OptionCard>
                </RevealOnce>
                <RevealOnce as="div" variant="scale">
                  <OptionCard
                    option="02"
                    variant="recommended"
                    icon={<TrendingUp className="h-14 w-14" />}
                  >
                      <ul className="space-y-3 text-2xl font-semibold italic leading-[1.15] text-foreground/85 sm:text-3xl">
                        <li>
                          <span className="block">টাকাকে কাজ দিন,</span>
                          <span className="block">নিজে স্বাধীন থাকুন।</span>
                        </li>
                        <li className="text-base font-medium not-italic text-muted-foreground sm:text-lg">
                          Build Skill. See Magic
                        </li>
                      </ul>

                      <Button variant="cta" size="lg" className="mt-5 w-full rounded-xl sm:text-lg font-buttonal" onClick={scrollToCheckout}>
                        এনরোল করুন — মাত্র ১৯০ টাকা
                      </Button>
                  </OptionCard>
                </RevealOnce>
              </div>
            </div>
          </section>

          <MobileInlineCta id="inline-cta-decision" onClick={onMobileCtaClick} label="এনরোল — ১৯০ টাকা" title="এটাই আপনার টার্ন" />

          {/* 8) PAIN POINT CHECKLIST */}
          <section className="lux-section">
            <div className="lux-container">
              <RevealOnce as="div" className="mx-auto max-w-3xl" variant="up">
                <h2 className="lux-h2 text-2xl font-extrabold sm:text-3xl">আপনার কি এগুলো হচ্ছে?</h2>
                <div className="mt-6 grid gap-3 sm:text-lg text-muted-foreground">
                  {["আমার কাছে পুঁজি নেই", "বিজনেস শুরু করতে অনেক টাকা লাগে", "প্রোডাক্ট আছে কিন্তু সেল হচ্ছে না", "টাকা ইনকাম হয়, কিন্তু টাকা আমার জন্য কাজ করে না"].map(t => <div key={t} className="lux-card-hover flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 lux-gold" />
                      <p>{t}</p>
                    </div>)}
                </div>
                <p className="mt-6 sm:text-xl font-extrabold">
                  <span className="lux-gold">এক কাপ কফির দামে সমাধান নিন।</span>
                </p>
              </RevealOnce>
            </div>
          </section>

          {/* 9) COURSE CURRICULUM */}
          <section className="lux-section pt-0">
            <div className="lux-container">
              <div className="mx-auto max-w-4xl">
                <RevealOnce as="div" variant="fade">
                  <h2 className="lux-h2 text-2xl font-semibold sm:text-3xl">কোর্স কারিকুলাম</h2>
                </RevealOnce>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <RevealOnce as="div" variant="scale">
                    <Card className="lux-card lux-card-hover border-primary/25">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                          <Flame className="h-5 w-5 lux-gold" /> Day 01 🔥
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        <p className="font-normal text-foreground sm:text-xl">How to Build High Value Product Business</p>
                        <p className="mt-2 sm:text-lg">কম পুঁজিতে হাই-ভ্যালু Business তৈরির কৌশল</p>
                      </CardContent>
                    </Card>
                  </RevealOnce>
                  <RevealOnce as="div" variant="scale">
                    <Card className="lux-card lux-card-hover border-metal/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                          <Timer className="h-5 w-5 lux-gold" /> Day 02 💰
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        <p className="font-normal text-foreground sm:text-xl">Money Make More Money</p>
                        <p className="mt-2 sm:text-lg">টাকা দিয়ে টাকা ইনকাম করার সিক্রেট সূত্র</p>
                      </CardContent>
                    </Card>
                  </RevealOnce>
                </div>
              </div>
            </div>
          </section>

          {/* 10) WHAT YOU’LL GET (Value Stack) */}
          <section className="lux-section">
            <div className="lux-container">
              <div className="mx-auto max-w-4xl">
                <RevealOnce as="div" variant="fade">
                  <h2 className="lux-h2 text-2xl font-extrabold sm:text-3xl">আপনি যা পাবেন</h2>
                </RevealOnce>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:text-xl">
                  {["২ দিনের লাইভ কোর্স", "বাস্তব উদাহরণ ও প্র্যাকটিক্যাল টিপস", "সম্পূর্ণ Action-Ready Blueprint", "৫০০ টাকার কুপন", "সমমনা বিজনেসম্যান কমিউনিটি এক্সেস"].map(v => <RevealOnce as="div" key={v} variant="scale">
                      <div className="lux-card lux-card-hover border-border bg-card/60 p-5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 lux-gold" />
                          <div>
                            <p className="font-normal">{v}</p>
                            <p className="mt-1 text-sm text-muted-foreground sm:text-lg">
                              কনভার্সন-ফোকাসড শেখানো হবে।
                            </p>
                          </div>
                        </div>
                      </div>
                    </RevealOnce>)}
                </div>
              </div>
            </div>
          </section>

          {/* 11) TIME & SCHEDULE */}
          <section className="lux-section pt-0 relative">
  {/* Soft glow background */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-2xl" />

            <div className="lux-container">
              <RevealOnce as="div" variant="scale">
                <Card className="lux-card border-primary/25">
                  <CardContent className="p-6 sm:p-10">
                    <div className="mx-auto max-w-3xl text-center">
                      <h2 className="lux-h2 text-2xl font-semibold sm:text-3xl tracking-[0.02em]">সময় ও শিডিউল</h2>

                      <div className="mt-7 grid gap-4 sm:grid-cols-3">
                        <ScheduleInfoCard
                          icon={<CalendarDays className="h-6 w-6" />}
                          title="SAVE THE DATE"
                          value="5 February, 2026"
                        />
                        <ScheduleInfoCard
                          icon={<AlarmClock className="h-6 w-6" />}
                          title="BANGLADESH TIME"
                          value="8:30 – 11:00 PM"
                        />
                        <ScheduleInfoCard
                          icon={<Laptop className="h-6 w-6" />}
                          title="PLATFORM"
                          value="Zoom Live"
                          subtitle="DIGITAL ACCESS"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </RevealOnce>
            </div>
          </section>

          {/* 12) PRICING & OFFER */}
          <section id="pricing" className="lux-section">
            <div className="lux-container">
              <div className="mx-auto max-w-4xl">
                <div className="text-center">
                  <RevealOnce as="div" variant="fade">
                    <h2 className="lux-h2 text-2xl font-extrabold sm:text-3xl">প্রাইসিং</h2>
                    <p className="mt-2 text-muted-foreground">সীমিত সময়ের অফার—শেষ হলেই Regular Price ফিরে যাবে।</p>
                  </RevealOnce>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-5">
                  <RevealOnce as="div" className="sm:col-span-2" variant="scale">
                    <Card className="lux-card lux-card-hover border-border">
                      <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground">Regular Price</div>
                        <div className="mt-2 text-3xl font-extrabold line-through text-muted-foreground">
                          <span className="lux-number">৩,৫০০</span> টাকা
                        </div>
                      </CardContent>
                    </Card>
                  </RevealOnce>
                  <RevealOnce as="div" className="sm:col-span-3" variant="scale">
                    <Card className="lux-card border-primary/30">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-sm text-muted-foreground sm:animate-none animate-pulse-soft">
                              Limited Time Offer
                            </div>
                            <div className="mt-2 text-4xl font-extrabold">
                              <span className="lux-gold lux-number">১৯০</span> টাকা
                            </div>
                          </div>
                          <Button variant="cta" size="lg" className="h-12 rounded-xl px-8 font-buttonal" onClick={scrollToCheckout}>
                            এখনই এনরোল করুন
                          </Button>
                        </div>
                        <Separator className="my-5 bg-border" />
                        <p className="text-base font-buttonal">
                          “১৯০ টাকাটা খরচ নয় — এটা আপনার বিজনেসের প্রথম <span className="lux-gold">ইনভেস্ট</span>।”
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Seats are LIMITED — Offer শেষ হলে ফিরবে Regular Price
                        </p>
                      </CardContent>
                    </Card>
                  </RevealOnce>
                </div>
              </div>
            </div>
          </section>

          <MobileInlineCta id="inline-cta-pricing" onClick={onMobileCtaClick} label="এখনই এনরোল করুন" title="সিদ্ধান্তটা লক করুন" />

          {/* 13) FINAL PHILOSOPHY CLOSE */}
          <section className="lux-section pt-0">
            <div className="lux-container">
              <RevealOnce as="div" className="mx-auto max-w-3xl" variant="up">
                <p className="lux-body text-lg sm:text-2xl my-[26px]">
                  যারা শিখে নেয়, তারাই বিজয়ী হয়।
                  <br />
                  খেলা এখন পুঁজির না —
                  <br />
                  খেলা <span className="lux-gold font-extrabold">সিস্টেম + স্কিলের</span>।
                </p>
                <p className="lux-body mt-6 text-base text-muted-foreground sm:text-xl">
                  আপনার টাকাকে টাকা বানাতে দিন।
                  <br />
                  নিজেকে টাকা কামানোর মেশিন নয় —
                  <br />
                  সিস্টেমের প্লেয়ার বানান।
                </p>
              </RevealOnce>
            </div>
          </section>

{/* 14) DECISION / SUMMARY (Form Removed) */}
<section id={enrollId} className="lux-section pt-6 sm:pt-10">
  <div className="lux-container">
    <div className="mx-auto max-w-3xl text-center">
      
      <RevealOnce as="div" variant="up">
        <h2 className="lux-h2 text-2xl font-extrabold sm:text-3xl">
          এখনই সিদ্ধান্ত নিন
        </h2>

        <p className="lux-body mt-3 text-muted-foreground sm:text-xl">
          মাত্র <span className="lux-gold font-bold">১৯০ টাকায়</span> শুরু করুন।
          <br />
          ২ দিনে আপনার অফার / প্রেজেন্টেশন / মার্কেটিং গেম বদলে দিন।
        </p>
      </RevealOnce>

      <RevealOnce
        as="div"
        variant="scale"
        className="
          mt-8
          mx-auto
          max-w-xl
          rounded-2xl
          border border-primary/25
          bg-primary/10
          backdrop-blur-xl
          p-6
          text-left
          shadow-[0_18px_55px_-25px_rgba(255,215,0,0.25)]
        "
      >
        <div className="text-sm font-semibold tracking-wide text-foreground/90">
          Quick Summary
        </div>

        <ul className="mt-3 space-y-2 text-sm text-muted-foreground/85 leading-[1.7]">
          <li>• লাইভ + প্র্যাকটিক্যাল গাইড</li>
          <li>• Action-ready blueprint</li>
          <li>• Limited seats</li>
        </ul>
      </RevealOnce>

    </div>
  </div>
</section>
        </main>

        {/*<footer className="pb-24 sm:pb-10">
          <div className="lux-container">
            <div className="lux-divider" />
            <p className="mt-6 text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} — Thinkers Academy. All rights reserved.
            </p>
          </div>
        </footer>*/}
      </div>
    </div>;
};
export default Index;