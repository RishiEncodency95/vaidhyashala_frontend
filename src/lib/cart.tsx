"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  qty: number;
}

interface CartValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  savings: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const KEY = "vds_cart_v1";
export const MAX_QTY = 20;

/* Pure cart rules (unit-tested in tests/cart.test.ts) */
export const addItem = (cur: CartItem[], item: Omit<CartItem, "qty">, qty = 1): CartItem[] => {
  const found = cur.find((i) => i.id === item.id);
  if (found) return cur.map((i) => (i.id === item.id ? { ...i, ...item, qty: Math.min(MAX_QTY, i.qty + qty) } : i));
  return [...cur, { ...item, qty: Math.min(MAX_QTY, qty) }];
};
export const changeQty = (cur: CartItem[], id: string, qty: number): CartItem[] =>
  qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, qty) } : i));
export const totals = (items: CartItem[]) => ({
  count: items.reduce((n, i) => n + i.qty, 0),
  subtotal: items.reduce((n, i) => n + i.price * i.qty, 0),
  savings: items.reduce((n, i) => n + Math.max(0, i.mrp - i.price) * i.qty, 0),
});
/** Whatever was saved in the browser, keeping only valid lines */
export const cleanSaved = (saved: unknown): CartItem[] =>
  Array.isArray(saved) ? saved.filter((i) => i && typeof i.id === "string" && i.price > 0 && i.qty > 0) : [];
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the saved cart only exists in the browser
      setItems(cleanSaved(JSON.parse(localStorage.getItem(KEY) || "[]")));
    } catch {}
    setReady(true);
    // Keep several open tabs in step
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      try { setItems(cleanSaved(JSON.parse(e.newValue || "[]"))); } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => setItems((cur) => addItem(cur, item, qty)), []);
  const setQty = useCallback((id: string, qty: number) => setItems((cur) => changeQty(cur, id, qty)), []);
  const remove = useCallback((id: string) => setItems((cur) => cur.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(
    () => ({ items, ...totals(items), add, setQty, remove, clear }),
    [items, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
