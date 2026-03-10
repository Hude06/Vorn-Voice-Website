import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brackets } from "lucide-react";

export const metadata: Metadata = {
  title: "Quad Code | Vorn",
  description:
    "Quad Code is an upcoming Vorn tool for launching four coding terminal sessions at once.",
};

export default function QuadCodePage() {
  return (
    <main className="mesh-background relative min-h-screen overflow-x-clip pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/12 via-primary/4 to-transparent" />

      <SiteHeader currentPath="/quad-code" />

      <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div className="space-y-6 rounded-[1.75rem] border border-border/90 bg-card/80 px-5 py-8 shadow-2xl shadow-black/35 backdrop-blur sm:px-8 sm:py-10 lg:rounded-[2rem] lg:px-10 lg:py-12">
            <Badge className="max-w-full rounded-full border-border/90 bg-background/75 text-foreground hover:bg-background/75">
              Coming soon
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-balance text-[clamp(2.5rem,9vw,4rem)] font-semibold leading-[1.02] tracking-tight">
                Quad Code
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Launch four coding terminal sessions wherever you are.
              </p>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Quad Code opens four terminal sessions at once so OpenCode, Codecs, Cloud
                Code, or other parallel coding workflows can run side by side. Yes, the name
                is a play on &quot;write code.&quot;
              </p>
            </div>
            <Button asChild size="lg" className="w-full rounded-full px-7 font-semibold sm:w-fit">
              <Link href="/vorn-voice">
                Start with Vorn Voice
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card className="glass-panel rounded-[2rem] border-border/90 bg-[#151515] py-0">
            <CardHeader className="py-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <Brackets className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Status
                  </p>
                  <CardTitle className="mt-2 text-2xl tracking-tight">Placeholder page</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6 text-muted-foreground">
              <p>This page is intentionally light for now.</p>
              <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                Product details, workflow examples, and terminal layout previews will land
                here once Quad Code is ready to present.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
