"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  House,
  Info,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  TicketPercent,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { API_BASE } from "@/lib/api";
import { useCart, rupees } from "@/lib/cart";
import CmsImage from "@/components/common/CmsImage";
import { readLastOrderRaw, saveLastOrder } from "@/lib/lastOrder";
import { poppins } from "@/lib/fonts";

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: () => void) => void };
  }
}

const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

/** Loads Razorpay's checkout script; gives up after 15 s (blocked by an ad blocker, offline …) */
const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    // A failed earlier attempt leaves a dead tag behind: start clean
    document.querySelectorAll(`script[src="${RAZORPAY_SRC}"]`).forEach((el) => el.remove());
    const s = document.createElement("script");
    const timer = window.setTimeout(() => resolve(false), 15000);
    s.src = RAZORPAY_SRC;
    s.async = true;
    s.onload = () => {
      window.clearTimeout(timer);
      resolve(Boolean(window.Razorpay));
    };
    s.onerror = () => {
      window.clearTimeout(timer);
      resolve(false);
    };
    document.body.appendChild(s);
  });

/**
 * Local design preview: set NEXT_PUBLIC_PREVIEW_CHECKOUT=true in .env.local and "Proceed to Payment"
 * goes straight to the thank-you page without creating an order or taking payment.
 * Ignored in production builds, so it can never skip a real payment.
 */
const PREVIEW_MODE = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_PREVIEW_CHECKOUT === "true";

/* Palette sampled from the design */
const GREEN = "#0A3314";
/** Crisp 1px highlight under the banner text (no blurred halo behind it) */
const TEXT_GLOW = "0 1px 0 rgba(255,255,255,0.75)";
const GREEN_BTN = "linear-gradient(180deg,#0B5A22 0%,#074619 55%,#043A14 100%)";
const BORDER = "#DCE8D3";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];
const CITIES = [
  "Delhi", "New Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad", "Lucknow", "Kanpur", "Jaipur", "Mumbai", "Pune",
  "Ahmedabad", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Visakhapatnam", "Chandigarh", "Indore", "Bhopal", "Patna",
];

const STRIP = [
  { icon: ShieldCheck, a: "Secure &", b: "Encrypted Payments" },
  { icon: Truck, a: "Reliable &", b: "Fast Delivery" },
  { icon: Package, a: "Safe", b: "Packaging" },
  { icon: Leaf, a: "100% Genuine", b: "Ayurvedic Products" },
];

const inputBox =
  "flex h-[36px] items-center gap-[8px] rounded-[8px] border border-[#CFCFCF] bg-white px-[10px] text-[#6C6C6C] focus-within:border-[#0B5A22] focus-within:ring-1 focus-within:ring-[#0B5A22]/30";
const inputEl = "min-w-0 flex-1 bg-transparent text-[13px] text-[#111] outline-none placeholder:text-[#8A8A8A]";

/* eslint-disable @next/next/no-img-element -- small fixed-size design crops */

function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: ReactNode }) {
  return (
    <section className="rounded-[12px] border bg-white px-[14px] pb-[10px] pt-[8px] shadow-[0_2px_8px_rgba(60,100,40,0.06)]" style={{ borderColor: BORDER }}>
      <h2 className={`${poppins.className} flex items-center gap-[10px] text-[16.5px] font-semibold`} style={{ color: GREEN }}>
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[14.5px] font-bold text-white" style={{ background: "#074619" }}>
          {n}
        </span>
        <span>
          {title}
          {note && <span className="ml-1.5 text-[14px] font-normal text-[#555]">{note}</span>}
        </span>
      </h2>
      <div className="mt-[6px]">{children}</div>
    </section>
  );
}

function Label({ children, required = false, htmlFor }: { children: ReactNode; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-[2px] block text-[12.5px] font-bold text-[#1A1A1A]">
      {children}
      {required && <span className="text-[#D6362B]"> *</span>}
    </label>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, savings, count, clear, setQty, remove } = useCart();
  const [f, setF] = useState({ name: "", mobile: "", email: "", line1: "", city: "", state: "", pincode: "", notes: "" });
  const [delivery, setDelivery] = useState<"home" | "same">("home");
  const [agree, setAgree] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [couponBusy, setCouponBusy] = useState(false);
  const couponOff = coupon ? Math.min(coupon.discount, subtotal) : 0;
  const payable = Math.max(0, subtotal - couponOff);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const post = async (path: string, body: unknown) => {
    // Never leave the button stuck on "Please wait…": give up after 25 s
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 25000);
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/website/orders${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
    } catch {
      throw new Error("Could not reach our server. Please check your internet connection and try again.");
    } finally {
      window.clearTimeout(timer);
    }
    const json = await res.json().catch(() => null);
    if (!res.ok) throw new Error(json?.errors?.[0] || json?.message || "Something went wrong. Please try again.");
    return json.data;
  };

  const lines = items.map((i) => ({ id: i.id, qty: i.qty }));
  const cartKey = lines.map((l) => `${l.id}:${l.qty}`).join(",");

  const quote = async (code: string) => {
    setCouponBusy(true);
    try {
      const q = await post("/coupon", { code, items: lines });
      setCoupon({ code: q.code, discount: q.discount });
      setCouponInput(q.code);
      setCouponMsg(`Coupon applied: you save ${rupees(q.discount)}.`);
    } catch (err) {
      setCoupon(null);
      setCouponMsg(err instanceof Error ? err.message : "This coupon code is not valid.");
    } finally {
      setCouponBusy(false);
    }
  };
  const applyCode = () => {
    if (couponInput.trim() && !couponBusy) void quote(couponInput.trim());
  };
  const removeCode = () => {
    setCoupon(null);
    setCouponInput("");
    setCouponMsg("");
  };

  // Cart changed while a coupon is applied: ask the server again so the discount stays exact
  const quotedFor = useRef("");
  useEffect(() => {
    if (!coupon) {
      quotedFor.current = cartKey;
      return;
    }
    if (quotedFor.current === cartKey || !cartKey) return;
    quotedFor.current = cartKey;
    void quote(coupon.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-quote only when the cart itself changes
  }, [cartKey]);

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !items.length) return;
    setError("");
    setBusy(true);
    if (PREVIEW_MODE) {
      // Design preview only: no order is created and no money is taken
      saveLastOrder({
        orderNumber: `VDS-PREVIEW-${Date.now().toString(36).toUpperCase()}`,
        placedAt: new Date().toISOString(),
        total: payable,
        savings: savings + couponOff,
        items: items.map((i) => ({ title: i.title, image: i.image, qty: i.qty, price: i.price, mrp: i.mrp })),
      });
      const number = readLastOrderRaw() && JSON.parse(readLastOrderRaw()).orderNumber;
      clear();
      router.push(`/order-success?o=${encodeURIComponent(number)}`);
      return;
    }
    try {
      if (!(await loadRazorpay())) {
        throw new Error("The Razorpay payment window could not load. Please turn off any ad blocker for this site, check your internet, and try again.");
      }
      const mobile = `+91${f.mobile.replace(/\D/g, "").slice(-10)}`;
      const order = await post("", {
        customer: { name: f.name, mobile, email: f.email },
        address: { line1: f.line1, city: f.city, state: f.state, pincode: f.pincode },
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
        ...(f.notes.trim() ? { notes: f.notes.trim() } : {}),
        ...(coupon ? { couponCode: coupon.code } : {}),
      });
      const rz = new window.Razorpay!({
        key: order.razorpay.keyId,
        amount: order.razorpay.amount,
        currency: order.razorpay.currency,
        order_id: order.razorpay.orderId,
        name: "The Vaidhyashala",
        description: `Order ${order.orderNumber}`,
        prefill: { name: f.name, email: f.email, contact: mobile },
        theme: { color: "#0D382B" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const done = await post("/verify", { orderId: order.orderId, ...r });
            saveLastOrder({
              orderNumber: done.orderNumber,
              placedAt: new Date().toISOString(),
              total: done.total,
              // Product discounts plus the coupon, so the summary adds up to what was paid
              savings: savings + (order.couponDiscount ?? 0),
              items: items.map((i) => ({ title: i.title, image: i.image, qty: i.qty, price: i.price, mrp: i.mrp })),
            });
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
    <div className={`${poppins.className} w-full bg-white text-[#1A1A1A]`}>
      {/* ============ Banner ============ */}
      <div className="w-full bg-[#EEF4D6]">
      <div className="relative h-[136px] w-full max-w-[1440px] overflow-hidden bg-[url(/checkout-v2/banner-bg.jpg)] bg-[length:100%_100%] bg-center sm:h-[170px]">
        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <p className={`${poppins.className} text-[20px] font-normal leading-tight sm:text-[27px]`} >
            Pure Ayurveda for a <b className="font-bold italic">Healthier You</b>
          </p>
          <p className="mt-0.5 flex items-center gap-3 text-[12px] text-[#222] sm:mt-1 sm:text-[14.5px]" style={{ textShadow: TEXT_GLOW }}>
            <span className="hidden h-px w-[60px] bg-[#C9A640] sm:block" />
            Authentic <span className="text-[#555]">|</span> Natural <span className="text-[#555]">|</span> Effective
            <span className="hidden h-px w-[60px] bg-[#C9A640] sm:block" />
          </p>
        </div>
      </div>
      </div>

      <div className="mx-auto min-h-[40vh] max-w-[1440px] px-4 pb-4 pt-2 sm:pt-3 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex h-[28px] items-center gap-[10px] text-[13px]">
          <House className="h-[17px] w-[17px]" strokeWidth={1.9} />
          <Link href="/" className="hover:text-[#0B5A22]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-bold">Checkout</span>
        </nav>

        {/* Title */}
        <div className="mt-2 flex items-center gap-[12px]">
          <ShoppingCart className="h-[34px] w-[38px] shrink-0 text-[#0A5A22]" strokeWidth={1.7} />
          <div className="min-w-0">
            <div className="flex items-center gap-[14px]">
              <h1 className={`${poppins.className} text-[28px] font-medium leading-tight tracking-[-0.01em]`} style={{ color: GREEN }}>Checkout</h1>
              <span className="hidden h-[2px] w-[240px] bg-[linear-gradient(90deg,#7FA96B,rgba(127,169,107,0))] sm:block" />
            </div>
            <p className="mt-1 text-[14px] leading-snug text-[#4A4A4A]">
              Complete your order, add delivery details and <span className="font-semibold text-[#222]">proceed</span> to secure payment.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-[15px]">
            Your cart is empty. <Link href="/products" className="font-semibold underline">Browse products</Link>
          </p>
        ) : (
          <form onSubmit={pay} className="mt-[8px] grid grid-cols-1 items-start gap-[12px] lg:grid-cols-[692fr_461fr] lg:items-stretch xl:grid-cols-[692fr_461fr_303fr]">
            {/* ================= Left: details ================= */}
            <div className="flex flex-col gap-[8px]">
              <Section n={1} title="Contact Information">
                <div className="grid gap-[10px] sm:grid-cols-3">
                  <div>
                    <Label required htmlFor="co-name">Full Name</Label>
                    <div className={inputBox}>
                      <User className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                      <input id="co-name" required className={inputEl} placeholder="Enter your full name" value={f.name} onChange={set("name")} maxLength={100} autoComplete="name" />
                    </div>
                  </div>
                  <div>
                    <Label required htmlFor="co-email">Email Address</Label>
                    <div className={inputBox}>
                      <Mail className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                      <input id="co-email" required type="email" className={inputEl} placeholder="Enter your email address" value={f.email} onChange={set("email")} maxLength={200} autoComplete="email" />
                    </div>
                  </div>
                  <div>
                    <Label required htmlFor="co-mobile">Mobile Number</Label>
                    <div className={inputBox}>
                      <Phone className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                      <span className="text-[14px] font-bold text-[#111]">+91</span>
                      <input
                        id="co-mobile"
                        required
                        className={inputEl}
                        placeholder="10-digit number"
                        value={f.mobile}
                        onChange={(e) => setF((v) => ({ ...v, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                        inputMode="numeric"
                        pattern="[6-9]\d{9}"
                        title="Enter a 10-digit mobile number"
                        autoComplete="tel-national"
                      />
                    </div>
                  </div>
                </div>
              </Section>

              <Section n={2} title="Delivery Address">
                <div className="grid gap-[12px] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-[24px]">
                  <div>
                    <Label required htmlFor="co-pin">PIN Code</Label>
                    <div className={inputBox}>
                        <MapPin className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                        <input
                          id="co-pin"
                          required
                          className={inputEl}
                          placeholder="Enter 6-digit PIN code"
                          value={f.pincode}
                          onChange={(e) => setF((v) => ({ ...v, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                          inputMode="numeric"
                          pattern="[1-9]\d{5}"
                          title="Enter a 6-digit PIN code"
                          autoComplete="postal-code"
                        />
                    </div>
                  </div>
                  <div role="radiogroup" aria-label="Delivery type" className="flex flex-wrap items-center gap-x-[20px] gap-y-1 pb-[8px] text-[12.5px] text-[#1A1A1A] sm:flex-nowrap sm:whitespace-nowrap">
                    {([["home", "Home / Office Delivery"], ["same", "Same as Contact"]] as const).map(([k, label]) => (
                      <label key={k} className="flex cursor-pointer items-center gap-[8px]">
                        <input type="radio" name="delivery" checked={delivery === k} onChange={() => setDelivery(k)} className="peer sr-only" />
                        <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-[#B8B8B8] peer-checked:border-[#074619] peer-focus-visible:ring-2 peer-focus-visible:ring-[#074619]/40 [&>i]:scale-0 peer-checked:[&>i]:scale-100">
                          <i className="h-[10px] w-[10px] rounded-full bg-[#074619] transition-transform" />
                        </span>
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-[6px]">
                  <Label required htmlFor="co-address">Address</Label>
                  <div className={inputBox}>
                    <House className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                    <input id="co-address" required className={inputEl} placeholder="House / Flat No., Building, Street, Area" value={f.line1} onChange={set("line1")} maxLength={200} autoComplete="address-line1" />
                  </div>
                </div>

                <div className="mt-[6px] grid gap-[10px] sm:grid-cols-2">
                  <div>
                    <Label required htmlFor="co-city">City / Town</Label>
                    <div className={inputBox}>
                      <Building2 className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                      <input id="co-city" required list="co-cities" className={inputEl} placeholder="Select city / town" value={f.city} onChange={set("city")} maxLength={100} autoComplete="address-level2" />
                      <datalist id="co-cities">{CITIES.map((c) => <option key={c} value={c} />)}</datalist>
                      <ChevronDown className="h-[18px] w-[18px] shrink-0 text-[#111]" />
                    </div>
                  </div>
                  <div>
                    <Label required htmlFor="co-state">State</Label>
                    <div className={`${inputBox} relative`}>
                      <MapPin className="h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                      <select id="co-state" required className={`${inputEl} appearance-none ${f.state ? "" : "text-[#8A8A8A]"}`} value={f.state} onChange={set("state")} autoComplete="address-level1">
                        <option value="">Select state</option>
                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none h-[18px] w-[18px] shrink-0 text-[#111]" />
                    </div>
                  </div>
                </div>
              </Section>

              <Section n={3} title="Order Notes" note="(Optional)">
                <div className="flex items-start gap-[10px] rounded-[8px] border border-[#CFCFCF] bg-white px-[10px] py-[7px] focus-within:border-[#0B5A22] focus-within:ring-1 focus-within:ring-[#0B5A22]/30">
                  <FileText className="mt-[2px] h-[19px] w-[19px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
                  <textarea
                    aria-label="Order notes"
                    rows={1}
                    maxLength={500}
                    className={`${inputEl} resize-none`}
                    placeholder="Any special instructions for delivery (e.g., preferred time, landmark, etc.)"
                    value={f.notes}
                    onChange={set("notes")}
                  />
                </div>
              </Section>

              <ul className="mt-[0px] grid grid-cols-2 gap-y-2 rounded-[10px] bg-[#F1F8E6] px-[12px] py-[7px] sm:grid-cols-4">
                {STRIP.map(({ icon: Icon, a, b }, i) => (
                  <li key={a} className={`flex items-center gap-[10px] ${i ? "sm:border-l sm:border-[#D3E2C6] sm:pl-[8px]" : ""}`}>
                    <Icon className="h-[26px] w-[26px] shrink-0 text-[#1F5F2A]" strokeWidth={1.5} />
                    <span className="whitespace-nowrap text-[11.5px] leading-[15px] text-[#222]">{a}<br />{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= Middle: summary ================= */}
            <div className="flex flex-col overflow-hidden rounded-[14px] border bg-white shadow-[0_3px_12px_rgba(60,100,40,0.12)] lg:[contain:size]" style={{ borderColor: BORDER }}>
              <h2 className={`${poppins.className} flex h-[44px] items-center gap-[12px] px-[16px] text-[18px] font-semibold text-white`} style={{ background: "linear-gradient(90deg,#063E19,#004A17 55%,#004016)" }}>
                <ShoppingBag className="h-[24px] w-[24px]" strokeWidth={1.7} />
                <span>Order Summary <span className="text-[15px] font-normal">({count} {count === 1 ? "Item" : "Items"})</span></span>
              </h2>

              <ul className="px-[12px] lg:min-h-[64px] lg:flex-1 lg:overflow-y-auto">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-[12px] border-b border-[#E7EEE0] py-[7px]">
                    <span className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[8px] bg-[#FBF3E6]">
                      <CmsImage fill sizes="56px" src={i.image} alt="" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1 leading-[1.25]">
                      <b className="block truncate text-[13.5px] font-semibold text-[#111]">{i.title}</b>
                      {i.subtitle && <span className="block truncate text-[11.5px] text-[#444]">{i.subtitle}</span>}
                      {i.size && <span className="block text-[11.5px] text-[#444]">{i.size}</span>}
                    </span>
                    <span className="inline-flex h-[26px] shrink-0 items-center rounded-[7px] border border-[#BFD3B4] bg-white">
                      <button type="button" aria-label={`Decrease ${i.title}`} onClick={() => setQty(i.id, i.qty - 1)} className="flex h-full items-center px-[7px] text-[#111]"><Minus className="h-[13px] w-[13px]" strokeWidth={2.6} /></button>
                      <span className="min-w-[18px] text-center text-[13.5px] font-bold">{i.qty}</span>
                      <button type="button" aria-label={`Increase ${i.title}`} onClick={() => setQty(i.id, i.qty + 1)} className="flex h-full items-center px-[7px] text-[#0B5A22]"><Plus className="h-[13px] w-[13px]" strokeWidth={2.6} /></button>
                    </span>
                    <b className="w-[62px] shrink-0 text-right text-[15px] font-bold text-[#111]">{rupees(i.price * i.qty)}</b>
                    <button type="button" aria-label={`Remove ${i.title}`} onClick={() => remove(i.id)} className="shrink-0 text-[#0B5A22] hover:text-[#B3402D]">
                      <Trash2 className="h-[19px] w-[19px]" strokeWidth={1.8} />
                    </button>
                  </li>
                ))}
              </ul>

              <dl className="px-[12px] pt-[4px] text-[13px] text-[#222]">
                <div className="flex justify-between border-b border-[#EEF2EA] py-[4px]"><dt>Subtotal ({count} {count === 1 ? "Item" : "Items"})</dt><dd className="font-semibold">{rupees(subtotal)}</dd></div>
                <div className="flex justify-between border-b border-[#EEF2EA] py-[4px]"><dt>Delivery Charges</dt><dd className="font-semibold text-[#2C7A32]">Free</dd></div>
                {coupon && (
                  <div className="flex justify-between py-[4px]">
                    <dt>Discount <span className="text-[#2C7A32]">(Coupon: {coupon.code})</span></dt>
                    <dd className="font-semibold text-[#2C7A32]">− {rupees(couponOff)}</dd>
                  </div>
                )}
              </dl>
              <div className="mx-[8px] mt-[2px] flex items-center justify-between rounded-[8px] bg-[#EAF4D6] px-[10px] py-[3px]">
                <span className="flex items-baseline gap-2">
                  <b className={`${poppins.className} text-[15.5px] font-semibold`} style={{ color: GREEN }}>Total Payable</b>
                  <span className="text-[11px] text-[#333]">(Inclusive of all taxes)</span>
                </span>
                <b className={`${poppins.className} text-[19px] font-bold leading-tight`} style={{ color: "#003000" }}>{rupees(payable)}</b>
              </div>

              {/* Coupon: the server checks the code and works out the discount, and charges that amount */}
              <div className="mx-[8px] mt-[6px] rounded-[10px] border border-[#E3E8DE] bg-[#FCFDFB] px-[10px] pb-[7px] pt-[5px]">
                <label htmlFor="co-coupon" className="flex items-center gap-[8px] text-[12.5px] font-semibold text-[#111]">
                  <TicketPercent className="h-[17px] w-[17px] text-[#0B5A22]" strokeWidth={1.8} />
                  Apply Coupon Code
                </label>
                <div className="mt-[4px] flex gap-[8px]">
                  <div className={`${inputBox} !h-[32px] min-w-0 flex-1`}>
                    <input
                      id="co-coupon"
                      className={`${inputEl} uppercase placeholder:normal-case`}
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase().replace(/\s/g, "").slice(0, 30));
                        setCouponMsg("");
                        if (coupon) setCoupon(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyCode();
                        }
                      }}
                      autoComplete="off"
                    />
                    {coupon && <Check className="h-[18px] w-[18px] shrink-0 text-[#2C8A2C]" strokeWidth={2.6} aria-label="Coupon applied" />}
                  </div>
                  <button
                    type="button"
                    onClick={coupon ? removeCode : applyCode}
                    disabled={couponBusy || (!coupon && !couponInput)}
                    className="h-[32px] w-[92px] shrink-0 rounded-[8px] text-[13.5px] font-semibold text-white shadow-[0_2px_5px_rgba(4,58,20,0.3)] hover:brightness-110 disabled:opacity-60"
                    style={{ background: GREEN_BTN }}
                  >
                    {couponBusy ? "…" : coupon ? "Remove" : "Apply"}
                  </button>
                </div>
                {couponMsg && <p role="status" className={`mt-[3px] text-[11.5px] ${coupon ? "text-[#2C7A32]" : "text-[#B3402D]"}`}>{couponMsg}</p>}
              </div>

              <label className="mx-[12px] mt-[7px] flex cursor-pointer items-center gap-[8px] text-[12px] text-[#222]">
                <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} className="peer sr-only" />
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border-2 border-[#074619] text-white peer-checked:bg-[#074619] peer-focus-visible:ring-2 peer-focus-visible:ring-[#074619]/40 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                  <svg viewBox="0 0 12 12" className="h-[12px] w-[12px]" aria-hidden><path d="M2.2 6.3l2.6 2.5 5-5.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span>
                  I agree to the <Link href="/terms" className="text-[#1F7A2E] underline">Terms &amp; Conditions</Link> and <Link href="/privacy" className="text-[#1A1A1A] underline">Privacy Policy</Link>.
                </span>
              </label>

              {error && <p role="alert" className="mx-[12px] mt-3 rounded-md bg-[#FBEDEA] px-3 py-2 text-[13px] font-medium text-[#B3402D]">{error}</p>}

              <div className="px-[10px] pb-[6px] pt-[7px]">
                <button
                  type="submit"
                  disabled={busy || couponBusy}
                  className="flex h-[40px] w-full items-center justify-center gap-[12px] rounded-[10px] text-[15px] font-semibold text-white shadow-[0_3px_8px_rgba(4,58,20,0.35)] transition-[filter] hover:brightness-110 disabled:opacity-60"
                  style={{ background: GREEN_BTN }}
                >
                  <Lock className="h-[20px] w-[20px]" strokeWidth={1.8} />
                  <span>{busy ? "Please wait…" : "Proceed to Payment"}</span>
                  {!busy && (
                    <>
                      <span className="h-[22px] w-px bg-white/50" />
                      <span>{rupees(payable)}</span>
                      <ArrowRight className="h-[20px] w-[20px]" strokeWidth={2.2} />
                    </>
                  )}
                </button>
                <p className="mt-[3px] text-center text-[10.5px] leading-tight text-[#777]">{PREVIEW_MODE ? "Preview mode: no payment is taken" : "Secure payment by Razorpay (UPI, cards, netbanking)"}</p>
              </div>
            </div>

            {/* ================= Right: guidelines ================= */}
            <aside className="flex flex-col gap-[8px] lg:col-span-2 lg:grid lg:grid-cols-2 xl:col-span-1 xl:flex xl:[contain:size]">
              <div className="overflow-hidden rounded-[14px] border bg-white shadow-[0_2px_8px_rgba(60,100,40,0.08)]" style={{ borderColor: BORDER }}>
                <h2 className={`${poppins.className} flex items-center gap-[8px] bg-[#E9F1E3] px-[14px] py-[8px] text-[15px] font-semibold`} style={{ color: GREEN }}>
                  <Info className="h-[26px] w-[26px] shrink-0" strokeWidth={1.5} />
                  Checkout Guidelines
                </h2>
                <ul className="px-[12px] py-[2px]">
                  {[
                    { icon: ShoppingCart, t: "Review your products & quantity." },
                    { icon: MapPin, t: "Enter a valid 6-digit PIN code for delivery availability." },
                    { icon: Truck, t: "Provide a complete & correct delivery address." },
                    { icon: CreditCard, t: "Choose a secure payment method and place your order." },
                  ].map(({ icon: Icon, t }, i) => (
                    <li key={t} className={`flex items-center gap-[10px] py-[6px] ${i ? "border-t border-[#EDEDED]" : ""}`}>
                      <Icon className="h-[26px] w-[28px] shrink-0 text-[#1F5F2A]" strokeWidth={1.5} />
                      <span className="text-[12.5px] leading-[16px] text-[#222]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[14px] border bg-white shadow-[0_2px_8px_rgba(60,100,40,0.08)] xl:min-h-[0px]" style={{ borderColor: BORDER }}>
                <h2 className={`${poppins.className} flex items-center gap-[10px] px-[12px] pt-[10px] text-[15px] font-semibold leading-tight`} style={{ color: GREEN }}>
                  <img src="/checkout-v2/leaf.png" alt="" className="h-[28px] w-[30px] shrink-0 object-contain mix-blend-multiply" />
                  Why Shop at Vaidhyashala?
                </h2>
                <ul className="relative z-[1] px-[14px] pb-[110px] pt-[4px] xl:pb-[8px]">
                  {["Authentic Ayurvedic Formulations", "High-Quality, Natural Ingredients", "Safe & Trusted for Daily Use", "Secure & Multiple Payment Options", "Reliable & On-Time Delivery"].map((t) => (
                    <li key={t} className="flex items-center gap-[10px] py-[4px]">
                      <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#9FD356,#3D9A2B)]">
                        <svg viewBox="0 0 12 12" className="h-[12px] w-[12px] text-white" aria-hidden><path d="M2.2 6.3l2.6 2.5 5-5.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="text-[12.5px] leading-tight text-[#222]">{t}</span>
                    </li>
                  ))}
                </ul>
                <img src="/checkout-v2/mortar.png" alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[80%] max-w-[250px] object-contain xl:w-[44%] mix-blend-multiply [mask-image:linear-gradient(180deg,transparent_0%,#000_22%),linear-gradient(90deg,transparent_0%,#000_18%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_22%),linear-gradient(90deg,transparent_0%,#000_18%)]" />
              </div>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}
