import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentPendingView from "@/components/products/PaymentPendingView";

export const metadata: Metadata = { title: "Payment pending | The Vaidhyashala", robots: { index: false } };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
      <PaymentPendingView />
    </Suspense>
  );
}
