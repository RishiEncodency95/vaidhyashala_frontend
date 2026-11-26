/**
 * What the "order placed" page shows. Saved in this browser right after a verified payment
 * (the server has no public order lookup, so nothing personal is ever fetched or exposed).
 */
export interface LastOrder {
  orderId?: string;
  razorpayOrderId?: string;
  orderNumber: string;
  /** ISO time the order/payment was recorded */
  placedAt: string;
  total: number;
  /** Product discounts (MRP − price) across the order */
  savings: number;
  paymentStatus?: "paid" | "pending" | "failed";
  failureReason?: string;
  failureCode?: string;
  paymentId?: string;
  customer?: { name: string; mobile: string; email?: string };
  items: { title: string; image: string; qty: number; price: number; mrp: number }[];
}

const KEY = "vds_last_order_v1";

export const saveLastOrder = (order: LastOrder) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* storage blocked: the success page falls back to a plain message */
  }
};

/** The saved order as text ("" if none): a stable value for useSyncExternalStore */
export const readLastOrderRaw = (): string => {
  try {
    return localStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
};

export const subscribeLastOrder = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

export const parseLastOrder = (raw: string): LastOrder | null => {
  try {
    const o = JSON.parse(raw || "null");
    if (!o || typeof o.orderNumber !== "string" || !Array.isArray(o.items) || !(o.total > 0)) return null;
    return o as LastOrder;
  } catch {
    return null;
  }
};
