// "/" is the same Home page as "/home" (content from Admin → Pages & CMS → Home)
import Home from "./home/page";
import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("home2");

export default function RootPage() {
  return (
    <>
      <JsonLd endpoint="home2" />
      <Home />
    </>
  );
}
