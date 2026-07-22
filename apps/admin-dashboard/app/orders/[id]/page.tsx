import { AdminPage } from "@admin/components/admin-page";

interface AdminOrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailsPage({ params }: AdminOrderDetailsPageProps) {
  const { id } = await params;

  return (
    <AdminPage
      eyebrow="Operations"
      title={`Order ${id}`}
      description="Inspect a specific order, update status, and manage the payment record."
    />
  );
}
