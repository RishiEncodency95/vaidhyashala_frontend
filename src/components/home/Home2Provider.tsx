"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Home2Content, defaultHome2, fetchHome2 } from "@/lib/content/home";
import { withDefaultImages } from "@/lib/api";
import { loadContent, useCachedContent } from "@/lib/content/contentCache";

const Home2Context = createContext<Home2Content>(defaultHome2);

/** Loads the Home page content from the backend once, then shares it with the sections */
export function Home2Provider({ children }: { children: React.ReactNode }) {
  // Content already loaded in this tab shows at once (right after hydration, so the first render
  // matches the server HTML); a fresh copy still loads in the background
  const cached = useCachedContent<Home2Content>("home2");
  const [fresh, setFresh] = useState<Home2Content | null>(null);
  const [answered, setAnswered] = useState(false);
  const content = useMemo(() => {
    const source = fresh ?? cached;
    return source ? withDefaultImages(source, defaultHome2) : defaultHome2;
  }, [fresh, cached]);
  const ready = answered || cached !== undefined;

  useEffect(() => {
    let active = true;
    loadContent("home2", () => fetchHome2()).then((live) => {
      if (!active) return;
      if (live) {
        setFresh(live);
        if (live.seo?.metaTitle) document.title = live.seo.metaTitle;
      }
      setAnswered(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Hold the page back until the CMS answers so default text never flashes before the real text
  return (
    <Home2Context.Provider value={content}>
      <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </Home2Context.Provider>
  );
}

export const useHome2 = () => useContext(Home2Context);
