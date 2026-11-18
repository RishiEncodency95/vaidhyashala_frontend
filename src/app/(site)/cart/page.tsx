import type { Metadata } from "next";
import CartPage from "@/components/products/CartPage";

export const metadata: Metadata = { title: "Your Cart | The Vaidhyashala", robots: { index: false } };

export default function Page() {
  return <CartPage />;
}
