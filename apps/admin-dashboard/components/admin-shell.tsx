import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/customers", label: "Customers" },
  { href: "/reports", label: "Reports" }
];

export function AdminShell() {
  return (
    <header className="border-b border-white/10 bg-admin-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard" className="text-lg font-semibold tracking-tight text-white">
          Grocery Admin
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">
          Customer site
        </Link>
      </div>
    </header>
  );
}
