import type { Metadata } from "next";
import CheckoutPage from "@/components/products/CheckoutPage";

export const metadata: Metadata = { title: "Checkout | The Vaidhyashala", robots: { index: false } };

export default function Page() {
  return <CheckoutPage />;
}
