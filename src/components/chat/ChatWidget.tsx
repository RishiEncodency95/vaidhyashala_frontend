"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, CalendarCheck, ChevronDown, LogOut, Minus, PhoneCall, Send, X } from "lucide-react";
import { API_BASE } from "@/lib/api";
import PlanConsultationModal from "@/components/consultation/PlanConsultationModal";

/**
 * Website chat assistant (opened from the floating robot). Talks to the backend chat API:
 *   GET  /chat/config   — name, greetings, menu buttons and callback form published in Admin → Chatbot Manager
 *   POST /chat/start    — the visitor's name (resumes their earlier chat)
 *   POST /chat          — a question; the AI reply streams back as server-sent events
 *   POST /chat/track    — menu clicks and scripted replies, so the admin sees the whole conversation
 *   POST /chat/lead     — the callback request, after the WhatsApp OTP (POST /verify/*-phone-otp)
 */

type Lang = "en" | "hi";
type Msg = { role: "user" | "assistant"; content: string };
type MenuButton = { label: string; hindi?: string; action: string; reply?: string; options?: string[]; target?: string };
type CallbackForm = { active: boolean; submitLabel?: string; consent?: string; confirmation?: string; time?: { show: boolean; required: boolean } };
type ChatConfig = {
  enabled: boolean;
  name: string;
  subtitle: string;
  avatar: string;
  defaultLanguage?: string;
  messages: Record<Lang, { welcomeGreeting?: string; welcomeMessage?: string; closingGreeting?: string }> | null;
  buttons: MenuButton[] | null;
  forms: { callback?: CallbackForm } | null;
};

const SESSION_KEY = "vs_chat";
/** Must match CHAT_LEAD_OTP_PROFILE in the backend chat controller */
const LEAD_OTP_PROFILE = "CHAT_LEAD";

const T = {
  en: {
    name: "Salu",
    subtitle: "Vaidhyashala Assistant",
    greetTitle: "Namaskar! 🙏",
    greetLine: "I'm Salu, your Ayurveda care assistant.",
    followUp: "Contact details only for follow-up",
    askName: "May I know your name?",
    namePlaceholder: "Type your name...",
    hello: (n: string) => `Nice to meet you, ${n}! How can I help you today?`,
    help: "How can I help you today?",
    ask: "Ask another question...",
    menu: "Main Menu",
    automated: "Automated assistant",
    end: "End Chat",
    callback: "Callback Request",
    callbackTag: "Consultation",
    fullName: "Full Name",
    mobile: "Mobile / WhatsApp",
    mobilePh: "Enter mobile number",
    time: "Preferred Time (Optional)",
    agree: "I agree to be contacted about this enquiry.",
    sendOtp: "Send OTP on WhatsApp",
    otpLabel: "Enter the 6-digit OTP sent on WhatsApp",
    verify: "Verify & Request Callback",
    resend: "Change number",
    note: "Callback requests are handled during working hours.",
    done: "Thank you! Our team will call you back during working hours.",
    thinking: "Typing...",
    error: "Sorry, something went wrong. Please try again.",
    ended: "Thank you for chatting with us. Take care! 🌿",
    times: ["Any working-hour slot", "Morning (10 AM – 1 PM)", "Afternoon (1 PM – 4 PM)", "Evening (4 PM – 7 PM)"],
  },
  hi: {
    name: "शालू",
    subtitle: "वैद्यशाला सहायक",
    greetTitle: "नमस्कार! 🙏",
    greetLine: "मैं शालू हूँ, आपकी आयुर्वेद सहायक।",
    followUp: "संपर्क विवरण केवल फ़ॉलो-अप के लिए",
    askName: "क्या मैं आपका नाम जान सकता हूँ?",
    namePlaceholder: "अपना नाम लिखें...",
    hello: (n: string) => `आपसे मिलकर खुशी हुई, ${n}! मैं आपकी क्या मदद कर सकता हूँ?`,
    help: "मैं आपकी क्या मदद कर सकता हूँ?",
    ask: "अपना प्रश्न लिखें...",
    menu: "मुख्य मेनू",
    automated: "स्वचालित सहायक",
    end: "चैट बंद करें",
    callback: "कॉलबैक अनुरोध",
    callbackTag: "परामर्श",
    fullName: "पूरा नाम",
    mobile: "मोबाइल / व्हाट्सऐप",
    mobilePh: "मोबाइल नंबर लिखें",
    time: "पसंदीदा समय (वैकल्पिक)",
    agree: "मैं इस पूछताछ के लिए संपर्क किए जाने से सहमत हूँ।",
    sendOtp: "व्हाट्सऐप पर OTP भेजें",
    otpLabel: "व्हाट्सऐप पर भेजा गया 6 अंकों का OTP लिखें",
    verify: "सत्यापित करें और कॉलबैक माँगें",
    resend: "नंबर बदलें",
    note: "कॉलबैक अनुरोध कार्य समय में संभाले जाते हैं।",
    done: "धन्यवाद! हमारी टीम कार्य समय में आपको कॉल करेगी।",
    thinking: "लिख रहा है...",
    error: "क्षमा करें, कुछ गलत हो गया। कृपया फिर से प्रयास करें।",
    ended: "हमसे बात करने के लिए धन्यवाद। अपना ध्यान रखें! 🌿",
    times: ["कार्य समय में कभी भी", "सुबह (10 – 1 बजे)", "दोपहर (1 – 4 बजे)", "शाम (4 – 7 बजे)"],
  },
};

// Used until the Chatbot Manager publishes its own main-menu buttons
const DEFAULT_BUTTONS: MenuButton[] = [
  { label: "Book an Appointment", hindi: "अपॉइंटमेंट बुक करें", action: "Book Appointment" },
  { label: "Request a Callback", hindi: "कॉलबैक माँगें", action: "Open Form" },
  { label: "Our Treatments", hindi: "हमारे उपचार", action: "Open Link", target: "/treatments" },
  { label: "Panchakarma", hindi: "पंचकर्म", action: "Open Link", target: "/panchakarma" },
  { label: "Ayurvedic Products", hindi: "आयुर्वेदिक उत्पाद", action: "Open Link", target: "/products" },
  { label: "Contact Us", hindi: "संपर्क करें", action: "Open Link", target: "/contact" },
];

const newSessionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const readSession = (): { sessionId: string; name: string } | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const writeSession = (s: { sessionId: string; name: string } | null) => {
  try {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* private mode: the chat still works for this page */
  }
};

const postJson = async (path: string, body: unknown) => {
  const res = await fetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => null);
  if (!res.ok || data?.success === false) throw new Error(data?.message || data?.msg || "Request failed");
  return data;
};

export default function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [session, setSession] = useState<{ sessionId: string; name: string } | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [view, setView] = useState<"chat" | "callback">("chat");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [consultOpen, setConsultOpen] = useState(false);
  const started = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const t = T[lang];

  const pageUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  // Published name, greetings, buttons and forms (the website still works with the defaults)
  useEffect(() => {
    if (!open || config) return;
    fetch(`${API_BASE}/chat/config`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const c = d?.data as ChatConfig | undefined;
        setConfig(c || ({ enabled: true } as ChatConfig));
        if (c?.defaultLanguage === "hi") setLang("hi");
      })
      .catch(() => setConfig({ enabled: true } as ChatConfig));
  }, [open, config]);

  // A returning visitor's chat continues where it stopped
  useEffect(() => {
    if (!open || started.current) return;
    started.current = true;
    const saved = readSession();
    if (!saved?.name) return;
    postJson("/chat/start", { sessionId: saved.sessionId, name: saved.name, pageUrl: pageUrl() })
      .then((d) => {
        const s = { sessionId: d.data.sessionId, name: d.data.name };
        writeSession(s);
        setSession(s);
        setMessages((d.data.messages || []).map((m: Msg) => ({ role: m.role, content: m.content })));
      })
      .catch(() => writeSession(null));
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, view, busy]);

  const track = useCallback(
    (msgs: Msg[]) => {
      if (!session) return;
      postJson("/chat/track", { sessionId: session.sessionId, pageUrl: pageUrl(), messages: msgs.slice(0, 10) }).catch(() => {});
    },
    [session]
  );

  const botName = (lang === "en" && config?.name) || t.name;
  const subtitle = (lang === "en" && config?.subtitle) || t.subtitle;
  const greetTitle = config?.messages?.[lang]?.welcomeGreeting || t.greetTitle;
  const greetLine = config?.messages?.[lang]?.welcomeMessage || t.greetLine;
  const buttons = config?.buttons?.length ? config.buttons : DEFAULT_BUTTONS;
  const callbackForm = config?.forms?.callback;

  const startWithName = async (name: string) => {
    setBusy(true);
    setError("");
    try {
      const d = await postJson("/chat/start", { sessionId: readSession()?.sessionId || newSessionId(), name, pageUrl: pageUrl() });
      const s = { sessionId: d.data.sessionId, name: d.data.name };
      writeSession(s);
      setSession(s);
      setMessages((d.data.messages || []).map((m: Msg) => ({ role: m.role, content: m.content })));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const ask = async (question: string) => {
    if (!session) return;
    setMessages((m) => [...m, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setBusy(true);
    const append = (text: string) =>
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + text };
        return copy;
      });
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.sessionId, message: question, pageUrl: pageUrl() }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        if (data?.code === "DETAILS_REQUIRED") setView("callback");
        append(data?.message || t.error);
        return;
      }
      // Server-sent events: data: {"delta": "..."} … data: {"done": true} or {"error": "..."}
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const ev of events) {
          const line = ev.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;
          const data = JSON.parse(line.slice(5).trim());
          if (data.delta) append(data.delta);
          if (data.error) append(data.error);
        }
      }
    } catch {
      append(t.error);
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    if (!session) startWithName(text);
    else {
      setView("chat");
      ask(text);
    }
  };

  const clickButton = (b: MenuButton) => {
    const label = lang === "hi" && b.hindi ? b.hindi : b.label;
    if (b.action === "Book Appointment") {
      setConsultOpen(true);
      track([{ role: "user", content: label }]);
    } else if (b.action === "Open Form" || b.action === "Talk to Team") {
      setView("callback");
      track([{ role: "user", content: label }]);
    } else if (b.action === "Open Link" && b.target) {
      track([{ role: "user", content: label }]);
      window.location.href = b.target;
    } else if (b.action === "Show Answer" && b.reply) {
      const msgs: Msg[] = [
        { role: "user", content: label },
        { role: "assistant", content: b.reply },
      ];
      setMessages((m) => [...m, ...msgs]);
      track(msgs);
    } else {
      ask(label);
    }
  };

  const endChat = () => {
    writeSession(null);
    setSession(null);
    setMessages([]);
    setView("chat");
    started.current = false;
    onClose();
  };

  if (!open) return null;

  // The bot's avatar shows beside the first of its consecutive messages
  const firstOfGroup = (i: number) => messages[i].role === "assistant" && (i === 0 || messages[i - 1].role !== "assistant");

  return (
    <>
      <div
        role="dialog"
        aria-label={botName}
        className="fixed bottom-3 right-3 z-[60] flex h-[min(580px,calc(100vh-24px))] w-[min(370px,calc(100vw-24px))] flex-col overflow-hidden rounded-[20px] bg-[#EEF5EC] shadow-[0_18px_50px_rgba(10,40,20,0.30)] sm:bottom-5 sm:right-5"
      >
        {/* Header: avatar, name, language, minimise / close */}
        <div className="shrink-0 border-b-[3px] border-[#D9A21B] bg-gradient-to-r from-[#1D6B34] to-[#0F4A26] px-3.5 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <span className="relative shrink-0">
              <BotAvatar size={46} />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22C55E]" title="Online" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-bold leading-tight">{botName}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-white/85">{subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center rounded-full border border-white/20 bg-white/10 p-0.5 text-[11.5px] font-bold">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${lang === l ? "bg-white text-[#1D3B26]" : "text-white hover:bg-white/10"}`}
                >
                  {l === "en" ? "EN" : "हिं"}
                </button>
              ))}
            </div>
            <button type="button" onClick={onClose} aria-label="Minimise chat" className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-white/20 hover:bg-white/30">
              <Minus className="h-4 w-4" />
            </button>
            <button type="button" onClick={endChat} aria-label="Close chat" className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-white/20 hover:bg-white/30">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Conversation over faded leaves */}
        <div className="relative min-h-0 flex-1">
          <svg className="pointer-events-none absolute -left-10 top-[28%] h-[150px] w-[110px] text-[#D3E5D0]/70" viewBox="0 0 80 110" fill="currentColor" aria-hidden>
            <path d="M58 4C18 22 2 58 14 96c3 8 8 12 14 12C52 84 74 46 58 4z" />
            <path d="M28 106C34 70 42 44 56 10" stroke="#EEF5EC" strokeWidth="3" fill="none" />
          </svg>
          <svg className="pointer-events-none absolute -right-8 bottom-[10%] h-[120px] w-[140px] text-[#D3E5D0]/70" viewBox="0 0 120 100" fill="currentColor" aria-hidden>
            <path d="M8 80C20 32 62 8 116 18c-6 46-46 76-96 70-6-1-10-4-12-8z" />
            <path d="M14 82C46 60 74 42 110 22" stroke="#EEF5EC" strokeWidth="3" fill="none" />
          </svg>

          <div ref={bodyRef} className="absolute inset-0 space-y-2.5 overflow-y-auto px-3.5 py-4">
            <Bubble role="assistant" avatar>
              <span className="font-bold text-[#14532D]">{greetTitle}</span>
              {"\n"}
              {greetLine}
            </Bubble>
            {!session ? (
              <Bubble role="assistant" indent>
                {t.askName}
              </Bubble>
            ) : (
              <>
                {messages.map((m, i) => (
                  <Bubble key={i} role={m.role} indent={m.role === "assistant" && !firstOfGroup(i)} avatar={firstOfGroup(i)}>
                    {m.content || (busy && i === messages.length - 1 ? <span className="text-[#6B7F70]">{t.thinking}</span> : "")}
                  </Bubble>
                ))}

                {view === "callback" ? (
                  <CallbackCard
                    t={t}
                    form={callbackForm}
                    defaultName={session.name}
                    sessionId={session.sessionId}
                    onDone={(msg) => {
                      const msgs: Msg[] = [{ role: "assistant", content: msg }];
                      setMessages((m) => [...m, ...msgs]);
                      setView("chat");
                    }}
                  />
                ) : (
                  !busy && (
                    <div className="rounded-[14px] bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                      <p className="text-[13.5px] font-semibold text-[#1C3B26]">
                        {messages.length ? t.help : t.hello(session.name)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {buttons.map((b) => (
                          <button
                            key={b.label}
                            type="button"
                            onClick={() => clickButton(b)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#CFE0C8] bg-[#F6FAF3] px-2.5 py-1 text-[12.5px] font-semibold text-[#1C5E31] transition-colors hover:border-[#1C5E31] hover:bg-[#E8F2E3]"
                          >
                            {b.action === "Book Appointment" && <CalendarCheck className="h-3.5 w-3.5" />}
                            {(b.action === "Open Form" || b.action === "Talk to Team") && <PhoneCall className="h-3.5 w-3.5" />}
                            {lang === "hi" && b.hindi ? b.hindi : b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}

                {view === "callback" && (
                  <button type="button" onClick={() => setView("chat")} className="flex items-center gap-1.5 text-[13px] font-medium text-[#1C5E31] underline underline-offset-2">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {t.menu}
                  </button>
                )}
              </>
            )}
            {error && <p className="text-center text-[12px] font-medium text-[#B91C1C]">{error}</p>}
          </div>
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-[#E3ECE1] bg-[#F7FAF6] px-3.5 pb-2 pt-2.5">
          <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-[#DDE6DA] bg-white py-1 pl-4 pr-1 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={session ? t.ask : t.namePlaceholder}
              maxLength={session ? 1000 : 40}
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[14px] text-[#1C2B22] outline-none placeholder:text-[#8A9AA0]"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              aria-label="Send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2F7A4A] text-white transition-colors disabled:bg-[#7FA688]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          {session ? (
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>{t.automated}</span>
              <button type="button" onClick={endChat} className="flex items-center gap-1 font-medium text-[#1C5E31] underline underline-offset-2">
                <LogOut className="h-3 w-3" />
                {t.end}
              </button>
            </div>
          ) : (
            <p className="mt-1.5 text-center text-[11px] text-[#64748B]">
              {t.automated} • {t.followUp}
            </p>
          )}
        </div>
      </div>

      <PlanConsultationModal isOpen={consultOpen} onClose={() => setConsultOpen(false)} />
    </>
  );
}

/** The Vaidhyashala emblem in a round badge (header, and beside the bot's messages with a gold ring). */
function BotAvatar({ size, ring = false }: { size: number; ring?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-white ${ring ? "border-2 border-[#E9C46A]" : "shadow-[0_0_0_2px_rgba(255,255,255,0.35)]"}`}
      style={{ width: size, height: size }}
    >
      <Image src="/hr/logo_icon.webp" alt="Vaidhyashala" width={460} height={373} unoptimized style={{ width: Math.round(size * 0.74), height: "auto" }} />
    </span>
  );
}

function Bubble({ role, avatar, indent, children }: { role: "user" | "assistant"; avatar?: boolean; indent?: boolean; children: React.ReactNode }) {
  if (!children) return null;
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] whitespace-pre-line rounded-[16px] rounded-br-[4px] bg-[#1D6B34] px-3.5 py-2.5 text-[14px] leading-relaxed text-white">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      {avatar ? <BotAvatar size={34} ring /> : indent ? <span className="w-[34px] shrink-0" /> : null}
      <div className="max-w-[82%] whitespace-pre-line rounded-[16px] bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-[#1F2A24] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {children}
      </div>
    </div>
  );
}

function CallbackCard({
  t,
  form,
  defaultName,
  sessionId,
  onDone,
}: {
  t: (typeof T)[Lang];
  form?: CallbackForm;
  defaultName: string;
  sessionId: string;
  onDone: (message: string) => void;
}) {
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState(t.times[0]);
  const [agree, setAgree] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const showTime = form?.time?.show !== false;
  const validPhone = /^[6-9]\d{9}$/.test(phone);

  const sendOtp = async () => {
    setError("");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!validPhone) return setError("Enter a valid 10-digit mobile number.");
    if (!agree) return setError("Please agree to be contacted.");
    setBusy(true);
    try {
      await postJson("/verify/send-phone-otp", { phone, profile: LEAD_OTP_PROFILE, name: name.trim(), eventName: "Vaidhyashala" });
      setOtpSent(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const verifyAndSubmit = async () => {
    setError("");
    if (!/^\d{6}$/.test(otp)) return setError("Enter the 6-digit OTP.");
    setBusy(true);
    try {
      await postJson("/verify/verify-phone-otp", { phone, otp });
      await postJson("/chat/lead", {
        sessionId,
        pageUrl: window.location.href,
        name: name.trim(),
        phone,
        enquiryType: "sales-callback",
        ...(showTime ? { preferredTime: time } : {}),
      });
      onDone(form?.confirmation || t.done);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "h-10 w-full rounded-[8px] border border-[#E2E5DA] bg-white px-3 text-[13.5px] text-[#1C2B22] outline-none transition focus:border-[#1C5E31] focus:ring-2 focus:ring-[#1C5E31]/10";

  return (
    <div className="rounded-[14px] bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[15.5px] font-bold text-[#1C5E31]">{t.callback}</h3>
        <span className="flex items-center gap-1 rounded-full bg-[#E3EFDD] px-2.5 py-0.5 text-[11px] font-semibold text-[#1C5E31]">
          <CalendarCheck className="h-3 w-3" />
          {t.callbackTag}
        </span>
      </div>

      <label className="mt-2 block text-[12.5px] font-medium text-[#1C2B22]">
        {t.fullName} <span className="text-[#DC2626]">*</span>
      </label>
      <input value={name} onChange={(e) => setName(e.target.value)} disabled={otpSent} maxLength={60} className={`${inputClass} mt-1`} />

      <label className="mt-2 block text-[12.5px] font-medium text-[#1C2B22]">
        {t.mobile} <span className="text-[#DC2626]">*</span>
      </label>
      <div className="mt-1 flex h-10 items-center rounded-[8px] border border-[#E2E5DA] bg-white px-3 focus-within:border-[#1C5E31]">
        <span className="mr-2 text-[13.5px] text-[#1C2B22]">+91</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          disabled={otpSent}
          inputMode="numeric"
          placeholder={t.mobilePh}
          className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-[#94A3A0]"
        />
      </div>

      {showTime && (
        <>
          <label className="mt-2 block text-[12.5px] font-medium text-[#1C2B22]">{t.time}</label>
          <div className="relative mt-1">
            <select value={time} onChange={(e) => setTime(e.target.value)} disabled={otpSent} className={`${inputClass} appearance-none pr-9`}>
              {t.times.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
          </div>
        </>
      )}

      {!otpSent ? (
        <>
          <label className="mt-2.5 flex cursor-pointer items-start gap-2 text-[12.5px] text-[#334155]">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#1C5E31]" />
            {form?.consent || t.agree}
          </label>
          <button
            type="button"
            onClick={sendOtp}
            disabled={busy}
            className="mt-3 h-10 w-full rounded-[8px] bg-[#1C5E31] text-[14px] font-bold text-white transition-colors hover:bg-[#164D28] disabled:opacity-60"
          >
            {busy ? "..." : t.sendOtp}
          </button>
        </>
      ) : (
        <>
          <label className="mt-2.5 block text-[12.5px] font-medium text-[#1C2B22]">{t.otpLabel}</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoFocus
            className={`${inputClass} mt-1 text-center tracking-[0.4em]`}
          />
          <button
            type="button"
            onClick={verifyAndSubmit}
            disabled={busy}
            className="mt-2.5 h-10 w-full rounded-[8px] bg-[#1C5E31] text-[14px] font-bold text-white transition-colors hover:bg-[#164D28] disabled:opacity-60"
          >
            {busy ? "..." : form?.submitLabel || t.verify}
          </button>
          <button type="button" onClick={() => { setOtpSent(false); setOtp(""); }} className="mt-1.5 w-full text-center text-[12px] font-medium text-[#1C5E31] underline">
            {t.resend}
          </button>
        </>
      )}

      {error && <p className="mt-1.5 text-center text-[12px] font-medium text-[#B91C1C]">{error}</p>}
      <p className="mt-2 text-center text-[11px] text-[#64748B]">{t.note}</p>
    </div>
  );
}
