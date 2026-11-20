"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CreditCard,
  FlaskConical,
  Headset,
  House,
  Leaf,
  ListChecks,
  MapPin,
  MessageCircleMore,
  Milk,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Stethoscope,
  Truck,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useCart, rupees } from "@/lib/cart";
import CmsImage from "@/components/common/CmsImage";
import PlanConsultationModal from "@/components/consultation/PlanConsultationModal";
import ProductUsageGuide from "@/components/products/ProductUsageGuide";
import ProductTestimonials from "@/components/products/ProductTestimonials";
import ProductExplore from "@/components/products/ProductExplore";
import { poppins } from "@/lib/fonts";
import { firstSentence, ingredients, netQuantity, productExtras, type BenefitIcon } from "@/lib/productExtras";

export interface ProductDetailViewProps {
  product?: {
    id?: string;
    title?: string;
    /** Category name as the admin wrote it, e.g. "Ayurvedic Preparations" */
    category?: string;
    categoryTag?: string;
    description?: string;
    productType?: string;
    packOptions?: string;
    availability?: string;
    price?: number;
    mrp?: number;
    slug?: string;
    productInfo?: string;
    directions?: string;
    usageNotes?: string;
    imageAlt?: string;
    /** Main image first, then the extra images */
    images?: string[];
  };
}

/* Palette sampled from the design */
const GREEN = "#0A3314";
const GREEN_BTN = "linear-gradient(180deg,#17732F 0%,#0D5F26 55%,#0B5924 100%)";
const GOLD_BTN = "linear-gradient(180deg,#FCCC47 0%,#F6BA1E 55%,#EBA900 100%)";

/* eslint-disable @next/next/no-img-element -- small fixed-size design crops */
function BenefitGlyph({ icon }: { icon: BenefitIcon }) {
  const crop = { digestion: "benefit1", bowel: "benefit2", detox: "benefit3" } as const;
  if (icon in crop) {
    return <img src={`/product-v2/${crop[icon as keyof typeof crop]}.png`} alt="" className="h-[44px] w-[51px] object-contain" />;
  }
  const Icon = icon === "doctor" ? Stethoscope : icon === "shield" ? ShieldCheck : Leaf;
  return <Icon className="h-[38px] w-[38px] text-[#2F7D32]" strokeWidth={1.6} />;
}

const TABS = [
  { key: "about", label: "About", icon: BookOpen },
  { key: "benefits", label: "Benefits", icon: Leaf },
  { key: "ingredients", label: "Ingredients", icon: FlaskConical },
  { key: "howto", label: "How to Use", icon: ListChecks },
  { key: "reviews", label: "Reviews", icon: MessageCircleMore },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tab, setTab] = useState<TabKey>("about");
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const providedImages = (product?.images ?? []).filter(Boolean);
  const galleryImages = providedImages.length
    ? providedImages
    : ["/product/vaidhyashala_product_page_images/14_product_guidance_consultation.webp"];

  const title = product?.title || "Product";
  const category = product?.category || "";
  const badge = category.replace(/s$/, "");
  const description = product?.description || "";
  const productInfo = product?.productInfo || "";
  const directions =
    product?.directions ||
    "Use as directed by your physician or as indicated on the pack label. Store in a cool, dry place away from direct sunlight.";
  const imageAlt = product?.imageAlt || title;

  const extras = productExtras(title);
  const tagline = extras.tagline || firstSentence(description);
  const about = extras.about || description;
  const qtyLabel = netQuantity(productInfo);
  const ingredientList = ingredients(productInfo);

  const price = Number(product?.price) || 0;
  const mrp = Number(product?.mrp) || 0;
  const hasPrice = price > 0;
  const hasDiscount = hasPrice && mrp > price;
  const savings = hasDiscount ? mrp - price : 0;
  const percentOff = hasDiscount ? Math.round((savings / mrp) * 100) : 0;

  const addToCart = () => {
    if (!hasPrice || !product?.id) return false;
    add({ id: product.id, slug: product.slug || "", title, image: galleryImages[0], price, mrp: hasDiscount ? mrp : price, subtitle: extras.guideSubtitle || badge, size: qtyLabel }, qty);
    return true;
  };
  const onAdd = () => {
    if (!addToCart()) return;
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };
  const onBuy = () => {
    if (addToCart()) router.push("/checkout");
  };

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setPinMsg({ ok: false, text: "Please enter a valid 6-digit PIN code." });
      return;
    }
    setPinMsg({ ok: true, text: `Thanks! Our team will confirm delivery to ${pin} with your order.` });
  };

  const scrollThumbs = (dir: 1 | -1) => {
    const next = Math.min(galleryImages.length - 1, Math.max(0, activeImageIndex + dir));
    setActiveImageIndex(next);
    thumbsRef.current?.children[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  const tabLabel = (key: TabKey, label: string) =>
    key === "reviews" && extras.reviewCount ? `${label} (${extras.reviewCount})` : label;

  return (
    <div className={`${poppins.className} w-full bg-white text-[#252729]`}>
      <div className="mx-auto max-w-[1440px] px-4 pb-0 pt-2 sm:px-6 lg:px-12">
        {/* ============ Breadcrumb ============ */}
        <nav aria-label="Breadcrumb" className="flex h-[34px] flex-wrap items-center gap-x-3 text-[13.1px] text-[#1E1E22]">
          <Link href="/" aria-label="Home" className="hover:text-[#0B5924]">
            <House className="h-[19px] w-[19px]" strokeWidth={1.9} />
          </Link>
          <Link href="/" className="hover:text-[#0B5924]">Home</Link>
          <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          <Link href="/products" className="hover:text-[#0B5924]">Products</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
              <Link href="/products" className="hover:text-[#0B5924]">{category}</Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          <span className="font-semibold">{title}</span>
        </nav>

        {/* ============ Row 1: gallery · info · sidebar ============ */}
        <div className="mt-[8px] flex flex-col gap-6 min-[1360px]:flex-row min-[1360px]:gap-0">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-0 min-[1360px]:contents">
            {/* Gallery */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-[15px] lg:w-[467px] lg:shrink-0">
              <div className="flex shrink-0 items-center gap-2 sm:w-[56px] sm:flex-col sm:gap-0">
                <button
                  type="button"
                  aria-label="Previous picture"
                  onClick={() => scrollThumbs(-1)}
                  className="hidden h-[34px] items-center justify-center text-[#222] hover:text-[#0B5924] sm:flex"
                >
                  <ChevronUp className="h-[22px] w-[22px]" strokeWidth={2} />
                </button>
                <div
                  ref={thumbsRef}
                  className="flex gap-3 overflow-x-auto sm:mt-[6px] sm:max-h-[300px] sm:flex-col sm:overflow-y-auto sm:overflow-x-visible [scrollbar-width:none]"
                >
                  {galleryImages.map((src, idx) => (
                    <button
                      key={src + idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Show picture ${idx + 1}`}
                      className={`relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[10px] bg-[#FBF3E6] transition-all ${
                        activeImageIndex === idx
                          ? "border-2 border-[#163217] p-[3px] shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                          : "border border-[#ECE8E0] opacity-90 hover:opacity-100"
                      }`}
                    >
                      <span className="relative block h-full w-full overflow-hidden rounded-[7px]">
                        <CmsImage fill sizes="80px" src={src} alt={`${imageAlt} – picture ${idx + 1}`} className="object-cover" />
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next picture"
                  onClick={() => scrollThumbs(1)}
                  className="mt-[10px] hidden h-[34px] items-center justify-center text-[#222] hover:text-[#0B5924] sm:flex"
                >
                  <ChevronDown className="h-[22px] w-[22px]" strokeWidth={2} />
                </button>
              </div>
              <div className="relative aspect-[384/385] w-full self-start overflow-hidden rounded-[16px] bg-[#F7DDBA] sm:w-[384px] sm:shrink-0">
                <CmsImage
                  fill
                  priority
                  sizes="(min-width: 640px) 384px, 100vw"
                  src={galleryImages[activeImageIndex] ?? galleryImages[0]}
                  alt={imageAlt}
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="min-w-0 flex-1 lg:ml-[18px]">
              {badge && (
                <span className="inline-flex h-[30px] items-center gap-2 rounded-full bg-[#EEF3D4] pl-[12px] pr-[14px] text-[13.5px] font-medium text-[#1F3B1F]">
                  <Leaf className="h-[18px] w-[18px] fill-[#4A9A22] text-[#3A8A1A]" strokeWidth={1.5} />
                  <span className="translate-y-px">{badge}</span>
                </span>
              )}
              <h1 className="mt-[6px] text-[31.3px] font-bold leading-[1.08] tracking-[-0.01em]" style={{ color: GREEN }}>
                {title}
              </h1>
              {tagline && <p className="mt-[4px] max-w-[400px] text-[15.2px] leading-[23px] text-[#1D1F21]">{tagline}</p>}

              {extras.rating && (
                <div className="mt-[8px] flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.1px] text-[#222]">
                  <span className="flex gap-[2px]" aria-label={`${extras.rating} out of 5`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-[18px] w-[18px] fill-[#FBBC14] text-[#FBBC14]" />
                    ))}
                  </span>
                  <span>
                    <b className="text-[14.8px] font-bold">{extras.rating}</b> ({extras.reviewCount} Reviews)
                  </span>
                  <span className="h-[22px] w-px bg-[#BDBDBD]" />
                  <Users className="h-[21px] w-[21px] text-[#F0A020]" strokeWidth={1.8} />
                  <span>
                    <b className="text-[14.8px] font-bold">{extras.happyCustomers}</b> Happy Customers
                  </span>
                </div>
              )}

              {/* Benefit badges */}
              <div className="mt-[6px] grid h-[74px] grid-cols-3 rounded-[16px] border border-[#EEEEED] bg-[#F8F8F3] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {extras.benefits.map((b, i) => (
                  <div key={b.label} className={`flex flex-col items-center justify-center gap-[3px] ${i ? "border-l border-[#E2E2DE]" : ""} my-[4px]`}>
                    <BenefitGlyph icon={b.icon} />
                    <span className="whitespace-nowrap text-center text-[14.4px] font-semibold leading-[18px] text-[#1E2022]">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mt-[6px] flex min-h-[48px] flex-wrap items-center gap-x-[12px] gap-y-2 rounded-[14px] sm:flex-nowrap border border-[#EFEFE8] bg-[linear-gradient(90deg,#FEF9E8_0%,#FBF9F0_45%,#F8F9F4_100%)] px-[10px] py-[6px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {hasPrice ? (
                  <>
                    {hasDiscount && (
                      <span className="shrink-0 rounded-full bg-[linear-gradient(90deg,#EB9E03,#F4A400)] px-[12px] pb-[5px] pt-[7px] text-[14.8px] font-semibold leading-none text-white">
                        {percentOff}% OFF
                      </span>
                    )}
                    <span className="shrink-0 text-[40px] font-bold leading-none" style={{ color: GREEN }}>{rupees(price)}</span>
                    {hasDiscount && (
                      <span className="shrink-0 whitespace-nowrap leading-[22px]">
                        <span className="block text-[13.5px] text-[#8F8F90]">
                          M.R.P. <span className="line-through">{rupees(mrp)}</span>
                        </span>
                        <span className="block text-[14.4px] font-semibold text-[#147911]">You Save {rupees(savings)}</span>
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[15.7px] font-semibold" style={{ color: GREEN }}>Price on request</span>
                )}
                {qtyLabel && (
                  <span className="ml-auto flex shrink-0 items-center gap-[10px] self-stretch border-l border-[#DADAD4] my-[4px] pl-[12px]">
                    <Milk className="h-[34px] w-[24px] text-[#2B2B2B]" strokeWidth={1.5} />
                    <span className="leading-tight">
                      <span className="block text-[11.3px] text-[#333]">Net Quantity</span>
                      <span className="block text-[18.3px] font-semibold text-[#111]">{qtyLabel}</span>
                    </span>
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-[6px] flex flex-wrap items-center gap-[10px]">
                <div className="inline-flex h-[42px] w-[104px] items-center justify-between rounded-[12px] border border-[#E3E3E3] bg-white px-[8px] shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-1 text-[#111]">
                    <Minus className="h-[18px] w-[18px]" strokeWidth={2.4} />
                  </button>
                  <span className="text-[18.3px] font-semibold text-[#111]" aria-live="polite">{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))} className="p-1 text-[#111]">
                    <Plus className="h-[18px] w-[18px]" strokeWidth={2.4} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onAdd}
                  disabled={!hasPrice}
                  className="inline-flex h-[42px] w-[146px] items-center justify-center gap-[8px] rounded-[12px] border-2 border-[#0A4A1F] bg-white text-[16.1px] font-semibold text-[#0B0B0B] shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#F3F8F2] disabled:opacity-50"
                >
                  {justAdded ? <Check className="h-[22px] w-[22px] text-[#0A4A1F]" /> : <ShoppingCart className="h-[24px] w-[24px] text-[#0A4A1F]" strokeWidth={1.8} />}
                  <span className="translate-y-px">{justAdded ? "Added" : "Add to Cart"}</span>
                </button>
                <button
                  type="button"
                  onClick={onBuy}
                  disabled={!hasPrice}
                  className="inline-flex h-[44px] min-w-[170px] flex-1 items-center justify-center gap-[8px] rounded-[12px] text-[20px] font-semibold text-[#0A1F0A] shadow-[0_3px_8px_rgba(235,169,0,0.35)] transition-[filter] hover:brightness-105 disabled:opacity-50"
                  style={{ background: GOLD_BTN }}
                >
                  <Zap className="h-[24px] w-[24px] fill-[#0A3314] text-[#0A3314]" />
                  <span className="translate-y-px">Buy Now</span>
                </button>
              </div>

              {/* Service features */}
              <ul className="mt-[6px] grid grid-cols-2 gap-y-1 sm:flex sm:justify-between">
                {[
                  { icon: Truck, a: "Fast Delivery", b: "(2–5 Days)" },
                  { icon: ShieldCheck, a: "Secure", b: "Packaging" },
                  { icon: CreditCard, a: "Multiple", b: "Payment Options" },
                  { icon: RefreshCw, a: "Easy", b: "Returns*" },
                ].map(({ icon: Icon, a, b }, i) => (
                  <li key={a} className={`flex items-center gap-[7px] ${i ? "sm:border-l sm:border-[#E2E2E2] sm:pl-[9px]" : ""}`}>
                    <Icon className="h-[26px] w-[26px] shrink-0 text-[#2F6B3A]" strokeWidth={1.6} />
                    <span className="whitespace-nowrap text-[11px] leading-[16px] text-[#333]">
                      {a}
                      <br />
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="grid gap-3 md:grid-cols-3 min-[1360px]:ml-[12px] min-[1360px]:flex min-[1360px]:w-[364px] min-[1360px]:shrink-0 min-[1360px]:flex-col min-[1360px]:gap-[6px]">
            {/* Check delivery */}
            <form
              onSubmit={checkPin}
              className="relative overflow-hidden rounded-[16px] px-[16px] pb-[10px] pt-[8px] text-white shadow-[0_4px_12px_rgba(0,46,20,0.25)]"
              style={{ background: "linear-gradient(180deg,#156229 0%,#0D5325 35%,#073E19 70%,#002E14 100%)" }}
            >
              <img
                src="/product-v2/truck.png"
                alt=""
                className="absolute right-[14px] top-[12px] h-[50px] w-[80px] object-contain"
                style={{ maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 75%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 75%, transparent 100%)" }}
              />
              <div className="flex items-center gap-[10px]">
                <MapPin className="h-[28px] w-[28px] fill-[#F5B60B] text-[#0B4A1E]" strokeWidth={1.6} />
                <h2 className="text-[19.1px] font-semibold leading-none">Check Delivery</h2>
              </div>
              <p className="mt-[4px] max-w-[240px] text-[12.6px] leading-[19px] text-white/90">
                Enter your PIN code to check delivery availability in your area.
              </p>
              <div className="mt-[8px] flex gap-[10px]">
                <label className="flex h-[36px] min-w-0 flex-1 items-center gap-[10px] rounded-[10px] bg-white px-[12px] text-[#555]">
                  <MapPin className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                  <input
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setPinMsg(null);
                    }}
                    inputMode="numeric"
                    placeholder="Enter PIN Code"
                    aria-label="PIN code"
                    className="min-w-0 flex-1 bg-transparent text-[13.9px] text-[#111] outline-none placeholder:text-[#8A8A8A]"
                  />
                </label>
                <button
                  type="submit"
                  className="h-[36px] w-[82px] shrink-0 rounded-[10px] text-[14.8px] font-semibold text-[#0A1F0A] hover:brightness-105"
                  style={{ background: GOLD_BTN }}
                >
                  Check
                </button>
              </div>
              {pinMsg && <p className={`mt-2 text-[11.3px] ${pinMsg.ok ? "text-[#D8F5C8]" : "text-[#FFD7A0]"}`}>{pinMsg.text}</p>}
            </form>

            {/* Why choose */}
            <div className="rounded-[16px] border border-[#EEEEEE] bg-white px-[16px] pb-[6px] pt-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-[8px]">
                <img src="/product-v2/leaf.png" alt="" className="h-[38px] w-[40px] object-contain" />
                <h2 className="text-[19.1px] font-semibold leading-none" style={{ color: GREEN }}>Why Choose Vaidhyashala?</h2>
              </div>
              <ul className="mt-[4px]">
                {["Authentic Ayurvedic Formulation", "High-Quality, Natural Ingredients", "Safe for Daily Use", "Trusted for Long-Term Wellness"].map(
                  (t, i) => (
                    <li key={t} className={`flex h-[28px] items-center gap-[12px] ${i < 3 ? "border-b border-[#F0F0F0]" : ""}`}>
                      <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#9FD356,#3D9A2B)]">
                        <Check className="h-[16px] w-[16px] text-white" strokeWidth={3} />
                      </span>
                      <span className="translate-y-px text-[14.8px] font-semibold text-[#111]">{t}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Guidance */}
            <div className="rounded-[16px] border border-[#F3EBD7] bg-[linear-gradient(180deg,#FEFCF5_0%,#FCF5E5_100%)] px-[18px] pb-[8px] pt-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              <div className="flex gap-[16px]">
                <img src="/product-v2/doctor.png" alt="" className="mt-[4px] h-[56px] w-[56px] shrink-0 object-contain" />
                <div>
                  <h2 className="text-[20px] font-semibold leading-tight text-[#092810]">Need Guidance?</h2>
                  <p className="mt-[2px] text-[12.6px] leading-[19px] text-[#222]">Consult our Ayurvedic Experts for personalized advice.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConsultOpen(true)}
                className="mt-[4px] flex h-[36px] w-full items-center justify-center gap-[12px] rounded-full text-[16.5px] font-semibold text-white shadow-[0_3px_8px_rgba(11,89,36,0.35)] hover:brightness-110"
                style={{ background: GREEN_BTN }}
              >
                <CalendarDays className="h-[22px] w-[22px]" strokeWidth={1.8} />
                <span className="translate-y-px">Book a Consultation</span>
                <ArrowRight className="h-[20px] w-[20px]" strokeWidth={2.2} />
              </button>
            </div>
          </aside>
        </div>

        {/* ============ Row 2: tabs · trust ============ */}
        <div className="mt-[10px] flex flex-col gap-4 min-[1360px]:flex-row min-[1360px]:gap-[16px]">
          <section className="min-w-0 flex-1 overflow-hidden rounded-[16px] border border-[#EAEAEA] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <div role="tablist" className="flex items-center overflow-x-auto border-b border-[#ECECEE] px-[10px] py-[5px] [scrollbar-width:none]">
              {TABS.map(({ key, label, icon: Icon }, i) => {
                const active = tab === key;
                return (
                  <React.Fragment key={key}>
                    {i > 0 && !active && tab !== TABS[i - 1].key && <span className="h-[30px] w-px shrink-0 bg-[#E1E0E3]" />}
                    <button
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setTab(key)}
                      className={`flex h-[32px] shrink-0 items-center justify-center gap-[10px] rounded-[8px] text-[14.5px] transition-colors ${
                        active ? "w-[172px] font-semibold text-white" : "flex-1 px-[16px] font-medium text-[#111] hover:text-[#0B5924]"
                      }`}
                      style={active ? { background: "linear-gradient(180deg,#0B6125,#095D23)" } : undefined}
                    >
                      <Icon className={`h-[22px] w-[22px] ${active ? "fill-[#FFD54A]/30 text-[#FFD54A]" : "text-[#2D8717]"}`} strokeWidth={1.7} />
                      <span className="translate-y-px whitespace-nowrap">{tabLabel(key, label)}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="relative min-h-[0px] px-[20px] pb-[8px] pt-[8px]">
              {tab === "about" && (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-[620px]">
                    <h2 className="text-[21px] font-semibold leading-tight" style={{ color: GREEN }}>About {title}</h2>
                    <span className="mt-[4px] block h-[3px] w-[60px] rounded-full bg-[#EDA515]" />
                    <p className="mt-[6px] whitespace-pre-line text-[14.5px] leading-[20px] text-[#252729]">{about}</p>
                  </div>
                  {extras.aboutImage && (
                    <img src={extras.aboutImage} alt="" className="-my-[6px] mr-[10px] h-[92px] w-[172px] shrink-0 self-center object-contain mix-blend-multiply" />
                  )}
                </div>
              )}

              {tab === "benefits" && (
                <ul className="grid gap-3 sm:grid-cols-3">
                  {extras.benefits.map((b) => (
                    <li key={b.label} className="flex items-center gap-3 rounded-[12px] border border-[#EEEEED] bg-[#F8F8F3] p-4">
                      <BenefitGlyph icon={b.icon} />
                      <span className="text-[15.7px] font-semibold text-[#1E2022]">{b.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "ingredients" &&
                (ingredientList.length ? (
                  <ul className="grid gap-3 sm:grid-cols-3">
                    {ingredientList.map((ing) => (
                      <li key={ing} className="flex items-center gap-3 rounded-[12px] border border-[#EEEEED] bg-[#F8F8F3] p-4 text-[14.8px] font-medium">
                        <Leaf className="h-[22px] w-[22px] shrink-0 text-[#2D8717]" strokeWidth={1.7} />
                        {ing}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="whitespace-pre-line text-[14.8px] leading-[26px]">
                    {productInfo || "Ingredient details will be shared by our clinic team."}
                  </p>
                ))}

              {tab === "howto" && <p className="whitespace-pre-line text-[14.8px] leading-[26px] text-[#252729]">{directions}</p>}

              {tab === "reviews" && (
                <div className="text-[14.8px] leading-[26px]">
                  {extras.rating ? (
                    <p>
                      Rated <b>{extras.rating} out of 5</b> by {extras.reviewCount} customers.
                    </p>
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                  <p className="mt-2 text-[#555]">
                    Bought this product? Share your experience with our team at{" "}
                    <a href="mailto:care@vaidhyashala.com" className="font-semibold text-[#0B5924] underline">care@vaidhyashala.com</a>.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Trust */}
          <aside className="rounded-[16px] border border-[#EEEFE8] bg-[#FBFCF6] px-[16px] pb-[6px] pt-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] min-[1360px]:w-[342px] min-[1360px]:shrink-0">
            <div className="flex items-center gap-[10px]">
              <ShieldCheck className="h-[30px] w-[30px] shrink-0 text-[#1F5F2A]" strokeWidth={1.7} />
              <h2 className="translate-y-px whitespace-nowrap text-[17.8px] font-semibold leading-none" style={{ color: GREEN }}>Your Trust, Our Commitment</h2>
            </div>
            <ul className="mt-[0px]">
              {[
                { icon: Leaf, t: "Genuine Ayurvedic Products" },
                { icon: Award, t: "Clinic-Backed Quality & Safety" },
                { icon: Headset, t: "Dedicated Customer Support" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex h-[30px] items-center gap-[14px] border-b border-[#ECEDE6] pl-[6px]">
                  <Icon className="h-[24px] w-[24px] shrink-0 text-[#2F7D32]" strokeWidth={1.6} />
                  <span className="translate-y-px text-[14.4px] text-[#13131C]">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-[6px] flex flex-wrap items-center gap-x-3 text-[13px] text-[#13131C]">
              <a href="tel:+919811979147" className="hover:text-[#0B5924]">+91 98119 79147</a>
              <span className="text-[#888]">|</span>
              <a href="mailto:care@vaidhyashala.com" className="hover:text-[#0B5924]">care@vaidhyashala.com</a>
            </p>
          </aside>
        </div>

        {/* ============ Row 3: specifications & usage guide ============ */}
        <ProductUsageGuide title={title} productInfo={productInfo} />
      </div>

      {/* ============ Row 4: customer testimonials (full width) ============ */}
      <ProductTestimonials />

      {/* ============ Row 5: explore more products ============ */}
      <div className="pt-[14px] pb-[12px]">
        <ProductExplore currentTitle={title} />
      </div>

      <PlanConsultationModal isOpen={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}
