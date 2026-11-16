import SiteLayout from "@/components/layout/SiteLayout";

// Every website page gets the navbar, footer and chat assistant; the pages render only their own content.
export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
