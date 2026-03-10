import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  trend: string;
};

export function MetricCard({ label, value, hint, trend }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardDescription>{label}</CardDescription>
          <Badge className="border-primary/20 bg-primary/10 text-primary">Live</Badge>
        </div>
        <CardTitle className="text-4xl font-semibold tracking-[-0.04em]">{value}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>{hint}</span>
        <span className="inline-flex items-center gap-1 text-primary">
          {trend}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </CardContent>
    </Card>
  );
}
