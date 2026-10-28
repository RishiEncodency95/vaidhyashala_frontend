import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/about-us");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd endpoint="pages/about-us" />
      {children}
    </>
  );
}
