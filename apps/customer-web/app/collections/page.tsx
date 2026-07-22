import { categories } from "@shared/data/catalog";
import { Card, CardBody } from "@shared/ui";
import { ContentPage } from "@customer/components/content-page";

export default function CollectionsPage() {
  return (
    <ContentPage
      eyebrow="Collections"
      title="Shop by category"
      description="Browse the full grocery assortment by category before diving into product detail pages."
    >
      <section className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-slate-200/70">
            <CardBody className="space-y-3 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{category.name}</h2>
              <p className="text-sm leading-6 text-slate-600">{category.description}</p>
            </CardBody>
          </Card>
        ))}
      </section>
    </ContentPage>
  );
}
