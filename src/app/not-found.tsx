import SiteLayout from "@/components/layout/SiteLayout";
import NotFoundPage from "@/components/not-found/NotFoundPage";

// Any URL the website does not have (renders inside the root layout only, so it adds the site frame itself)
export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundPage />
    </SiteLayout>
  );
}
