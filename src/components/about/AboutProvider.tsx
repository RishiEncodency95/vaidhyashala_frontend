"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AboutContent, defaultAbout, fetchAbout } from "@/lib/content/about";
import { withDefaultImages } from "@/lib/api";
import { loadContent, useCachedContent } from "@/lib/content/contentCache";

const AboutContext = createContext<AboutContent>(defaultAbout);

/** Loads the About page content from the backend once, then shares it with the sections */
export function AboutProvider({ children }: { children: React.ReactNode }) {
  // Content already loaded in this tab shows at once (right after hydration, so the first render
  // matches the server HTML); a fresh copy still loads in the background
  const cached = useCachedContent<AboutContent>("about-us");
  const [fresh, setFresh] = useState<AboutContent | null>(null);
  const [answered, setAnswered] = useState(false);
  const content = useMemo(() => {
    const source = fresh ?? cached;
    return source ? withDefaultImages(source, defaultAbout) : defaultAbout;
  }, [fresh, cached]);
  const ready = answered || cached !== undefined;

  useEffect(() => {
    let active = true;
    loadContent("about-us", () => fetchAbout()).then((live) => {
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
    <AboutContext.Provider value={content}>
      <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </AboutContext.Provider>
  );
}

export const useAbout = () => useContext(AboutContext);
