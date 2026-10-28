import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/panchakarma");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd endpoint="pages/panchakarma" />
      {children}
    </>
  );
}
