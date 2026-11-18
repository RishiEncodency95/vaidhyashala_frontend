import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import OrderNumber from "@/components/products/OrderNumber";

export const metadata: Metadata = { title: "Order placed | The Vaidhyashala", robots: { index: false } };

export default function Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#FAF8F3] px-4 text-center">
      <CheckCircle2 className="h-14 w-14 text-[#2C7A52]" />
      <h1 className="font-serif text-[32px] font-medium text-[#0A291F]">Thank you! Payment received.</h1>
      {/* The order number is in the URL (?o=), read in the browser */}
      <Suspense fallback={null}>
        <OrderNumber />
      </Suspense>
      <p className="max-w-md text-[14px] text-[#6B7A71]">Our team will contact you shortly to confirm delivery.</p>
      <Link href="/products" className="mt-2 rounded-lg bg-[#0D382B] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#154D3C]">
        Continue shopping
      </Link>
    </div>
  );
}
