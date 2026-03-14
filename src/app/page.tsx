import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  homePrinciples,
  vornOneTimePrice,
  voiceComparisonRows,
  voiceHighlights,
  voiceUseCases,
  voiceWorkflow,
  wisprFlowName,
} from "@/lib/site-content";
import { ArrowRight, CheckCircle2, Download, Sparkles } from "lucide-react";

const featuredHighlights = voiceHighlights.slice(0, 4);

export default function Home() {
  return (
    <main className="mesh-background relative min-h-screen overflow-x-clip pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/14 via-primary/4 to-transparent" />
      <div className="pointer-events-none absolute left-[-8rem] top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-[28rem] h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

      <SiteHeader currentPath="/" />

      <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-7 rounded-[1.75rem] border border-border/90 bg-card/78 px-5 py-8 shadow-2xl shadow-black/35 backdrop-blur sm:px-8 sm:py-10 lg:min-h-[34rem] lg:rounded-[2rem] lg:px-10 lg:py-12">
            <Badge className="max-w-full rounded-full border-border/90 bg-background/75 text-foreground hover:bg-background/75">
              Mac voice-to-text
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-[clamp(2.65rem,9vw,4.6rem)] font-semibold leading-[0.98] tracking-tight xl:text-7xl">
                Turn speech into text in the app you already use.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Vorn Voice is a focused macOS dictation app. Hold a shortcut, speak
                naturally, and drop clean text into notes, docs, messages, tickets,
                browsers, or editors without changing windows.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Price
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {vornOneTimePrice} one time
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No subscription. Buy it once and keep using it.
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  What it does
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  Fast dictation on your Mac
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Press a shortcut, speak naturally, and Vorn puts the words back where you
                  are already working.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 sm:w-auto"
              >
                <Link href="/download">
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
                <Link href="/vorn-voice">
                  See how it works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Card className="glass-panel rounded-[1.75rem] border-primary/30 bg-[#151515] py-0 lg:rounded-[2rem]">
            <CardHeader className="border-b border-border/80 py-6">
              <div className="space-y-4">
                <Badge className="rounded-full border-primary/35 bg-primary/10 text-primary hover:bg-primary/10">
                  Why people choose Vorn over {wisprFlowName}
                </Badge>
                <div className="space-y-3">
                  <CardTitle className="text-2xl tracking-tight sm:text-3xl">
                    A smaller tool with a simpler price.
                  </CardTitle>
                  <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                    Vorn is built for people who want clean voice-to-text on macOS without
                    signing up for another monthly software bill.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 py-6">
              <div className="hidden grid-cols-[minmax(0,0.7fr)_1fr_1fr] gap-3 px-1 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground md:grid">
                <p>Compare</p>
                <p>Vorn</p>
                <p>{wisprFlowName}</p>
              </div>
              {voiceComparisonRows.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/80 bg-background/70 p-4 md:grid md:grid-cols-[minmax(0,0.7fr)_1fr_1fr] md:items-start md:gap-3"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-foreground md:mt-0">
                    {item.vorn}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground md:mt-0">
                    {item.wisprFlow}
                  </p>
                </div>
              ))}
              <p className="pt-2 text-xs leading-6 text-muted-foreground">
                Vorn is available now on macOS as a one-time purchase instead of a recurring
                subscription.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="border-b border-border/80 py-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle className="text-2xl tracking-tight">
                  Why Vorn feels simpler
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 py-6">
              {homePrinciples.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border/80 bg-background/70 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="border-b border-border/80 py-6">
              <CardTitle className="text-2xl tracking-tight">
                How Vorn works in three steps
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 py-6 md:grid-cols-3">
              {voiceWorkflow.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-border/80 bg-background/70 p-5"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Step {item.step}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem] space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What Vorn helps you write
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {voiceUseCases.map((item) => (
              <Card
                key={item.title}
                className="glass-panel flex h-full rounded-[1.75rem] border-border/90 bg-[#151515] py-0"
              >
                <CardHeader className="border-b border-border/80 py-6">
                  <CardTitle className="text-xl tracking-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5 py-6">
                  <p className="text-sm leading-7 text-muted-foreground">{item.body}</p>
                  <div className="rounded-2xl border border-border/80 bg-background/75 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Example
                    </p>
                    <p className="mt-3 text-sm leading-6 text-foreground/90">
                      &ldquo;{item.example}&rdquo;
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem] space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What you get with Vorn
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredHighlights.map(({ icon: Icon, title, body }) => (
              <Card
                key={title}
                className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0"
              >
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

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  One-time {vornOneTimePrice} on macOS
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Ready to stop paying monthly just to dictate?
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Download Vorn Voice, choose your shortcut, and start speaking where you
                  already work. It is a focused Mac dictation app with a one-time price and
                  no subscription.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full rounded-full px-6 font-semibold sm:w-auto">
                  <Link href="/download">
                    <Download className="h-4 w-4" />
                    Download for macOS
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-border/90 bg-transparent px-6 sm:w-auto"
                >
                  <Link href="/vorn-voice">
                    See how it works
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
