import { Card, CardBody } from "@shared/ui";
import type { ReactNode } from "react";

interface ContentPageProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function ContentPage({ eyebrow, title, description, children }: ContentPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="border-slate-200/70 bg-white/90">
        <CardBody className="space-y-6 p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">{eyebrow}</p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{description}</p>
          </div>
          {children}
        </CardBody>
      </Card>
    </main>
  );
}
