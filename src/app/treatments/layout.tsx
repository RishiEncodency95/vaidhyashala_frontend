import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/treatments");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd endpoint="pages/treatments" />
      {children}
    </>
  );
}
