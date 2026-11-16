"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import ChatWidget from "@/components/chat/ChatWidget";
// The player is loaded in the browser only, after the page itself, so it never slows the first paint
const DotLottieReact = dynamic(() => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact), {
  ssr: false,
  loading: () => <span className="block h-full w-full" />,
});

const ROBOT_ANIMATION = "https://lottie.host/5cd092d6-21dc-4997-baa3-ed69a39eb5af/H3Q8r94n9Z.lottie";

// This page already uses the bottom-right corner for its own button
const HIDDEN_ON = "/careers/application-submitted";

/** Floating "May I help you?" robot in the bottom-right corner of every page; opens the chat assistant. */
export default function HelpAssistant() {
  const [open, setOpen] = useState(false);
  if (usePathname() === HIDDEN_ON) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="May I help you? Open chat"
          className="group fixed bottom-3 right-3 z-50 flex flex-col items-end sm:bottom-5 sm:right-5"
        >
          <span className="mr-12 mb-[-6px] animate-[helpFloat_3s_ease-in-out_infinite] whitespace-nowrap rounded-[14px] bg-white px-4 py-2 text-[15px] font-bold text-[#1E5631] shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-transform group-hover:scale-105 sm:text-[17px]">
            May I help you?
          </span>
          <span className="block h-[96px] w-[96px] transition-transform group-hover:scale-105 sm:h-[118px] sm:w-[118px]">
            <DotLottieReact src={ROBOT_ANIMATION} loop autoplay />
          </span>
        </button>
      )}
      <ChatWidget open={open} onClose={() => setOpen(false)} />
    </>
  );
}
