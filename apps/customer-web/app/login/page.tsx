import { z } from "zod";
import { AuthActionForm } from "@customer/components/auth-action-form";
import { ContentPage } from "@customer/components/content-page";

export default function LoginPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Login"
      description="Customers log in here with email, password, and refresh token-backed sessions."
    >
      <AuthActionForm
        endpoint="auth/login"
        submitLabel="Login"
        schema={z.object({
          email: z.string().email("Enter a valid email address."),
          password: z.string().min(6, "Password must be at least 6 characters.")
        })}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
          { name: "password", label: "Password", type: "password", placeholder: "Enter your password", autoComplete: "current-password" }
        ]}
        helper={{ label: "Create an account", href: "/register" }}
      />
    </ContentPage>
  );
}
