import { cn } from "@shared/utils/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: PropsWithChildren<CardProps>) {
  return (
    <div className={cn("rounded-3xl border border-slate-200 bg-white shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: PropsWithChildren<CardProps>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}