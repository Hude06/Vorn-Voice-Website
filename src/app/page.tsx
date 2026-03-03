import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Bolt,
  CheckCircle2,
  Command,
  Download,
  Gauge,
  Mic2,
  Shield,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const downloadUrl = "https://vornvoice.app/updates/mac/stable";

const featureList = [
  {
    icon: Command,
    title: "Push-to-talk hotkeys",
    body: "Hold your global shortcut, speak naturally, and release to transcribe into any app.",
  },
  {
    icon: Bolt,
    title: "Local whisper models",
    body: "Choose tiny, base, or small models depending on whether speed or quality matters most.",
  },
  {
    icon: WandSparkles,
    title: "Auto-paste flow",
    body: "Drop dictated text directly into the focused app while keeping clipboard restore optional.",
  },
  {
    icon: Shield,
    title: "Guided setup checks",
    body: "Get clear runtime diagnostics and permission health before your first dictation session.",
  },
  {
    icon: Gauge,
    title: "Weekly speaking stats",
    body: "Track words per minute and rolling output to measure gains over time.",
  },
  {
    icon: Activity,
    title: "Automatic updates",
    body: "Packaged app builds can fetch updates in the background and install on restart.",
  },
];

const useCases = [
  {
    title: "Quick PR replies",
    snippet:
      "Hold Shift + Command + R\n\"Looks good. I tested the fallback path and it now recovers correctly.\"",
  },
  {
    title: "Issue triage notes",
    snippet:
      "Speak naturally, release hotkey\nVorn Voice transcribes and pastes into Linear, GitHub, or Slack.",
  },
  {
    title: "Docs while coding",
    snippet:
      "Keep hands on keyboard\nDictate implementation notes as you navigate code.",
  },
];

export default function Home() {
  return (
    <main className="mesh-background min-h-screen">
      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-8 sm:px-10">
        <nav className="glass-panel animate-rise flex items-center justify-between rounded-3xl border px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Mic2 className="h-4 w-4 text-primary" />
            Vorn Voice
          </div>
          <Badge className="rounded-full border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
            macOS app
          </Badge>
        </nav>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] border bg-card/80 px-6 py-12 shadow-xl shadow-primary/10 sm:px-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-chart-2/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-8 h-56 w-56 rounded-full bg-chart-1/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <Badge className="animate-rise rounded-full border-border bg-background/80 text-foreground hover:bg-background/80">
                Local-first dictation for developers
              </Badge>
              <h1 className="animate-rise-delay text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Speak ideas. Ship code.
                <span className="text-primary"> No context switching.</span>
              </h1>
              <p className="animate-rise-delay-2 max-w-xl text-base text-muted-foreground sm:text-lg">
                Vorn Voice turns your voice into clean text with a push-to-talk hotkey,
                local whisper models, and instant paste into your current app.
              </p>
              <div className="animate-rise-delay-2 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-7 text-base">
                  <a href={downloadUrl}>
                    <Download className="mr-2 h-4 w-4" />
                    Download for macOS
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 text-base">
                  <a href="#examples">
                    See examples
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="glass-panel animate-rise-delay-2 rounded-3xl border-border/80">
              <CardHeader>
                <CardTitle className="font-mono text-sm text-muted-foreground">
                  Typical workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="rounded-2xl border bg-background/70 p-4">
                  <p className="font-mono text-xs text-muted-foreground">Step 1</p>
                  <p className="mt-1">Hold your shortcut: Shift + Command + R</p>
                </div>
                <div className="rounded-2xl border bg-background/70 p-4">
                  <p className="font-mono text-xs text-muted-foreground">Step 2</p>
                  <p className="mt-1">Speak naturally for PR comments, docs, and updates</p>
                </div>
                <div className="rounded-2xl border bg-background/70 p-4">
                  <p className="font-mono text-xs text-muted-foreground">Step 3</p>
                  <p className="mt-1">Release and let Vorn Voice transcribe + paste instantly</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <Card className="glass-panel rounded-2xl">
            <CardContent className="pt-6">
              <p className="font-mono text-xs uppercase text-muted-foreground">Default Hotkey</p>
              <p className="mt-2 text-xl font-semibold">Shift + Command + R</p>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-2xl">
            <CardContent className="pt-6">
              <p className="font-mono text-xs uppercase text-muted-foreground">Models</p>
              <p className="mt-2 text-xl font-semibold">tiny.en, base.en, small.en</p>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-2xl">
            <CardContent className="pt-6">
              <p className="font-mono text-xs uppercase text-muted-foreground">Update cadence</p>
              <p className="mt-2 text-xl font-semibold">Auto-check every 6 hours</p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16" id="features">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Built for daily engineering flow</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureList.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="glass-panel rounded-2xl border-border/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-4 w-4 text-primary" />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16" id="examples">
          <div className="mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">How it feels in practice</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {useCases.map((item) => (
              <Card key={item.title} className="glass-panel rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto rounded-xl border bg-background/70 p-4 font-mono text-xs leading-6 text-muted-foreground">
                    <code>{item.snippet}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Card className="glass-panel rounded-2xl border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl tracking-tight">Ready to type with your voice?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-muted-foreground">
                Install the macOS app, pick your preferred model, and start dictating where
                you already work.
              </p>
              <Button asChild size="lg" className="w-full rounded-full text-base sm:w-auto">
                <a href={downloadUrl}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Vorn Voice
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl tracking-tight">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>Does it run locally?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Vorn Voice is designed around local whisper model workflows and local
                    runtime checks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>Can I change the hotkey?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. Capture and validate your own global shortcut inside settings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>What happens after I speak?</AccordionTrigger>
                  <AccordionContent>
                    Release your hotkey, transcription runs, and the result can auto-paste into
                    the active app.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-16 border-t py-8 text-sm text-muted-foreground">
          <p>Vorn Voice - speak naturally, write everywhere.</p>
        </footer>
      </section>
    </main>
  );
}
