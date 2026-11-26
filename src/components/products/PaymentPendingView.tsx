"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  CreditCard,
  Headset,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import CmsImage from "@/components/common/CmsImage";
import { poppins } from "@/lib/fonts";
import { rupees, useCart } from "@/lib/cart";
import { parseLastOrder, readLastOrderRaw, saveLastOrder, subscribeLastOrder } from "@/lib/lastOrder";
import { API_BASE } from "@/lib/api";

const SUPPORT_PHONE = "+91 98119 79147";
const SUPPORT_EMAIL = "care@vaidhyashala.com";
const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

const GREEN = "#0A3314";
const BTN_GREEN = "linear-gradient(180deg,#0B5A22 0%,#074619 55%,#043A14 100%)";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtFull = (d: Date) => {
  const h = d.getHours();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

const loadRazorpay = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = RAZORPAY_SRC;
    s.async = true;
    s.onload = () => resolve(Boolean(window.Razorpay));
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export default function PaymentPendingView() {
  const router = useRouter();
  const { clear } = useCart();
  const asked = (useSearchParams().get("o") || "").slice(0, 40);
  const raw = useSyncExternalStore(subscribeLastOrder, readLastOrderRaw, () => null);
  const order = useMemo(() => (raw === null ? undefined : parseLastOrder(raw)), [raw]);

  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [statusNote, setStatusNote] = useState("Waiting for confirmation from your bank or UPI app…");
  const [error, setError] = useState("");
  const pollCountRef = useRef(0);

  const checkStatus = useCallback(async () => {
    if (!order?.orderId || !order?.razorpayOrderId) return;
    setChecking(true);
    try {
      const res = await fetch(`${API_BASE}/website/orders/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId, razorpay_order_id: order.razorpayOrderId }),
      });
      const json = await res.json().catch(() => null);
      const data = json?.data as { paymentStatus?: string; reason?: string; code?: string; orderNumber?: string } | undefined;
      if (data?.paymentStatus === "paid") {
        saveLastOrder({ ...order, paymentStatus: "paid" });
        clear();
        router.replace(`/order-success?o=${encodeURIComponent(order.orderNumber)}`);
        return;
      }
      if (data?.paymentStatus === "failed") {
        saveLastOrder({
          ...order,
          paymentStatus: "failed",
          failureReason: data.reason || "Payment was declined or expired.",
          failureCode: data.code || "",
        });
        router.replace(`/payment-failed?o=${encodeURIComponent(order.orderNumber)}`);
        return;
      }
      setStatusNote("Still awaiting confirmation from your bank / UPI app. You can keep this page open or complete payment below.");
    } catch {
      setStatusNote("Could not reach server right now. Click 'Check Payment Status' in a moment.");
    } finally {
      setChecking(false);
    }
  }, [clear, order, router]);

  useEffect(() => {
    if (!order?.orderId || !order?.razorpayOrderId) return;
    const timer = window.setInterval(() => {
      if (pollCountRef.current >= 12) {
        window.clearInterval(timer);
        return;
      }
      pollCountRef.current += 1;
      void checkStatus();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [checkStatus, order?.orderId, order?.razorpayOrderId]);

  if (order === undefined) return <div className="min-h-[60vh] bg-white" aria-busy="true" />;

  if (!order || (asked && order.orderNumber !== asked)) {
    return (
      <div className={`${poppins.className} flex min-h-[55vh] flex-col items-center justify-center gap-3 bg-white px-4 text-center text-[#1A1A1A]`}>
        <Clock className="h-12 w-12 text-[#B45309]" strokeWidth={1.6} />
        <h1 className="text-[26px] font-bold text-[#92400E]">Payment Verification Pending</h1>
        {asked && <p className="text-[15px]">Order number: <b>{asked}</b></p>}
        <p className="max-w-md text-[14px] text-[#555]">
          If your payment was debited, your confirmation email will arrive shortly once your bank confirms. For help, call {SUPPORT_PHONE} or email {SUPPORT_EMAIL}.
        </p>
        <Link href="/products" className="mt-2 rounded-lg px-6 py-3 text-[14px] font-bold text-white" style={{ background: BTN_GREEN }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const placed = new Date(order.placedAt);
  const count = order.items.reduce((n, i) => n + i.qty, 0);
  const canRetry = Boolean(order.orderId && order.razorpayOrderId);

  const completePayment = async () => {
    if (busy || !canRetry) return;
    setError("");
    setBusy(true);
    try {
      if (!(await loadRazorpay())) {
        throw new Error("Could not load Razorpay checkout. Please disable any ad blocker and try again.");
      }
      const res = await fetch(`${API_BASE}/website/orders/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId, razorpay_order_id: order.razorpayOrderId }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.errors?.[0] || json?.message || "Could not open payment.");
      const data = json.data;
      if (data.alreadyPaid) {
        saveLastOrder({ ...order, paymentStatus: "paid" });
        clear();
        router.push(`/order-success?o=${encodeURIComponent(order.orderNumber)}`);
        return;
      }
      const updatedOrder = { ...order, razorpayOrderId: data.razorpay.orderId, paymentStatus: "pending" as const };
      saveLastOrder(updatedOrder);

      const rz = new window.Razorpay!({
        key: data.razorpay.keyId,
        amount: data.razorpay.amount,
        currency: data.razorpay.currency,
        order_id: data.razorpay.orderId,
        name: "The Vaidhyashala",
        description: `Order ${data.orderNumber}`,
        ...(order.customer ? { prefill: { name: order.customer.name, email: order.customer.email || "", contact: order.customer.mobile } } : {}),
        theme: { color: "#0D382B" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const vRes = await fetch(`${API_BASE}/website/orders/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderId, ...r }),
            });
            if (!vRes.ok) throw new Error("Pending verification");
            saveLastOrder({ ...updatedOrder, paymentStatus: "paid", paymentId: r.razorpay_payment_id });
            clear();
            router.push(`/order-success?o=${encodeURIComponent(data.orderNumber)}`);
          } catch {
            void checkStatus();
            setBusy(false);
          }
        },
      });
      rz.on("payment.failed", (resp: unknown) => {
        const errObj = (resp as { error?: { description?: string; reason?: string; code?: string } })?.error;
        saveLastOrder({
          ...updatedOrder,
          paymentStatus: "failed",
          failureReason: errObj?.description || errObj?.reason || "Payment failed.",
          failureCode: errObj?.code || "",
        });
        router.push(`/payment-failed?o=${encodeURIComponent(data.orderNumber)}`);
      });
      rz.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open payment window.");
      setBusy(false);
    }
  };

  return (
    <div className={`${poppins.className} w-full bg-white text-[#1A1A1A]`}>
      {/* Banner */}
      <div className="relative w-full overflow-hidden border-b border-[#F3E2BA] bg-[linear-gradient(90deg,#FEF9EC_0%,#FFFDF7_50%,#F6F8EE_100%)]">
        <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-4 py-6 text-center sm:py-7">
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FEF3C7] ring-4 ring-[#FEF3C7]/60">
            <Clock className="h-[28px] w-[28px] text-[#B45309]" strokeWidth={1.9} />
          </div>
          <h1 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.01em] text-[#92400E] sm:text-[30px]">
            Payment Pending
          </h1>
          <p className="mt-1 text-[13.5px] font-medium text-[#573B1A] sm:text-[15px]">
            Your order is awaiting payment confirmation from your bank or UPI app.
          </p>
          <p className="mt-1.5 flex items-center gap-[12px] text-[12.5px] font-medium text-[#666] sm:text-[13.5px]">
            <span className="hidden h-px w-[50px] bg-[#C9A640] sm:block" />
            <span>Please do not close this page while we verify automatically.</span>
            <span className="hidden h-px w-[50px] bg-[#C9A640] sm:block" />
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-[18px] sm:px-6 lg:px-12">
        <div className="grid items-start gap-[16px] lg:grid-cols-[952fr_477fr] lg:gap-[20px]">
          {/* Left */}
          <div className="flex min-w-0 flex-col gap-[14px]">
            <div className="grid gap-y-3 rounded-[14px] border border-[#EFE2BD] bg-[#FFFDF7] px-[16px] py-[12px] shadow-[0_2px_8px_rgba(180,83,9,0.06)] sm:grid-cols-[1.3fr_1fr_1fr] sm:px-0">
              <div className="flex items-center gap-[12px] sm:px-[18px]">
                <ShoppingBag className="h-[22px] w-[22px] shrink-0 text-[#B45309]" strokeWidth={1.6} />
                <div className="min-w-0 leading-tight">
                  <span className="block text-[11.5px] font-medium text-[#666]">Order Number</span>
                  <span className="block break-all text-[14px] font-semibold leading-snug text-[#0A3314] sm:text-[14.5px]">{order.orderNumber}</span>
                </div>
              </div>
              <div className="flex items-center gap-[12px] sm:border-l sm:border-[#E8D5A3] sm:px-[18px]">
                <Calendar className="h-[22px] w-[22px] shrink-0 text-[#B45309]" strokeWidth={1.6} />
                <div className="leading-tight">
                  <span className="block text-[11.5px] font-medium text-[#666]">Created On</span>
                  <span className="block text-[13px] font-medium text-[#222] sm:text-[13.5px]">{fmtFull(placed)}</span>
                </div>
              </div>
              <div className="flex items-center gap-[12px] sm:border-l sm:border-[#E8D5A3] sm:px-[18px]">
                <CreditCard className="h-[22px] w-[22px] shrink-0 text-[#B45309]" strokeWidth={1.6} />
                <div className="leading-tight">
                  <span className="block text-[11.5px] font-medium text-[#666]">Payment Status</span>
                  <span className="mt-[2px] inline-flex items-center gap-[5px] rounded-[6px] bg-[#FEF3C7] px-[8px] py-[2px] text-[12px] font-semibold text-[#B45309]">
                    <Loader2 className="h-[12px] w-[12px] animate-spin" /> Pending
                  </span>
                </div>
              </div>
            </div>

            <section className="rounded-[14px] border border-[#E8DEC3] bg-white p-[18px] shadow-[0_2px_8px_rgba(60,60,40,0.05)] sm:p-[22px]">
              <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[#92400E]">
                <Loader2 className={`h-5 w-5 ${checking ? "animate-spin" : ""}`} />
                Live Payment Verification
              </h2>
              <p className="mt-2 rounded-lg bg-[#FFFBEB] px-3.5 py-2.5 text-[13.5px] font-medium text-[#78350F]">
                {statusNote}
              </p>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DCE6D5] bg-[#F6FAF3] p-3.5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#14602A]" />
                <div className="text-[13px] leading-relaxed text-[#334433]">
                  <p className="font-semibold text-[#0A3314]">What happens next?</p>
                  <p className="mt-0.5">
                    If you approved the payment on your UPI / banking app, it will automatically redirect to your confirmed order page within a few seconds. If you cancelled before paying, click <strong>Complete Payment</strong> below.
                  </p>
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-700">
                  {error}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={checking}
                  onClick={() => void checkStatus()}
                  className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
                  style={{ background: BTN_GREEN }}
                >
                  <RefreshCw className={`h-4 w-4 ${checking ? "animate-spin" : ""}`} />
                  {checking ? "Checking Status…" : "Check Payment Status"}
                </button>

                {canRetry && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void completePayment()}
                    className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#14602A]/40 bg-white px-5 text-[13.5px] font-semibold text-[#0A3314] transition hover:bg-[#F3F8F2] disabled:opacity-60"
                  >
                    <CreditCard className="h-4 w-4" />
                    {busy ? "Opening…" : `Complete Payment (${rupees(order.total)})`}
                  </button>
                )}

                <Link
                  href="/products"
                  className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[10px] border border-[#D5D9D2] bg-white px-5 text-[13.5px] font-medium text-[#444] transition hover:bg-[#FAFAFA]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </section>
          </div>

          {/* Right: Order summary */}
          <aside className="rounded-[14px] border border-[#E5E8E0] bg-[#FAFBF7] p-[18px] shadow-[0_2px_8px_rgba(60,100,40,0.05)]">
            <h2 className="flex items-center justify-between text-[15.5px] font-semibold" style={{ color: GREEN }}>
              <span>Order Summary ({count} {count === 1 ? "Item" : "Items"})</span>
              <span className="text-[16px] font-bold">{rupees(order.total)}</span>
            </h2>
            <ul className="mt-3 divide-y divide-[#EAECE4]">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 py-2.5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#E5E8E0] bg-white">
                    <CmsImage src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-[#1A1A1A]">{item.title}</p>
                    <p className="text-[12px] text-[#666]">Qty: {item.qty} × {rupees(item.price)}</p>
                  </div>
                  <span className="text-[13px] font-semibold text-[#0A3314]">{rupees(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-[#E5E8E0] pt-3 text-[12.5px] text-[#555]">
              <p className="flex items-center gap-2 font-medium text-[#0A3314]">
                <Headset className="h-4 w-4 text-[#14602A]" /> Need help with your order?
              </p>
              <p className="mt-1">Call: <strong>{SUPPORT_PHONE}</strong></p>
              <p className="flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3.5 w-3.5" /> {SUPPORT_EMAIL}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
