import Link from "next/link";
import { categories, products } from "@shared/data/catalog";
import { Button, Card, CardBody } from "@shared/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="overflow-hidden border-slate-200/70 bg-slate-950 text-white">
          <CardBody className="space-y-6 p-8 md:p-12">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Phase 1 MVP
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Grocery commerce built for speed, trust, and repeat purchases.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Browse products, add them to cart, check out with Razorpay, and keep the admin operation ready for growth.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button>Shop products</Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary">Create account</Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        <Card className="border-slate-200/70 bg-white">
          <CardBody className="space-y-6 p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Launch scope</p>
              <p className="mt-2 text-sm text-slate-600">A lean startup foundation with a real commerce workflow.</p>
            </div>
            <div className="grid gap-4 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">Register, verify OTP, and log in.</div>
              <div className="rounded-2xl bg-slate-50 p-4">Browse categories and products.</div>
              <div className="rounded-2xl bg-slate-50 p-4">Add items to cart and place orders.</div>
              <div className="rounded-2xl bg-slate-50 p-4">Use online payment or COD.</div>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-slate-200/70">
            <CardBody className="space-y-3 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Category</p>
              <h2 className="text-xl font-semibold text-slate-950">{category.name}</h2>
              <p className="text-sm leading-6 text-slate-600">{category.description}</p>
            </CardBody>
          </Card>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="border-slate-200/70">
            <CardBody className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Featured product</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">{product.name}</h3>
                </div>
                <p className="text-right text-lg font-semibold text-slate-950">₹{product.discountPrice ?? product.price}</p>
              </div>
              <p className="text-sm leading-6 text-slate-600">{product.description}</p>
              <Link href={`/products/${product.slug}`} className="text-sm font-medium text-brand-700 hover:text-brand-800">
                View details
              </Link>
            </CardBody>
          </Card>
        ))}
      </section>
    </main>
  );
}