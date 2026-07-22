import { ContentPage } from "@customer/components/content-page";

export default function OrderFailedPage() {
  return (
    <ContentPage
      eyebrow="Checkout"
      title="Payment failed"
      description="Display the failure reason and offer a retry path or alternate payment option."
    />
  );
}
