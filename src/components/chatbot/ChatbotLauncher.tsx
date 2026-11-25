"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { chatFont } from "./chatFont";
import { startAvatar, type RealAvatar } from "./saumyaRealAvatar";
import "./SaumyaAvatar.css";

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

let introPlayed = false;
const AVATAR_SVG = "/moksha-chatbot/saumya-real.svg";
const HIDDEN_ON = "/careers/application-submitted";

/* Vaidhyashala's Ayurvedic Care Assistant (Vaidhya Mitra) launcher.
   Drawn traditional avatar rises with a respectful namaste, blinks, glances around,
   and nods towards cursor. If SVG cannot load, a herbal badge stands in. */
const AssistantButton = ({ onClick, hidden }: { onClick: () => void; hidden: boolean }) => {
  const rootRef = useRef<HTMLButtonElement>(null);
  const figRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<RealAvatar | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [rising, setRising] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let avatar: RealAvatar | null = null;
    const start = async () => {
      try {
        const res = await fetch(AVATAR_SVG);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const svg = await res.text();
        if (cancelled || !figRef.current || !rootRef.current) return;
        figRef.current.innerHTML = svg;
        const fig = figRef.current.querySelector("svg");
        if (!fig) throw new Error("not an SVG");
        avatar = startAvatar(rootRef.current, fig);
        avatarRef.current = avatar;
        setReady(true);
        if (!introPlayed) {
          introPlayed = true;
          setRising(true);
          void avatar.namaste();
        }
      } catch (error) {
        console.warn("[Vaidhya Mitra] avatar fallback:", error);
        if (!cancelled) setFailed(true);
      }
    };
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback(() => void start(), { timeout: 2500 }) : 0;
    const timer = idle ? undefined : setTimeout(() => void start(), 1200);
    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      avatar?.destroy();
      avatarRef.current = null;
    };
  }, []);

  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;
    avatar.setPaused(hidden);
    if (!hidden) avatar.nod();
  }, [hidden, ready]);

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={() => {
        avatarRef.current?.nod();
        onClick();
      }}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      className={`sv-bot mv-bot ${ready ? "mv-ready" : ""} ${failed ? "mv-failed" : ""} ${rising ? "mv-intro" : ""} ${hidden ? "sv-hidden" : ""} ${chatFont.className} group fixed right-2 bottom-2 z-[45] md:right-4 md:bottom-2`}
      aria-label="Chat with Salu — Ayurvedic Care Assistant"
    >
      {/* Floating 'Chat here / May I help you?' Pill */}
      {!hidden && (
        <span className="pointer-events-auto absolute -top-8 right-6 z-10 hidden whitespace-nowrap rounded-full bg-white/95 px-3.5 py-1 text-[13px] font-bold text-[#1E5631] shadow-[0_4px_16px_rgba(30,86,49,0.2)] ring-1 ring-[#1E5631]/15 transition-transform group-hover:scale-105 sm:inline-block">
          May I help you? 🙏
        </span>
      )}
      <span className="mv-stage" aria-hidden>
        <span ref={figRef} className="mv-tilt" />
      </span>
      <span className="mv-fallback" aria-hidden>
        🌿
      </span>
    </button>
  );
};

export const CHAT_EVENT = "vaidhyashala:chat";

export function ChatbotLauncher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [loadChat, setLoadChat] = useState(false);
  const [clickedEarly, setClickedEarly] = useState(false);
  const [settings, setSettings] = useState({ enabled: true, label: "" });
  const openChat = useRef<(() => void) | null>(null);

  useEffect(() => {
    const load = () => setLoadChat(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(load, 2500);
    return () => clearTimeout(timer);
  }, []);

  const onClick = () => {
    if (openChat.current) openChat.current();
    else {
      setLoadChat(true);
      setClickedEarly(true);
    }
  };

  const setOpen = (open: boolean) => {
    setIsOpen(open);
    if (open) setClickedEarly(false);
    window.dispatchEvent(new CustomEvent(CHAT_EVENT, { detail: { open } }));
  };

  if (pathname === HIDDEN_ON || !settings.enabled || dismissed) return null;

  return (
    <>
      <AssistantButton onClick={onClick} hidden={isOpen} />
      {!isOpen && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide assistant (available again on reload)"
          title="Hide"
          className="sv-close fixed right-2 bottom-2 z-[46] md:right-4 md:bottom-2"
        >
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      )}
      {loadChat && (
        <Chatbot
          isOpen={isOpen}
          setIsOpen={setOpen}
          openRef={openChat}
          openAtOnce={clickedEarly}
          onConfig={setSettings}
        />
      )}
    </>
  );
}
