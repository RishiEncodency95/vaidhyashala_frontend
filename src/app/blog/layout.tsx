import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("home1");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd endpoint="home1" />
      {children}
    </>
  );
}
