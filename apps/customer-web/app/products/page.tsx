import Link from "next/link";
import { products } from "@shared/data/catalog";
import { Card, CardBody } from "@shared/ui";
import { ContentPage } from "@customer/components/content-page";

export default function ProductsPage() {
  return (
    <ContentPage
      eyebrow="Products"
      title="All products"
      description="Search, sort, and browse the catalog. This page is designed to accept filters and pagination in the next iteration."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="border-slate-200/70">
            <CardBody className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">{product.name}</h2>
                  <p className="text-sm text-slate-500">{product.brand}</p>
                </div>
                <p className="text-lg font-semibold text-slate-950">₹{product.discountPrice ?? product.price}</p>
              </div>
              <p className="text-sm leading-6 text-slate-600">{product.description}</p>
              <Link href={`/products/${product.slug}`} className="text-sm font-medium text-brand-700 hover:text-brand-800">
                Open product
              </Link>
            </CardBody>
          </Card>
        ))}
      </section>
    </ContentPage>
  );
}
