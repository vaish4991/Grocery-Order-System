import { ContentPage } from "@customer/components/content-page";
import { CartManager } from "@customer/components/cart-manager";

export default function CartPage() {
  return (
    <ContentPage
      eyebrow="Shopping"
      title="Cart"
      description="Review selected products, update quantities, and continue to checkout."
    >
      <CartManager userId="user-customer" />
    </ContentPage>
  );
}
