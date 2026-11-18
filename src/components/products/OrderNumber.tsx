"use client";

import { useSearchParams } from "next/navigation";

/** "Your order number is VDS-…" on the order-success page */
export default function OrderNumber() {
  const o = (useSearchParams().get("o") || "").slice(0, 40);
  if (!o) return null;
  return (
    <p className="text-[15px] text-[#4A5950]">
      Your order number is <b className="text-[#0D382B]">{o}</b>
    </p>
  );
}
