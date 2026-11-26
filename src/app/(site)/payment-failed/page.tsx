import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentFailedView from "@/components/products/PaymentFailedView";

export const metadata: Metadata = { title: "Payment failed | The Vaidhyashala", robots: { index: false } };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
      <PaymentFailedView />
    </Suspense>
  );
}
