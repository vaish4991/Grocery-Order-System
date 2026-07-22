"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@shared/ui";

type FieldType = "text" | "email" | "password" | "tel";

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder: string;
  autoComplete?: string;
}

interface AuthActionFormProps {
  endpoint: string;
  submitLabel: string;
  fields: FieldConfig[];
  schema: z.ZodTypeAny;
  helper?: {
    label: string;
    href: string;
  };
}

export function AuthActionForm({ endpoint, submitLabel, fields, schema, helper }: AuthActionFormProps) {
  const defaultValues = Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<string, string>;
  const { register, handleSubmit, reset } = useForm<Record<string, string>>({ defaultValues });
  const [status, setStatus] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: Record<string, string>) {
    setLoading(true);
    setStatus("");
    setFieldErrors({});

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed.data)
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus(payload?.message ?? "Request failed.");
      } else {
        setStatus(typeof payload?.message === "string" ? payload.message : "Request completed successfully.");
        reset(defaultValues);
      }
    } catch {
      setStatus("Could not reach the backend API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="space-y-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-700">{field.label}</span>
            <input
              {...register(field.name)}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none ring-0 transition focus:border-brand-400"
            />
            {fieldErrors[field.name] ? <p className="text-sm text-red-600">{fieldErrors[field.name]}</p> : null}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : submitLabel}
        </Button>
        {helper ? (
          <Link href={helper.href} className="text-sm font-medium text-brand-700 hover:text-brand-800">
            {helper.label}
          </Link>
        ) : null}
      </div>

      {status ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{status}</div>
      ) : null}
    </form>
  );
}
