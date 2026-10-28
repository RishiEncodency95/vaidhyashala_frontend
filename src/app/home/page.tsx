// Server part of the page: its SEO (admin → SEO Information) and schema; the page itself is ./view
import HomePage from "./view";
import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("home2");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="home2" />
      <HomePage />
    </>
  );
}
