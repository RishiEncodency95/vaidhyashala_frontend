import BlogPage from "@/components/blog/BlogPage";
import { JsonLd, seoMetadata } from "@/lib/seo";

// SEO and schema come from Admin → SEO Information
export const generateMetadata = () => seoMetadata("home1");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="home1" />
      <BlogPage />
    </>
  );
}
