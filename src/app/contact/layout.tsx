import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/contact");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd endpoint="pages/contact" />
      {children}
    </>
  );
}
