import { z } from "zod";
import { AuthActionForm } from "@customer/components/auth-action-form";
import { ContentPage } from "@customer/components/content-page";

export default function RegisterPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Register"
      description="Registration starts the OTP verification workflow before the account becomes active."
    >
      <AuthActionForm
        endpoint="auth/register"
        submitLabel="Create account"
        schema={z.object({
          name: z.string().min(2, "Name is required."),
          email: z.string().email("Enter a valid email address."),
          phone: z.string().min(10, "Phone number is required."),
          password: z.string().min(6, "Password must be at least 6 characters.")
        })}
        fields={[
          { name: "name", label: "Name", type: "text", placeholder: "Full name", autoComplete: "name" },
          { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
          { name: "phone", label: "Phone", type: "tel", placeholder: "9999999999", autoComplete: "tel" },
          { name: "password", label: "Password", type: "password", placeholder: "Create a password", autoComplete: "new-password" }
        ]}
        helper={{ label: "Already have an account? Log in", href: "/login" }}
      />
    </ContentPage>
  );
}
