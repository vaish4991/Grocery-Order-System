import Link from "next/link";

const links = [
  { href: "/collections", label: "Collections" },
  { href: "/products", label: "Products" },
  { href: "/offers", label: "Offers" },
  { href: "/account", label: "Account" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
          Grocery Order System
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-600 transition-colors hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link href="/login" className="text-slate-600 hover:text-slate-950">
            Login
          </Link>
          <Link href="/cart" className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800">
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
}