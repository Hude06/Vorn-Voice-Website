"use client";

import { useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/site-content";
import { Menu, Mic2, X } from "lucide-react";

type SiteHeaderProps = {
  currentPath: string;
};

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto w-full max-w-[88rem] rounded-[1.5rem] border border-border/90 bg-card/85 px-4 py-4 shadow-2xl shadow-black/25 sm:px-5 md:rounded-[1.75rem] md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={() => setIsMobileNavOpen(false)}
            className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] text-foreground uppercase"
          >
            <Mic2 className="h-4 w-4 text-primary" />
            Vorn
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-expanded={isMobileNavOpen}
              aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              className="h-10 w-10 rounded-full border-border/90 bg-background/70"
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              {isMobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mt-3 hidden items-center justify-between gap-6 md:flex">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-primary/12 text-foreground"
                      : "hover:bg-background/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Badge className="rounded-full border-primary/35 bg-primary/10 text-primary hover:bg-primary/10">
              System of tools
            </Badge>
            <Button asChild className="rounded-full px-5 font-semibold shadow-lg shadow-primary/20">
              <Link href="/download">Download Vorn Voice</Link>
            </Button>
          </div>
        </div>

        {isMobileNavOpen ? (
          <div className="mt-4 space-y-4 border-t border-border/80 pt-4 md:hidden">
            <Badge className="rounded-full border-primary/35 bg-primary/10 text-primary hover:bg-primary/10">
              System of tools
            </Badge>

            <nav className="grid gap-2 text-sm text-muted-foreground">
              {navItems.map((item) => {
                const isActive = currentPath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`rounded-2xl px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-primary/12 text-foreground"
                        : "bg-background/45 hover:bg-background/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Button
              asChild
              className="w-full rounded-full px-5 font-semibold shadow-lg shadow-primary/20"
            >
              <Link href="/download" onClick={() => setIsMobileNavOpen(false)}>
                Download Vorn Voice
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[88rem] gap-8 rounded-[2rem] border border-border/90 bg-card/65 px-6 py-8 text-sm text-muted-foreground backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div className="space-y-3">
          <p className="text-base font-semibold text-foreground">Vorn</p>
          <p className="max-w-xl leading-6">
            A growing system of tools for software work, starting with voice input and
            expanding into cursor-aware context and parallel coding workflows.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Products
            </p>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Current focus
            </p>
            <p>Voice-first coding and software workflows.</p>
            <Link href="/download" className="block hover:text-foreground">
              Download Vorn Voice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
