"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Check,
  CreditCard,
  Download,
  Headset,
  Info,
  Leaf,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from "lucide-react";
import CmsImage from "@/components/common/CmsImage";
import { poppins } from "@/lib/fonts";
import { parseLastOrder, readLastOrderRaw, subscribeLastOrder } from "@/lib/lastOrder";
import { rupees } from "@/lib/cart";

/** Shown in the support strip: change here if the clinic's contact details change. */
const SUPPORT_PHONE = "+91 98119 79147";
const SUPPORT_EMAIL = "care@vaidhyashala.com";
/** Matches the "Fast Delivery (2–5 Days)" promise on the product page. */
const DELIVERY_DAYS = 5;

const GREEN = "#0A3314";
const PANEL = "linear-gradient(180deg,#F3F6EF 0%,#F8FBF4 100%)";
const BTN_GREEN = "linear-gradient(180deg,#0B5A22 0%,#074619 55%,#043A14 100%)";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const time = (d: Date) => {
  const h = d.getHours();
  return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};
const fmtShort = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]}, ${time(d)}`;
const fmtFull = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${time(d)}`;
const fmtDay = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

/* eslint-disable @next/next/no-img-element -- small fixed-size design crops */

function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden bg-[linear-gradient(90deg,#F5F5EB_0%,#FBFBF9_35%,#FBFBF9_65%,#F2F6E8_100%)]">
      <img src="/success-v2/banner-left.png" alt="" aria-hidden className="pointer-events-none absolute left-0 top-0 hidden h-full w-auto max-w-[24%] object-cover object-left md:block [mask-image:linear-gradient(90deg,#000_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,#000_55%,transparent_100%)]" />
      <img src="/success-v2/banner-right.png" alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto max-w-[30%] object-cover object-right md:block [mask-image:linear-gradient(270deg,#000_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(270deg,#000_70%,transparent_100%)]" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-4 py-5 text-center sm:py-6">{children}</div>
    </div>
  );
}

export default function OrderSuccessView() {
  const asked = (useSearchParams().get("o") || "").slice(0, 40);
  // null on the server and during hydration: the saved order only exists in this browser
  const raw = useSyncExternalStore(subscribeLastOrder, readLastOrderRaw, () => null);
  const order = useMemo(() => (raw === null ? undefined : parseLastOrder(raw)), [raw]);

  if (order === undefined) return <div className="min-h-[60vh] bg-white" aria-busy="true" />;

  // Only this browser's own just-paid order is shown as paid: a made-up ?o= number proves nothing
  if (!order || (asked && order.orderNumber !== asked)) {
    return (
      <div className={`${poppins.className} flex min-h-[55vh] flex-col items-center justify-center gap-3 bg-white px-4 text-center text-[#1A1A1A]`}>
        <h1 className={`${poppins.className} text-[28px] font-bold`} style={{ color: GREEN }}>We couldn&apos;t load your order details</h1>
        {asked && <p className="text-[15px]">Order number: <b>{asked}</b></p>}
        <p className="max-w-md text-[14px] text-[#555]">
          If you completed a payment, a confirmation email is on its way. For any help, contact us at {SUPPORT_PHONE} or {SUPPORT_EMAIL}.
        </p>
        <Link href="/products" className="mt-2 rounded-lg px-6 py-3 text-[14px] font-bold text-white" style={{ background: BTN_GREEN }}>Continue shopping</Link>
      </div>
    );
  }

  const placed = new Date(order.placedAt);
  const eta = new Date(placed.getTime() + DELIVERY_DAYS * 86400000);
  const count = order.items.reduce((n, i) => n + i.qty, 0);
  const itemsLabel = `${count} ${count === 1 ? "Item" : "Items"}`;
  const subtotal = order.total + order.savings;

  const steps = [
    { title: "Order Placed", sub: fmtShort(placed), done: true },
    { title: "Processing", sub: "Packing your order" },
    { title: "Dispatched", sub: "On the way to you" },
    { title: "Out for Delivery", sub: "Expected Soon" },
    { title: "Delivered", sub: `Estimated by\n${fmtDay(eta)}` },
  ];

  const outline =
    "inline-flex h-[40px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-[#14602A] bg-white px-[16px] text-[14px] font-medium text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#F3F8F2]";

  return (
    <div className={`${poppins.className} w-full bg-white text-[#1A1A1A]`}>
      {/* ============ Thank-you banner ============ */}
      <Banner>
        <img src="/success-v2/badge.png" alt="" className="h-[58px] w-[62px] object-contain mix-blend-multiply" />
        <h1 className={`${poppins.className} mt-[6px] text-[28px] font-semibold leading-tight sm:text-[36px]`} style={{ color: GREEN }}>
          Thank You for Your Order!
        </h1>
        <p className="mt-[4px] text-[15px] text-[#1E1E1E] sm:text-[17px]">Your order has been placed successfully.</p>
        <p className="mt-[6px] flex items-center gap-[14px] text-[14px] text-[#333] sm:text-[16px]">
          <span className="hidden h-px w-[56px] bg-[#C9A640] sm:block" />
          <span>We truly appreciate your trust in <b className="font-semibold text-[#444]">Vaidhyashala.</b></span>
          <span className="hidden h-px w-[56px] bg-[#C9A640] sm:block" />
        </p>
      </Banner>

      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-[16px] sm:px-6 lg:px-12">
        <div className="grid items-start gap-[16px] lg:grid-cols-[952fr_477fr] lg:items-stretch lg:gap-[22px]">
          {/* ================= Left ================= */}
          <div className="flex min-w-0 flex-col gap-[14px]">
            {/* Order facts */}
            <div className="grid gap-y-3 rounded-[14px] border border-[#EAEEE4] px-[16px] py-[14px] shadow-[0_2px_8px_rgba(60,100,40,0.06)] sm:grid-cols-[1.3fr_1fr_1fr] sm:px-0 sm:py-[12px]" style={{ background: PANEL }}>
              <div className="flex items-center gap-[14px] sm:px-[20px]">
                <Truck className="h-[28px] w-[30px] shrink-0 text-[#14602A]" strokeWidth={1.6} />
                <div className="min-w-0 leading-tight">
                  <span className="block text-[12px] text-[#555]">Order Number</span>
                  <b className={`${poppins.className} block break-all text-[15.5px] font-semibold leading-snug`} style={{ color: "#0B5A22" }}>{order.orderNumber}</b>
                </div>
              </div>
              <div className="flex items-center gap-[14px] sm:border-l sm:border-[#B9C8B0] sm:px-[20px]">
                <Calendar className="h-[26px] w-[28px] shrink-0 text-[#14602A]" strokeWidth={1.6} />
                <div className="leading-tight">
                  <span className="block text-[12px] text-[#555]">Order Date</span>
                  <span className="block text-[14px] font-medium text-[#111]">{fmtFull(placed)}</span>
                </div>
              </div>
              <div className="flex items-center gap-[14px] sm:border-l sm:border-[#B9C8B0] sm:px-[20px]">
                <CreditCard className="h-[26px] w-[30px] shrink-0 text-[#14602A]" strokeWidth={1.6} />
                <div className="leading-tight">
                  <span className="block text-[12px] text-[#555]">Payment Status</span>
                  <span className="mt-[3px] inline-flex items-center gap-[6px] rounded-[6px] bg-[#C7EBB6] px-[8px] py-[2px] text-[12.5px] font-medium text-[#14602A]">
                    <Check className="h-[14px] w-[14px]" strokeWidth={3} /> Paid Successfully
                  </span>
                </div>
              </div>
            </div>

            {/* Track your order */}
            <section id="track-order" aria-labelledby="track-title" className="rounded-[14px] border border-[#D5D9D2] bg-white px-[16px] pb-[14px] pt-[12px] shadow-[0_2px_8px_rgba(60,100,40,0.06)] sm:px-[22px]">
              <h2 id="track-title" className={`${poppins.className} flex items-center gap-[12px] text-[18px] font-semibold text-[#111]`}>
                <Truck className="h-[26px] w-[30px] text-[#14602A]" strokeWidth={1.6} />
                Track Your Order
              </h2>
              <ol className="mt-[12px] grid grid-cols-2 gap-y-5 sm:grid-cols-5 sm:gap-y-0">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative flex flex-col items-center text-center">
                    {/* connector to the next step */}
                    {i < steps.length - 1 && (
                      <span aria-hidden className={`absolute left-1/2 top-[14px] hidden h-[3px] w-full sm:block ${s.done ? "bg-[#205D24]" : "bg-[#C4C4C4]"}`} />
                    )}
                    <span
                      className={`relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] ${s.done ? "border-[#205D24] bg-[#14602A]" : "border-[#BDBDBD] bg-white"}`}
                    >
                      {s.done && <Check className="h-[16px] w-[16px] text-white" strokeWidth={3.4} />}
                    </span>
                    <b className={`mt-[6px] text-[13.5px] ${s.done ? "font-semibold text-[#111]" : "font-medium text-[#222]"}`}>{s.title}</b>
                    <span className="mt-[1px] whitespace-pre-line text-[11.5px] leading-[16px] text-[#666]">{s.sub}</span>
                  </li>
                ))}
              </ol>

              {/* What's next */}
              <div className="relative mt-[14px] overflow-hidden rounded-[12px] px-[18px] py-[12px]" style={{ background: "linear-gradient(90deg,#F4FAEE 0%,#EAF3E0 60%,#DDEBC9 100%)" }}>
                <h3 className={`${poppins.className} flex items-center gap-[10px] text-[16px] font-semibold text-[#111]`}>
                  <Info className="h-[21px] w-[21px]" strokeWidth={1.7} /> What&apos;s Next?
                </h3>
                <ul className="mt-[6px] space-y-[6px] pr-0 text-[13.5px] leading-[19px] text-[#1A1A1A] sm:pr-[170px]">
                  {[
                    "You will receive an order confirmation email with your order details.",
                    "Our team will contact you shortly to confirm delivery.",
                    `Keep your order number (${order.orderNumber}) handy for any queries.`,
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-[10px]">
                      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#B5DB92,#6FAE4A)]">
                        <Check className="h-[12px] w-[12px] text-white" strokeWidth={3.4} />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <img src="/success-v2/box.png" alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-[8px] hidden h-[110px] w-auto mix-blend-multiply sm:right-[20px] sm:block sm:h-[118px] [mask-image:radial-gradient(ellipse_62%_62%_at_50%_50%,#000_62%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_62%_62%_at_50%_50%,#000_62%,transparent_100%)]" />
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap gap-[12px]">
              <a
                href="#track-order"
                className="inline-flex h-[40px] items-center justify-center gap-[8px] rounded-[8px] px-[22px] text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(4,58,20,0.3)] transition-[filter] hover:brightness-110"
                style={{ background: BTN_GREEN }}
              >
                <MapPin className="h-[18px] w-[18px]" strokeWidth={1.8} /> Track Order
              </a>
              <button type="button" onClick={() => window.print()} className={outline}>
                <Download className="h-[18px] w-[18px] text-[#14602A]" strokeWidth={1.8} /> Download Invoice
              </button>
              <Link href="/products" className={outline}>
                <ShoppingCart className="h-[18px] w-[18px] text-[#14602A]" strokeWidth={1.8} /> Continue Shopping
              </Link>
              <Link href="/contact" className={outline}>
                <Headset className="h-[18px] w-[18px] text-[#14602A]" strokeWidth={1.8} /> Need Help?
              </Link>
            </div>
          </div>

          {/* ================= Right: summary ================= */}
          <aside className="flex flex-col overflow-hidden rounded-[14px] border border-[#E3E5E4] shadow-[0_3px_12px_rgba(60,100,40,0.1)]" style={{ background: PANEL }}>
            <h2 className={`${poppins.className} flex items-center gap-[12px] px-[18px] py-[10px] text-[18px] font-semibold`} style={{ color: GREEN }}>
              <ShoppingBag className="h-[26px] w-[26px] text-[#14602A]" strokeWidth={1.6} />
              <span>Order Summary <span className="text-[14.5px] font-normal">({itemsLabel})</span></span>
            </h2>
            <div className="flex flex-1 flex-col bg-white px-[14px] pb-[12px] pt-[4px]">
              <ul className="flex-1">
                {order.items.map((i) => (
                  <li key={i.title} className="grid grid-cols-[44px_minmax(0,1fr)_auto_auto] items-center gap-x-[12px] border-b border-[#E7EBE3] py-[7px] text-[13.5px]">
                    <span className="relative h-[40px] w-[40px] overflow-hidden rounded-[6px] bg-[#FBF3E6]">
                      <CmsImage fill sizes="44px" src={i.image} alt="" className="object-cover" />
                    </span>
                    <b className="truncate text-[13.5px] font-semibold text-[#111]">{i.title}</b>
                    <span className="w-[52px] text-[12.5px] text-[#555]">Qty: {i.qty}</span>
                    <b className="w-[68px] text-right text-[14px] font-semibold text-[#111]">{rupees(i.price * i.qty)}</b>
                  </li>
                ))}
              </ul>
              <dl className="mt-[10px] text-[13.5px]">
                <div className="flex justify-between border-b border-[#EDEFEA] py-[4px]"><dt>Subtotal</dt><dd className="font-semibold">{rupees(subtotal)}</dd></div>
                <div className="flex justify-between border-b border-[#EDEFEA] py-[4px]"><dt>Delivery Charges</dt><dd className="font-semibold text-[#2C7A32]">Free</dd></div>
                {order.savings > 0 && (
                  <div className="flex justify-between py-[4px]"><dt>Discount</dt><dd className="font-semibold text-[#1F8A2B]">− {rupees(order.savings)}</dd></div>
                )}
              </dl>
              <div className="mt-[6px] flex items-center justify-between rounded-[8px] bg-[#E3F4C8] px-[12px] py-[6px]">
                <span className="flex items-baseline gap-2">
                  <b className={`${poppins.className} text-[16.5px] font-semibold`} style={{ color: "#14602A" }}>Total Paid</b>
                  <span className="text-[11px] text-[#333]">(Inclusive of all taxes)</span>
                </span>
                <b className={`${poppins.className} text-[21px] font-bold`} style={{ color: GREEN }}>{rupees(order.total)}</b>
              </div>
            </div>
          </aside>
        </div>

        {/* ============ Support strip ============ */}
        <ul className="mt-[18px] grid gap-y-4 rounded-[14px] px-[12px] py-[12px] sm:grid-cols-2 lg:grid-cols-5" style={{ background: "linear-gradient(90deg,#F4F7F0 0%,#F6F9F0 100%)" }}>
          {[
            { icon: Headset, a: "Dedicated Support", b: SUPPORT_PHONE },
            { icon: Mail, a: "Email Us", b: SUPPORT_EMAIL },
            { icon: Package, a: "Easy Returns", b: "As per our policy" },
            { icon: ShieldCheck, a: "Secure Payments", b: "100% Safe & Encrypted" },
            { icon: Leaf, a: "Authentic Products", b: "Ayurvedic & Natural" },
          ].map(({ icon: Icon, a, b }, i) => (
            <li key={a} className={`flex items-center gap-[10px] lg:justify-center lg:px-[10px] ${i ? "lg:border-l lg:border-[#B9C8B0]" : ""}`}>
              <Icon className="h-[30px] w-[30px] shrink-0 text-[#14602A]" strokeWidth={1.5} />
              <span className="min-w-0 leading-[18px]">
                <b className="block text-[13.5px] font-semibold text-[#111]">{a}</b>
                <span className="block break-words text-[12.5px] text-[#444]">{b}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
