import Link from "next/link";
import { ContentPage } from "@customer/components/content-page";

export default function NotFound() {
  return (
    <ContentPage
      eyebrow="404"
      title="Page not found"
      description="The route does not exist. Return to the home page or browse products."
    >
      <Link href="/" className="text-sm font-medium text-brand-700 hover:text-brand-800">
        Go home
      </Link>
    </ContentPage>
  );
}
