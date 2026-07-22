import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@customer/components/site-footer";
import { SiteHeader } from "@customer/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery Order System",
  description: "Phase 1 MVP foundation for a production grocery commerce platform."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}