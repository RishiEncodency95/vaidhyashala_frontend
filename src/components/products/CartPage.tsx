"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronRight, ShieldCheck, Stethoscope, Lock } from "lucide-react";
import { useCart, rupees } from "@/lib/cart";
import CmsImage from "@/components/common/CmsImage";

export default function CartPage() {
  const { items, count, subtotal, savings, setQty, remove, clear } = useCart();
  const mrpTotal = subtotal + savings;

  return (
    <div className="w-full bg-[#FAF8F3] text-[#22332A]">
      <div className="mx-auto min-h-[60vh] max-w-[1400px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <nav className="mb-3 flex items-center gap-1 text-[13px] text-[#6B7A71]">
          <Link href="/" className="hover:text-[#0D382B]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-[#0D382B]">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-[#0D382B]">Cart</span>
        </nav>

        {items.length === 0 ? (
          <div className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-[#ECE5D8] bg-white px-6 py-14 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3ECE0]">
              <ShoppingBag className="h-8 w-8 text-[#A07038]" />
            </span>
            <h1 className="font-serif text-[26px] font-medium text-[#0A291F]">Your cart is empty</h1>
            <p className="text-[14px] text-[#6B7A71]">Add Ayurvedic products you like and they will show up here.</p>
            <Link href="/products" className="mt-2 rounded-lg bg-[#0D382B] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#154D3C]">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
            {/* Items */}
            <section className="rounded-2xl border border-[#ECE5D8] bg-white lg:col-span-8">
              <div className="flex items-end justify-between border-b border-[#ECE5D8] px-4 py-4 sm:px-6">
                <h1 className="font-serif text-[26px] font-medium text-[#0A291F] sm:text-[30px]">Shopping Cart</h1>
                <span className="text-[13px] text-[#6B7A71]">Price</span>
              </div>

              <ul className="divide-y divide-[#F0EADF]">
                {items.map((i) => {
                  const off = i.mrp > i.price ? Math.round(((i.mrp - i.price) / i.mrp) * 100) : 0;
                  return (
                    <li key={i.id} className="flex gap-3 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5">
                      <Link
                        href={`/products/${i.slug}`}
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#E6DFD1] bg-[#F3EDE2] sm:h-32 sm:w-32"
                      >
                        <CmsImage fill sizes="128px" src={i.image} alt={i.title} className="h-full w-full object-cover" />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link href={`/products/${i.slug}`} className="block font-serif text-[18px] font-medium leading-snug text-[#0D3226] hover:text-[#184838] sm:text-[20px]">
                              {i.title}
                            </Link>
                            <p className="mt-0.5 text-[12.5px] font-medium text-[#2C7A52]">In stock · Doctor-guided Ayurveda</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[18px] font-bold text-[#0D382B] sm:text-[20px]">{rupees(i.price * i.qty)}</p>
                            {off > 0 && (
                              <p className="text-[12px] text-[#8C988F]">
                                <span className="line-through">{rupees(i.mrp * i.qty)}</span>{" "}
                                <span className="font-bold text-[#A07038]">{off}% off</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3">
                          <div className="inline-flex items-center rounded-full border border-[#C8BFB0] bg-white">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(i.id, i.qty - 1)}
                              className="rounded-l-full px-3 py-1.5 text-[#0D382B] hover:bg-[#FAF8F3]"
                            >
                              {i.qty === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                            </button>
                            <span className="min-w-[2rem] text-center text-[14px] font-bold">{i.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(i.id, i.qty + 1)}
                              className="rounded-r-full px-3 py-1.5 text-[#0D382B] hover:bg-[#FAF8F3]"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="hidden h-4 w-px bg-[#DFD7CB] sm:block" />
                          <button onClick={() => remove(i.id)} className="text-[13px] font-medium text-[#55645C] hover:text-[#B3402D]">
                            Delete
                          </button>
                          <span className="text-[12.5px] text-[#8C988F]">{rupees(i.price)} each</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-[#ECE5D8] px-4 py-3 sm:px-6">
                <button onClick={clear} className="text-[13px] font-medium text-[#7A8880] hover:text-[#B3402D]">Clear cart</button>
                <p className="text-[15px] text-[#4A5950]">
                  Subtotal ({count} item{count === 1 ? "" : "s"}): <b className="text-[18px] text-[#0D382B]">{rupees(subtotal)}</b>
                </p>
              </div>
            </section>

            {/* Summary */}
            <aside className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
              <div className="rounded-2xl border border-[#ECE5D8] bg-white p-5">
                {savings > 0 && (
                  <p className="mb-3 rounded-lg bg-[#EDF3EE] px-3 py-2 text-[13px] font-semibold text-[#244E38]">
                    🎉 You are saving {rupees(savings)} on this order
                  </p>
                )}
                <h2 className="text-[17px] font-bold text-[#0D382B]">Order summary</h2>
                <dl className="mt-3 space-y-2 text-[14px] text-[#4A5950]">
                  <div className="flex justify-between"><dt>M.R.P. ({count} item{count === 1 ? "" : "s"})</dt><dd>{rupees(mrpTotal)}</dd></div>
                  {savings > 0 && (
                    <div className="flex justify-between text-[#2C7A52]"><dt>Discount</dt><dd>− {rupees(savings)}</dd></div>
                  )}
                  <div className="flex justify-between"><dt>Delivery</dt><dd className="text-[#6B7A71]">Confirmed by clinic</dd></div>
                  <div className="flex justify-between border-t border-[#ECE5D8] pt-3 text-[19px] font-bold text-[#0D382B]">
                    <dt>Total</dt><dd>{rupees(subtotal)}</dd>
                  </div>
                </dl>
                <Link
                  href="/checkout"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#0D382B] px-5 py-3.5 text-[15px] font-bold text-white hover:bg-[#154D3C]"
                >
                  <Lock className="h-4 w-4" /> Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/products" className="mt-2 block text-center text-[13px] font-medium text-[#0D382B] underline underline-offset-4">
                  Continue shopping
                </Link>
              </div>

              <ul className="grid grid-cols-2 gap-2 text-[12.5px] text-[#4A5950]">
                <li className="flex items-center gap-2 rounded-xl border border-[#ECE5D8] bg-white px-3 py-2.5"><ShieldCheck className="h-5 w-5 shrink-0 text-[#2D5A45]" /> Secure payment</li>
                <li className="flex items-center gap-2 rounded-xl border border-[#ECE5D8] bg-white px-3 py-2.5"><Stethoscope className="h-5 w-5 shrink-0 text-[#2D5A45]" /> Doctor-guided</li>
              </ul>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
