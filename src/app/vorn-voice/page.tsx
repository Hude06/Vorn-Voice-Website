import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { voiceFaqs, voiceHighlights, voiceUseCases } from "@/lib/site-content";
import {
  ArrowRight,
  CheckCircle2,
  Command,
  Download,
  Mic2,
  Sparkles,
} from "lucide-react";

const downloadUrl = "/download";

export const metadata: Metadata = {
  title: "Vorn Voice | Voice-First Software Work",
  description:
    "Vorn Voice is a local-first macOS dictation app with push-to-talk hotkeys, whisper models, and instant paste into the app you already use.",
};

export default function VornVoicePage() {
  return (
    <main className="mesh-background relative min-h-screen overflow-x-clip pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/12 via-primary/4 to-transparent" />
      <div className="pointer-events-none absolute right-[-5rem] top-32 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />

      <SiteHeader currentPath="/vorn-voice" />

      <section className="relative px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-6 rounded-[1.75rem] border border-border/90 bg-card/80 px-5 py-8 shadow-2xl shadow-black/35 backdrop-blur sm:px-8 sm:py-10 lg:rounded-[2rem] lg:px-10 lg:py-12">
            <Badge className="max-w-full rounded-full border-border/90 bg-background/75 text-foreground hover:bg-background/75">
              Shipping now on macOS
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-[clamp(2.6rem,9vw,4.4rem)] font-semibold leading-[1.02] tracking-tight xl:text-[4.5rem]">
                Speak ideas. Ship code.
                <span className="text-primary"> Keep your hands in flow.</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Vorn Voice turns speech into clean text with a push-to-talk hotkey, local
                whisper models, and instant paste into your current app.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 sm:w-auto"
              >
                <Link href={downloadUrl}>
                  <Download className="h-4 w-4" />
                  Download for macOS
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-border/90 bg-transparent px-7 text-base sm:w-auto"
              >
                <Link href="#examples">
                  See examples
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0 lg:rounded-[2rem]">
            <CardHeader className="border-b border-border/80 py-6">
              <CardTitle className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Typical workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 py-6 text-sm">
              <div className="rounded-2xl border border-border/90 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Step 1
                </p>
                <p className="mt-1">Hold your shortcut: Shift + Command + R</p>
              </div>
              <div className="rounded-2xl border border-border/90 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Step 2
                </p>
                <p className="mt-1">Speak naturally for PR comments, docs, and updates</p>
              </div>
              <div className="rounded-2xl border border-border/90 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Step 3
                </p>
                <p className="mt-1">Release and let Vorn Voice transcribe + paste instantly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="py-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Custom hotkeys
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">Pick the shortcut that fits your flow</p>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="py-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Works where you work
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">Dictate into editors, docs, chat, and issue trackers</p>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="py-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Local-first transcription
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">Fast on-device speech-to-text without breaking focus</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for daily engineering flow
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {voiceHighlights.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
                <CardHeader className="py-6">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-4 w-4 text-primary" />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm leading-6 text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" id="examples">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How it feels in practice
            </h2>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {voiceUseCases.map((item) => (
              <Card key={item.title} className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
                <CardHeader className="py-6">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <pre className="overflow-x-auto rounded-xl border border-border/90 bg-background/75 p-3 font-mono text-[11px] leading-6 text-muted-foreground sm:p-4 sm:text-xs">
                    <code>{item.snippet}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-6 xl:grid-cols-[1fr_1.05fr] xl:items-start">
          <Card className="glass-panel rounded-[1.75rem] border-primary/35 bg-[#151515] py-0">
            <CardHeader className="py-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <Mic2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Shipping now
                  </p>
                  <CardTitle className="mt-2 text-2xl tracking-tight">
                    Ready to type with your voice?
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pb-6">
              <p className="max-w-xl text-muted-foreground">
                Install the macOS app, pick your preferred model, and start dictating where
                you already work.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full rounded-full text-base sm:w-auto">
                  <Link href={downloadUrl}>
                    <Download className="h-4 w-4" />
                    Download Vorn Voice
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-border/90 bg-transparent sm:w-auto"
                >
                  <Link href="/">
                    Back to overview
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="py-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <Command className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl tracking-tight">FAQ</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <Accordion type="single" collapsible className="w-full">
                {voiceFaqs.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
