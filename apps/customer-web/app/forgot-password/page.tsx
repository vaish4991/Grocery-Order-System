import { z } from "zod";
import { AuthActionForm } from "@customer/components/auth-action-form";
import { ContentPage } from "@customer/components/content-page";

export default function ForgotPasswordPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Forgot password"
      description="The reset flow begins here with an email or phone lookup and a one-time recovery step."
    >
      <AuthActionForm
        endpoint="auth/forgot-password"
        submitLabel="Send reset code"
        schema={z.object({
          email: z.string().email("Enter a valid email address.")
        })}
        fields={[{ name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" }]}
        helper={{ label: "Reset password", href: "/reset-password" }}
      />
    </ContentPage>
  );
}
