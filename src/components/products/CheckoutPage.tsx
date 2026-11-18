"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Lock } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { useCart, rupees } from "@/lib/cart";

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: () => void) => void };
  }
}

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const field = "w-full rounded-lg border border-[#D5CDC0] bg-white px-3 py-2.5 text-[14px] text-[#22332A] focus:border-[#0D382B] focus:outline-none";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, savings, count, clear } = useCart();
  const [f, setF] = useState({ name: "", mobile: "", email: "", line1: "", line2: "", city: "", state: "", pincode: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((v) => ({ ...v, [k]: e.target.value }));

  const post = async (path: string, body: unknown) => {
    const res = await fetch(`${API_BASE}/website/orders${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) throw new Error(json?.errors?.[0] || json?.message || "Something went wrong. Please try again.");
    return json.data;
  };

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !items.length) return;
    setError("");
    setBusy(true);
    try {
      if (!(await loadRazorpay())) throw new Error("Could not load the payment window. Check your internet and try again.");
      const order = await post("", {
        customer: { name: f.name, mobile: f.mobile, email: f.email },
        address: { line1: f.line1, line2: f.line2, city: f.city, state: f.state, pincode: f.pincode },
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
      });
      const rz = new window.Razorpay!({
        key: order.razorpay.keyId,
        amount: order.razorpay.amount,
        currency: order.razorpay.currency,
        order_id: order.razorpay.orderId,
        name: "The Vaidhyashala",
        description: `Order ${order.orderNumber}`,
        prefill: { name: f.name, email: f.email, contact: f.mobile },
        theme: { color: "#0D382B" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const done = await post("/verify", { orderId: order.orderId, ...r });
            clear();
            router.push(`/order-success?o=${encodeURIComponent(done.orderNumber)}`);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment could not be verified.");
            setBusy(false);
          }
        },
      });
      rz.on("payment.failed", () => {
        setError("Payment failed. You have not been charged. Please try again.");
        setBusy(false);
      });
      rz.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F3] text-[#22332A]">
      <div className="mx-auto min-h-[60vh] max-w-[1400px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <nav className="mb-3 flex items-center gap-1 text-[13px] text-[#6B7A71]">
          <Link href="/cart" className="hover:text-[#0D382B]">Cart</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-[#0D382B]">Checkout</span>
        </nav>
        <h1 className="font-serif text-[30px] font-medium text-[#0A291F] sm:text-[36px]">Checkout</h1>

        {items.length === 0 ? (
          <p className="mt-6 text-[15px]">Your cart is empty. <Link href="/products" className="font-semibold underline">Browse products</Link></p>
        ) : (
          <form onSubmit={pay} className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#ECE5D8] bg-white p-5 sm:grid-cols-2 lg:col-span-8">
              <h2 className="text-[17px] font-bold text-[#0D382B] sm:col-span-2">Delivery details</h2>
              <input required className={field} placeholder="Full name" value={f.name} onChange={set("name")} maxLength={100} autoComplete="name" />
              <input required className={field} placeholder="Mobile number" value={f.mobile} onChange={set("mobile")} inputMode="tel" maxLength={19} autoComplete="tel" />
              <input className={`${field} sm:col-span-2`} type="email" placeholder="Email (optional)" value={f.email} onChange={set("email")} maxLength={200} autoComplete="email" />
              <input required className={`${field} sm:col-span-2`} placeholder="Address (house, street)" value={f.line1} onChange={set("line1")} maxLength={200} autoComplete="address-line1" />
              <input className={`${field} sm:col-span-2`} placeholder="Landmark / area (optional)" value={f.line2} onChange={set("line2")} maxLength={200} />
              <input required className={field} placeholder="City" value={f.city} onChange={set("city")} maxLength={100} autoComplete="address-level2" />
              <input required className={field} placeholder="State" value={f.state} onChange={set("state")} maxLength={100} autoComplete="address-level1" />
              <input required className={field} placeholder="Pincode" value={f.pincode} onChange={set("pincode")} inputMode="numeric" pattern="\d{6}" maxLength={6} autoComplete="postal-code" />
            </div>

            <aside className="rounded-2xl border border-[#ECE5D8] bg-white p-5 lg:sticky lg:top-24 lg:col-span-4">
              <h2 className="text-[17px] font-bold text-[#0D382B]">Order summary</h2>
              <ul className="mt-3 space-y-1.5 text-[13.5px] text-[#4A5950]">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between gap-3">
                    <span className="truncate">{i.title} × {i.qty}</span>
                    <span className="shrink-0">{rupees(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-3 space-y-2 border-t border-[#ECE5D8] pt-3 text-[14px] text-[#4A5950]">
                <div className="flex justify-between"><dt>Items ({count})</dt><dd>{rupees(subtotal + savings)}</dd></div>
                {savings > 0 && <div className="flex justify-between font-semibold text-[#2C7A52]"><dt>Discount</dt><dd>− {rupees(savings)}</dd></div>}
                <div className="flex justify-between border-t border-[#ECE5D8] pt-3 text-[18px] font-bold text-[#0D382B]"><dt>Total</dt><dd>{rupees(subtotal)}</dd></div>
              </dl>
              {error && <p role="alert" className="mt-3 rounded-md bg-[#FBEDEA] px-3 py-2 text-[13px] font-medium text-[#B3402D]">{error}</p>}
              <button type="submit" disabled={busy} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0D382B] px-5 py-3 text-[15px] font-bold text-white hover:bg-[#154D3C] disabled:opacity-60">
                <Lock className="h-4 w-4" /> {busy ? "Please wait…" : `Pay ${rupees(subtotal)}`}
              </button>
              <p className="mt-2 text-center text-[12px] text-[#8C988F]">Secure payment by Razorpay (UPI, cards, netbanking)</p>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}
