import { ContentPage } from "@customer/components/content-page";

export default function LoginPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Login"
      description="Customers log in here with email, password, and refresh token-backed sessions."
    />
  );
}
