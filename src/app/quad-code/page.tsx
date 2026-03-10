import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brackets, CheckCircle2, Command, Sparkles } from "lucide-react";

const featureCards = [
  {
    title: "Dedicated tmux workspace",
    body: "Quad Code launches its own tmux server and session so the dashboard stays separate from whatever tmux setup you already use.",
  },
  {
    title: "Fixed four-pane layout",
    body: "Every run creates the same tiled 2x2 layout, which makes it easy to keep four coding agents or shells visible at once.",
  },
  {
    title: "Real terminal behavior",
    body: "Because the panes are native tmux panes, shell prompts, terminal apps, and text rendering behave like a normal terminal session.",
  },
  {
    title: "Mouse-first control",
    body: "Click any pane to focus it, type directly, and detach with F12 when you want to leave the dashboard without killing it.",
  },
  {
    title: "Launch from your current folder",
    body: "The dashboard starts in the directory where you run `quadcode`, which makes it natural to spin up a workspace inside the repo you are already in.",
  },
  {
    title: "Uses your shell",
    body: "Quad Code inherits `SHELL` when it is set and falls back to `/bin/zsh`, so the panes feel like the terminal environment you expect.",
  },
] as const;

const useCases = [
  {
    title: "Parallel coding agents",
    snippet:
      "Pane 1  OpenCode\nPane 2  Codecs\nPane 3  Cloud Code\nPane 4  Your own shell for edits, logs, or git",
  },
  {
    title: "Build, test, review, ship",
    snippet:
      "Keep one pane for implementation, one for tests, one for logs, and one for review commands instead of constantly reusing a single terminal.",
  },
  {
    title: "Background dashboard mode",
    snippet:
      "QUADCODE_NO_ATTACH=1 quadcode\nLeave the tmux session running in the background and attach later when you are in an interactive terminal.",
  },
] as const;

const requirements = [
  "Node.js 20 or newer",
  "tmux installed and available on PATH",
  "macOS or Linux-style terminal environment",
  "An interactive terminal for automatic attach, unless you use `QUADCODE_NO_ATTACH=1`",
] as const;

const commands = [
  "npx quad-code",
  "quadcode",
  "QUADCODE_NO_ATTACH=1 quadcode",
] as const;

export const metadata: Metadata = {
  title: "Quad Code | Vorn",
  description:
    "Quad Code is a mouse-first tmux dashboard CLI that opens a fixed four-pane coding workspace in your current directory.",
};

export default function QuadCodePage() {
  return (
    <main className="mesh-background relative min-h-screen overflow-x-clip pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/12 via-primary/4 to-transparent" />
      <div className="pointer-events-none absolute left-[-5rem] top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <SiteHeader currentPath="/quad-code" />

      <section className="relative px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-6 rounded-[1.75rem] border border-border/90 bg-card/80 px-5 py-8 shadow-2xl shadow-black/35 backdrop-blur sm:px-8 sm:py-10 lg:rounded-[2rem] lg:px-10 lg:py-12">
            <Badge className="max-w-full rounded-full border-border/90 bg-background/75 text-foreground hover:bg-background/75">
              Available as a CLI now
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-[clamp(2.6rem,9vw,4.4rem)] font-semibold leading-[1.02] tracking-tight xl:text-[4.5rem]">
                Four terminals.
                <span className="text-primary"> One focused coding dashboard.</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Quad Code is a mouse-first tmux dashboard CLI for running four coding sessions
                side by side in the folder you are already working in.
              </p>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                It creates a dedicated 2x2 workspace, lets you click panes to focus them,
                keeps terminal behavior native, and gives parallel tools like OpenCode, Codecs,
                Cloud Code, or your own shell room to work together.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 sm:w-auto"
              >
                <Link href="#commands">
                  See commands
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-border/90 bg-transparent px-7 text-base sm:w-auto"
              >
                <Link href="#examples">See workflows</Link>
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
                <p className="mt-1">Run `quadcode` inside the repo you want to work in.</p>
              </div>
              <div className="rounded-2xl border border-border/90 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Step 2
                </p>
                <p className="mt-1">Quad Code creates a dedicated tmux session with four tiled panes.</p>
              </div>
              <div className="rounded-2xl border border-border/90 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Step 3
                </p>
                <p className="mt-1">Click the pane you want, type normally, and use F12 to detach.</p>
              </div>
              <div className="rounded-2xl border border-border/90 bg-background/70 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Step 4
                </p>
                <p className="mt-1">Use `QUADCODE_NO_ATTACH=1` when you want the dashboard left running in the background.</p>
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
                Dedicated socket
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">
                Runs on its own tmux socket instead of colliding with your usual setup
              </p>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="py-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Mouse-first panes
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">
                Click to focus, keep typing, and stay in a visual multi-agent flow
              </p>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="py-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Current-directory launch
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">
                Starts where you are, so the workspace matches the repo already under your hands
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What it actually does
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((item) => (
              <Card key={item.title} className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
                <CardHeader className="py-6">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
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
              How it fits real workflows
            </h2>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {useCases.map((item) => (
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

      <section className="px-4 py-8 sm:px-6 lg:px-8" id="commands">
        <div className="mx-auto grid w-full max-w-[88rem] gap-6 xl:grid-cols-[1fr_1.05fr] xl:items-start">
          <Card className="glass-panel rounded-[1.75rem] border-primary/35 bg-[#151515] py-0">
            <CardHeader className="py-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <Brackets className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Commands
                  </p>
                  <CardTitle className="mt-2 text-2xl tracking-tight">
                    Start fast, then stay attached or detach
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pb-6">
              <div className="space-y-3">
                {commands.map((command) => (
                  <pre
                    key={command}
                    className="overflow-x-auto rounded-xl border border-border/90 bg-background/75 p-3 font-mono text-[11px] leading-6 text-muted-foreground sm:p-4 sm:text-xs"
                  >
                    <code>{command}</code>
                  </pre>
                ))}
              </div>
              <p className="max-w-xl text-muted-foreground">
                Quad Code uses a dedicated tmux session named `quadcode-dashboard`, titles the
                panes, enables mouse support, and binds `F12` to detach the client cleanly.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="py-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <Command className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl tracking-tight">Requirements and notes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              {requirements.map((item) => (
                <div key={item} className="rounded-2xl border border-border/80 bg-background/70 p-4">
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  If you launch from a non-interactive environment, Quad Code explains that tmux
                  attach needs a real terminal and points you to `QUADCODE_NO_ATTACH=1`.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Part of the Vorn toolset
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Pair Quad Code with the rest of your workflow
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  Use Quad Code for multi-terminal execution, then layer in Vorn tools like Vorn
                  Voice when you want to move faster through prompts, notes, and reviews.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full rounded-full text-base sm:w-auto">
                  <Link href="/vorn-voice">Explore Vorn Voice</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-border/90 bg-transparent sm:w-auto"
                >
                  <Link href="/">Back to overview</Link>
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
