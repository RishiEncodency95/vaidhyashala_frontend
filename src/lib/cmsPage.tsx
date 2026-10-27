"use client";

/**
 * Shared loader for pages managed in Admin → Pages & CMS.
 * Public, read-only: GET {API}/website/pages/<key> — inactive sections come back as null.
 * `defaults` are the text/images the page shipped with; they are used only if the API
 * cannot be reached (or the page is a draft).
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "@/lib/home2";

export type CmsContent<T> = T & { seo?: { metaTitle?: string } };

export async function fetchCmsPage<T>(key: string, signal?: AbortSignal): Promise<CmsContent<T> | null> {
  try {
    const res = await fetch(`${API_BASE}/website/pages/${key}`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    if (!data?.sections) return null;
    return { ...data.sections, seo: data.seo } as CmsContent<T>;
  } catch {
    return null;
  }
}

/** POST to a public page endpoint. Throws Error(message) on failure. */
export async function postCmsPage(path: string, payload: unknown): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/website/pages/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("We could not reach the server. Please try again.");
  }
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    const detail = Array.isArray(json?.errors) && json.errors.length ? String(json.errors[0]) : "";
    throw new Error(detail || json?.message || "Something went wrong. Please try again.");
  }
}

export function createCmsPage<T>(key: string, defaults: CmsContent<T>) {
  const Context = createContext<CmsContent<T>>(defaults);

  function Provider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = useState<CmsContent<T>>(defaults);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      const controller = new AbortController();
      fetchCmsPage<T>(key, controller.signal).then((live) => {
        if (controller.signal.aborted) return;
        if (live) {
          setContent(live);
          if (live.seo?.metaTitle) document.title = live.seo.metaTitle;
        }
        setReady(true);
      });
      return () => controller.abort();
    }, []);

    // Hold the page back until the CMS answers so default text never flashes before the real text
    return (
      <Context.Provider value={content}>
        <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
          {children}
        </div>
      </Context.Provider>
    );
  }

  return { Provider, usePage: () => useContext(Context) };
}
