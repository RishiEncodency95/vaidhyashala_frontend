import { Suspense } from "react";
import type { Metadata } from "next";
import OrderSuccessView from "@/components/products/OrderSuccessView";

export const metadata: Metadata = { title: "Order placed | The Vaidhyashala", robots: { index: false } };

export default function Page() {
  return (
    // The order is read in the browser (the number is in the URL, ?o=), so this part waits for the client
    <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
      <OrderSuccessView />
    </Suspense>
  );
}
