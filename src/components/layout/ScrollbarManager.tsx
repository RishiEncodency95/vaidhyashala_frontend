"use client";

import { useEffect } from "react";

export default function ScrollbarManager() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    const handleScroll = () => {
      document.documentElement.classList.add("is-scrolling");

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
}
