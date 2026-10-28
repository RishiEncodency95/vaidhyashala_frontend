/**
 * Product and testimonial cards from the backend (Admin → Products / Testimonials).
 * Public, read-only: GET {API}/website/products and {API}/website/testimonials.
 * Each call returns null if the API cannot be reached, so the page keeps the
 * text and images it shipped with.
 */

import { API_BASE } from "@/lib/home2";

export interface ApiProduct {
  _id: string;
  title: string;
  slug: string;
  category?: { name?: string; slug?: string } | null;
  shortDescription?: string;
  description?: string;
  productType?: string;
  packOptions?: string;
  availability?: string;
  productInfo?: string;
  directions?: string;
  usageNotes?: string;
  image?: string;
  imageAlt?: string;
  galleryImage1?: string;
  galleryImage2?: string;
}

export interface ApiTestimonial {
  _id: string;
  name: string;
  category: string;
  quote: string;
  photo?: string;
  isSample?: boolean;
  isFeatured?: boolean;
}

async function getData<T>(path: string, signal?: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch {
    return null;
  }
}

/** Active products; null if the API is unreachable */
export async function fetchProducts(signal?: AbortSignal): Promise<ApiProduct[] | null> {
  const data = await getData<{ items?: ApiProduct[] }>("/website/products", signal);
  return data?.items ?? null;
}

/** Visible testimonial cards; null if the API is unreachable */
export async function fetchTestimonials(signal?: AbortSignal): Promise<ApiTestimonial[] | null> {
  const data = await getData<{ items?: ApiTestimonial[] }>("/website/testimonials", signal);
  return data?.items ?? null;
}

/** The featured testimonial; null if none or the API is unreachable */
export async function fetchFeaturedTestimonial(signal?: AbortSignal): Promise<ApiTestimonial | null> {
  return getData<ApiTestimonial>("/website/testimonials/featured", signal);
}
