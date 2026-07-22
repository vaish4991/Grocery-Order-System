import { cn } from "@shared/utils/cn";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = "primary", children, ...props }: PropsWithChildren<ButtonProps>) {
  const styles = {
    primary: "bg-slate-950 text-white hover:bg-slate-800",
    secondary: "bg-amber-400 text-slate-950 hover:bg-amber-300",
    ghost: "bg-transparent text-slate-950 hover:bg-slate-100"
  }[variant];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        styles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}