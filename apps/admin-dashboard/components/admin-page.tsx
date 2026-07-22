import { Card, CardBody } from "@shared/ui";
import type { ReactNode } from "react";

interface AdminPageProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function AdminPage({ eyebrow, title, description, children }: AdminPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="border-slate-800 bg-admin-900 text-white shadow-2xl shadow-black/20">
        <CardBody className="space-y-6 p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{eyebrow}</p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">{description}</p>
          </div>
          {children}
        </CardBody>
      </Card>
    </main>
  );
}
