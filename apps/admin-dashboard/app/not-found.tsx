import Link from "next/link";
import { AdminPage } from "@admin/components/admin-page";

export default function AdminNotFound() {
  return (
    <AdminPage
      eyebrow="404"
      title="Admin page not found"
      description="The requested admin route does not exist. Return to the dashboard or customer site."
    >
      <div className="flex gap-4">
        <Link href="/admin/dashboard" className="text-sm font-medium text-amber-300 hover:text-amber-200">
          Dashboard
        </Link>
        <Link href="/" className="text-sm font-medium text-white hover:text-slate-300">
          Customer site
        </Link>
      </div>
    </AdminPage>
  );
}