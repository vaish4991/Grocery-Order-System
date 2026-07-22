import { notFound } from "next/navigation";
import { products } from "@shared/data/catalog";
import { Card, CardBody } from "@shared/ui";
import { ContentPage } from "@customer/components/content-page";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <ContentPage
      eyebrow="Product details"
      title={product.name}
      description={product.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200/70 bg-slate-50">
          <CardBody className="space-y-4 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Pricing and stock</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-semibold text-slate-950">₹{product.discountPrice ?? product.price}</p>
              {product.discountPrice ? <p className="text-sm text-slate-500 line-through">₹{product.price}</p> : null}
            </div>
            <p className="text-sm text-slate-600">Stock: {product.stock}</p>
            <p className="text-sm text-slate-600">Brand: {product.brand}</p>
          </CardBody>
        </Card>
        <Card className="border-slate-200/70 bg-white">
          <CardBody className="space-y-4 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Actions</p>
            <p className="text-sm leading-6 text-slate-600">Images, reviews, and add-to-cart actions can be wired here once the API client is connected.</p>
          </CardBody>
        </Card>
      </div>
    </ContentPage>
  );
}
