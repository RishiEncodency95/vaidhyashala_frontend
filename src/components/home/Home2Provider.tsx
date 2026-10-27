"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Home2Content, defaultHome2, fetchHome2 } from "@/lib/home2";

const Home2Context = createContext<Home2Content>(defaultHome2);

/** Loads the Home page content from the backend once, then shares it with the sections */
export function Home2Provider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Home2Content>(defaultHome2);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchHome2(controller.signal).then((live) => {
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
    <Home2Context.Provider value={content}>
      <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </Home2Context.Provider>
  );
}

export const useHome2 = () => useContext(Home2Context);
