"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TreatmentsContent, defaultTreatments, fetchTreatments } from "@/lib/treatmentsPage";

const TreatmentsContext = createContext<TreatmentsContent>(defaultTreatments);

/** Loads the Treatments page content from the backend once, then shares it with the sections */
export function TreatmentsProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<TreatmentsContent>(defaultTreatments);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchTreatments(controller.signal).then((live) => {
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
    <TreatmentsContext.Provider value={content}>
      <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </TreatmentsContext.Provider>
  );
}

export const useTreatments = () => useContext(TreatmentsContext);
