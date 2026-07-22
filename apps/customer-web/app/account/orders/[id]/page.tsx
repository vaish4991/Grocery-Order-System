import { ContentPage } from "@customer/components/content-page";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;

  return (
    <ContentPage
      eyebrow="Customer account"
      title={`Order ${id}`}
      description="Detailed order status, line items, payment information, and delivery tracking appear here."
    />
  );
}
