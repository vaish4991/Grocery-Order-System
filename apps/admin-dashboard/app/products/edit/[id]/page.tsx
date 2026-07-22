import { AdminPage } from "@admin/components/admin-page";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <AdminPage
      eyebrow="Catalog"
      title={`Edit product ${id}`}
      description="Modify product attributes, inventory status, and visibility settings."
    />
  );
}
