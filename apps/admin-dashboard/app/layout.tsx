import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@admin/components/admin-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery Admin Dashboard",
  description: "Operational console for products, orders, customers, coupons, and reports."
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminShell />
        {children}
      </body>
    </html>
  );
}
