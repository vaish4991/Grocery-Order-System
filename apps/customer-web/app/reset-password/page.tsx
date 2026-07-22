import { z } from "zod";
import { AuthActionForm } from "@customer/components/auth-action-form";
import { ContentPage } from "@customer/components/content-page";

export default function ResetPasswordPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Reset password"
      description="A secure recovery token is exchanged for a new password here."
    >
      <AuthActionForm
        endpoint="auth/reset-password"
        submitLabel="Reset password"
        schema={z.object({
          email: z.string().email("Enter a valid email address."),
          code: z.string().length(6, "Enter the 6-digit reset code."),
          newPassword: z.string().min(6, "Password must be at least 6 characters.")
        })}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
          { name: "code", label: "Reset code", type: "text", placeholder: "123456", autoComplete: "one-time-code" },
          { name: "newPassword", label: "New password", type: "password", placeholder: "Create a new password", autoComplete: "new-password" }
        ]}
        helper={{ label: "Back to login", href: "/login" }}
      />
    </ContentPage>
  );
}
