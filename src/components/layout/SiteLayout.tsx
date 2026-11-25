import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart";
import { ChatbotLauncher } from "@/components/chatbot/ChatbotLauncher";

/** The website frame around every page: navbar, the page's own content, footer and the chat assistant. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      <ChatbotLauncher />
    </CartProvider>
  );
}
