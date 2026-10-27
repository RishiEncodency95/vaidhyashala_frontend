"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AboutContent, defaultAbout, fetchAbout } from "@/lib/aboutPage";

const AboutContext = createContext<AboutContent>(defaultAbout);

/** Loads the About page content from the backend once, then shares it with the sections */
export function AboutProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<AboutContent>(defaultAbout);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchAbout(controller.signal).then((live) => {
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
    <AboutContext.Provider value={content}>
      <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </AboutContext.Provider>
  );
}

export const useAbout = () => useContext(AboutContext);
