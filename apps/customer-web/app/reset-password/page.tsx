import { ContentPage } from "@customer/components/content-page";

export default function ResetPasswordPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Reset password"
      description="A secure recovery token is exchanged for a new password here."
    />
  );
}
