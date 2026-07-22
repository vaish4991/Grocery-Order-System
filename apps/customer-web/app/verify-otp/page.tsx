import { z } from "zod";
import { AuthActionForm } from "@customer/components/auth-action-form";
import { ContentPage } from "@customer/components/content-page";

export default function VerifyOtpPage() {
  return (
    <ContentPage
      eyebrow="Authentication"
      title="Verify OTP"
      description="OTP verification confirms the user identity and completes onboarding."
    >
      <AuthActionForm
        endpoint="auth/verify-otp"
        submitLabel="Verify"
        schema={z.object({
          email: z.string().email("Enter a valid email address."),
          code: z.string().length(6, "Enter the 6-digit OTP.")
        })}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
          { name: "code", label: "OTP Code", type: "text", placeholder: "123456", autoComplete: "one-time-code" }
        ]}
        helper={{ label: "Back to login", href: "/login" }}
      />
    </ContentPage>
  );
}
