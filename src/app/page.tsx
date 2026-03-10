import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, workflowPillars } from "@/lib/site-content";
import { ArrowRight, CheckCircle2, Download, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="mesh-background relative min-h-screen overflow-hidden pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/14 via-primary/4 to-transparent" />
      <div className="pointer-events-none absolute left-[-8rem] top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-[28rem] h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

      <SiteHeader currentPath="/" />

      <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-7 rounded-[2rem] border border-border/90 bg-card/78 px-6 py-10 shadow-2xl shadow-black/35 backdrop-blur sm:px-8 lg:min-h-[34rem] lg:px-10 lg:py-12">
            <Badge className="rounded-full border-border/90 bg-background/75 text-foreground hover:bg-background/75">
              Full-stack workflow tools for developers
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl">
                Vorn is a system of tools for modern software work.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Start with voice input today, then grow into cursor-aware context and
                parallel coding workflows built to reduce friction between intent and
                execution.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20"
              >
                <Link href="/vorn-voice">
                  Explore Vorn Voice
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-border/90 bg-transparent px-7 text-base"
              >
                <Link href="/download">
                  <Download className="h-4 w-4" />
                  Download for macOS
                </Link>
              </Button>
            </div>
          </div>

          <Card className="glass-panel rounded-[2rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="border-b border-border/80 py-6">
              <CardTitle className="text-2xl tracking-tight">How the system fits together</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 py-6">
              {workflowPillars.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border/80 bg-background/70 p-5">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary" />
                    <p className="font-semibold text-foreground">{title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem] space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Three focused products, one direction</h2>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {products.map(({ href, icon: Icon, name, eyebrow, summary, status, details }) => (
              <Card
                key={name}
                className="glass-panel flex h-full rounded-[1.75rem] border-border/90 bg-[#151515] py-0"
              >
                <CardHeader className="space-y-4 border-b border-border/80 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {eyebrow}
                        </p>
                        <CardTitle className="mt-2 text-2xl tracking-tight">{name}</CardTitle>
                      </div>
                    </div>
                    <Badge className="rounded-full border-border/80 bg-background/70 text-foreground hover:bg-background/70">
                      {status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-8 py-6">
                  <div className="space-y-5">
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                      {summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {details.map((detail) => (
                        <Badge
                          key={detail}
                          className="rounded-full border-border/80 bg-background/65 text-muted-foreground hover:bg-background/65"
                        >
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild className="rounded-full px-5 font-semibold shadow-lg shadow-primary/20">
                      <Link href={href}>
                        Open page
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    {href === "/vorn-voice" ? (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-border/90 bg-transparent"
                      >
                        <Link href="/download">Download now</Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="glass-panel rounded-[1.75rem] border-primary/30 bg-[#151515] py-0">
            <CardHeader className="border-b border-border/80 py-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-2xl tracking-tight">How Vorn rolls out</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 py-6 text-muted-foreground">
              <p className="max-w-2xl leading-7">
                Vorn Voice is the first product available today. The next products build on
                that foundation by adding richer context and more ways to turn intent into
                finished work.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Available now
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">Vorn Voice</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Coming next
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">Context Cursor</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Expanding after
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">Quad Code</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-[1.75rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="border-b border-border/80 py-6">
              <CardTitle className="text-2xl tracking-tight">Start with the tool you can use now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 py-6">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                If you are here today, the fastest way into the Vorn ecosystem is Vorn Voice.
                It is ready now and already captures the kind of low-friction interaction the
                rest of the system is built around.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6 font-semibold">
                  <Link href="/vorn-voice">See the product page</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border/90 bg-transparent px-6"
                >
                  <Link href="/download">Download Vorn Voice</Link>
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
