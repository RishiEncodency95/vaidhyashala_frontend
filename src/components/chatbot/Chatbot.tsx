"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";

import { isAbusive } from "@/lib/chatGuards";
import { CREATOR_REPLY } from "@/lib/creatorGuard";
import { chatFont } from "./chatFont";
import { canCall, openCall, openPipelineCall, type Call } from "./chatCall";
import { toRoman } from "./roman";
import PlanConsultationModal from "@/components/consultation/PlanConsultationModal";

/* Vaidhya Mitra ("Your Ayurveda Care Assistant"), Vaidhyashala's website chat assistant:
   Full dual capability — talk voice-to-voice live (OpenAI Realtime over WebRTC) AND
   type / chat seamlessly with streaming AI, audio messages, and clinic bookings.
   Rooted in authentic Vedic Ayurveda and patient-first care. */

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const callSocketUrl = (token: string) => {
  const url = new URL(`${API}/chat/call/ws`, window.location.href);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("token", token);
  return url.toString();
};
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vaidhyashala.com").replace(/\/+$/, "");

type Lang = "en" | "hi";

const CLINIC_PHONE = "+91 9654900525";
const CLINIC_PHONE_ALT = "+91 9811979147";
const CLINIC_EMAIL = "info@vaidhyashala.com";
const CLINIC_ADDRESS = "First Floor, E-1, Opposite KFC, Kalkaji Main Market, Kalkaji, Delhi – 110019";

const COPY = {
  en: {
    subtitle: "Ayurveda Care Assistant",
    placeholder: "Type your health query...",
    namePlaceholder: "Type your name...",
    blockedPlaceholder: "This chat is blocked",
    blockedNote: "Chat blocked for inappropriate language",
    blockedOpensIn: "It opens again in",
    abuseHint: "Please avoid offensive words. Sending this counts as a warning.",
    abuseReply: "I only answer respectfully regarding Vaidhyashala's Ayurvedic treatments, Panchakarma, and consultations.",
    abuseWarning: (n: number, last: boolean) =>
      `Please speak respectfully. This is your ${n === 1 ? "first" : n === 2 ? "second" : `${n}th`} warning.${
        last ? " If repeated, this chat will be restricted for 24 hours." : ""
      } I am here to help you with Vaidhyashala's healthcare services.`,
    offline: (phone: string) => `Sorry, the chat is temporarily unavailable. Please call our clinic helpline at ${phone} or ${CLINIC_PHONE_ALT}.`,
    tooFast: (phone: string) => `You are sending messages too quickly. Please wait a minute, or call our clinic at ${phone}.`,
    footer: "100% Confidential & Secure Ayurvedic Care",
    privacy: "Consultation notes are kept confidential for your Ayurvedic doctor.",
    mantra: "ॐ धन्वन्तरये नमः · सर्वे भवन्तु सुखिनः",
    voiceOn: "Voice replies on",
    voiceOff: "Voice replies off",
    speaking: "speaking…",
    micStart: "Speak to Salu",
    micStop: "Stop and send",
    listening: "Listening… tap mic to send",
    transcribing: "Understanding your query…",
    micDenied: "Microphone access is blocked. Please allow mic in browser permissions or type your query here.",
    micFailed: "Sorry, could not hear clearly. Please try again or type your query.",
    blockedByTeam: "For genuine clinical emergencies, please call our clinic directly.",
    callStart: "Voice Call with Salu",
    callEnd: "End call",
    callHold: "Hold",
    callResume: "Resume",
    onHold: "Call on hold",
    onHoldHint: "Call on hold · tap Resume to continue",
    callMute: "Mute mic",
    callUnmute: "Unmute mic",
    inCall: "Live Voice Call · Listening",
    connecting: "Connecting voice call…",
    listeningCall: "Listening... speak freely or type here",
    interruptHint: "Speak anytime, I will pause and listen",
    muted: "Your mic is muted",
    noise: "Noise cancellation",
    noiseOnHint: "On: background noise filtered out",
    noiseOffHint: "Off: standard microphone input",
    micNotFound: "No microphone detected on this device. You can type here.",
    callFailed: "Voice call could not connect. Please type your message here.",
    callDropped: "Call ended. Tap the mic to talk again.",
    callIdle: "Call ended due to silence. Tap the mic to reconnect.",
    callEnding: "Call time limit reached. You may continue by typing here.",
    callEnded: "Voice call ended. You can continue typing here.",
    teamTitle: "Vaidhyashala Clinic Care",
    teamStatus: "Clinic doctor / team active",
    teamName: "Vaidhyashala Team",
    teamJoined: "Clinic doctor joined the chat",
    teamLeft: "Doctor stepped out. Salu is here to help.",
    teamOnCall: "Our clinic team is available here. Please type your query.",
    openFile: "Open file",
    online: "Online · Kalkaji Clinic",
    typing: "typing…",
    soundOn: "Notification sound on",
    soundOff: "Notification sound off",
    chatEnded: "This consultation session has ended.",
    resume: "Resume consultation",
    greeting: "Namaskar! 🙏",
    intro: (bot: string) => `I am ${bot}, your Ayurveda Care Assistant. Welcome to Vaidhyashala.`,
    askName: "May I know your good name, please?",
    nameFirst: "Namaskar! I would be glad to guide you. First, may I know your name?",
    badName: "Could you please tell me your name once more?",
    confirmSalutation: (first: string) => `May I address you as ${first} ji?`,
    askSalutation: "How would you prefer to be addressed?",
    noName: "You are welcome to explore our treatments without sharing your name. What health guidance do you seek?",
    welcome: (name: string) => (name ? `${name} ji, how may I assist your health and wellness today?` : "How may I assist your health and wellness today?"),
    welcomeBack: (name: string) => `Namaskar ${name} ji. Welcome back to Vaidhyashala. How can I help you today?`,
    thanks: (name: string) => `Thank you, ${name} ji.`,
    team: (phone: string) =>
      `Please share your 10-digit mobile number here and our Vaidhyas will call you for an appointment. You can also call us directly at ${phone}.`,
    openPage: "Open page",
  },
  hi: {
    subtitle: "आयुर्वेद केयर असिस्टेंट",
    placeholder: "अपनी स्वास्थ्य समस्या या सवाल यहाँ लिखें...",
    namePlaceholder: "अपना शुभ नाम लिखिए...",
    blockedPlaceholder: "यह चैट ब्लॉक है",
    blockedNote: "अनुचित भाषा के कारण चैट रोक दी गई है",
    blockedOpensIn: "चैट पुनः शुरू होगी",
    abuseHint: "कृपया मर्यादित भाषा का प्रयोग करें।",
    abuseReply: "मैं केवल वैद्यशाला की आयुर्वेदिक चिकित्सा, पंचकर्म एवं परामर्श के संदर्भ में सम्मानपूर्वक उत्तर देता हूँ।",
    abuseWarning: (n: number, last: boolean) =>
      `कृपया मर्यादित शब्दों का प्रयोग करें। यह आपकी ${n === 1 ? "पहली" : n === 2 ? "दूसरी" : `${n}वीं`} चेतावनी है।${
        last ? " दोबारा ऐसा होने पर चैट 24 घंटे के लिए बंद हो जाएगी।" : ""
      } मैं आपके स्वास्थ्य परामर्श के लिए यहाँ उपस्थित हूँ।`,
    offline: (phone: string) => `क्षमा करें, चैट अभी उपलब्ध नहीं है। कृपया क्लिनिक हेल्पलाइन ${phone} या ${CLINIC_PHONE_ALT} पर संपर्क करें।`,
    tooFast: (phone: string) => `आप बहुत जल्दी मैसेज भेज रहे हैं। कृपया कुछ क्षण रुकें या क्लिनिक हेल्पलाइन ${phone} पर कॉल करें।`,
    footer: "100% सुरक्षित एवं गोपनीय आयुर्वेदिक परामर्श",
    privacy: "आपकी स्वास्थ्य जानकारी हमारे डॉक्टरों के साथ पूर्णतः गोपनीय रखी जाती है।",
    mantra: "ॐ धन्वन्तरये नमः · सर्वे भवन्तु सुखिनः",
    voiceOn: "बोलकर जवाब चालू",
    voiceOff: "बोलकर जवाब बंद",
    speaking: "speaking…",
    micStart: "बोलकर पूछिए",
    micStop: "रोकिए और भेजिए",
    listening: "सुन रहा हूँ… भेजने के लिए माइक दबाएँ",
    transcribing: "समझ रहा हूँ…",
    micDenied: "माइक्रोफ़ोन की अनुमति नहीं है। कृपया ब्राउज़र में माइक चालू करें या यहाँ लिखें।",
    micFailed: "आवाज़ स्पष्ट नहीं आई। कृपया दोबारा बोलें या यहाँ लिख दें।",
    blockedByTeam: "किसी भी चिकित्सीय सहायता के लिए क्लिनिक हेल्पलाइन पर संपर्क करें।",
    callStart: "शालू से सीधी बात करें",
    callEnd: "कॉल समाप्त करें",
    callHold: "होल्ड",
    callResume: "जारी रखें",
    onHold: "कॉल होल्ड पर है",
    onHoldHint: "कॉल होल्ड पर है · बात जारी रखने के लिए 'जारी रखें' दबाएँ",
    callMute: "माइक म्यूट करें",
    callUnmute: "माइक अनम्यूट करें",
    inCall: "लाइव वॉइस कॉल · सुन रहा हूँ",
    connecting: "वॉइस कॉल जुड़ रही है…",
    listeningCall: "सुन रहा हूँ, निसंकोच बोलिए… या यहाँ लिखिए",
    interruptHint: "आप कभी भी बोल सकते हैं, मैं सुनकर उत्तर दूँगा",
    muted: "आपका माइक म्यूट है",
    noise: "Noise Cancellation (बैकग्राउंड शोर फ़िल्टर)",
    noiseOnHint: "चालू: बैकग्राउंड का शोर फ़िल्टर होता है",
    noiseOffHint: "बंद: सामान्य माइक्रोफ़ोन इनपुट",
    micNotFound: "डिवाइस पर माइक्रोफ़ोन नहीं मिला। आप यहाँ लिख सकते हैं।",
    callFailed: "वॉइस कॉल कनेक्ट नहीं हो सकी। कृपया यहाँ लिखकर बात करें।",
    callDropped: "कॉल समाप्त हो गई। दोबारा बात करने के लिए माइक दबाएँ।",
    callIdle: "काफ़ी देर शांत रहने के कारण कॉल बंद हुई। दोबारा बात करने के लिए माइक दबाएँ।",
    callEnding: "कॉल का समय पूरा हुआ। आप यहाँ लिखकर बात जारी रख सकते हैं।",
    callEnded: "वॉइस कॉल समाप्त हो गई। आप यहाँ लिखकर परामर्श जारी रख सकते हैं।",
    teamTitle: "वैद्यशाला क्लिनिक",
    teamStatus: "क्लिनिक डॉक्टर / टीम उपस्थित",
    teamName: "वैद्यशाला क्लिनिक टीम",
    teamJoined: "आयुर्वेदिक डॉक्टर चैट में जुड़े",
    teamLeft: "डॉक्टर ऑफ़लाइन हैं। शालू सहायता के लिए उपलब्ध है।",
    teamOnCall: "हमारी क्लिनिक टीम यहाँ उपलब्ध है। कृपया अपना संदेश लिखें।",
    openFile: "फ़ाइल खोलें",
    online: "ऑनलाइन · कालकाजी क्लिनिक",
    typing: "लिख रहे हैं…",
    soundOn: "नोटिफ़िकेशन साउंड चालू",
    soundOff: "नोटिफ़िकेशन साउंड बंद",
    chatEnded: "यह परामर्श सत्र समाप्त हो गया है।",
    resume: "सत्र पुनः शुरू करें",
    greeting: "नमस्कार! 🙏",
    intro: () => "मैं शालू, आपकी आयुर्वेद साथी। वैद्यशाला (आयुर्वेदिक क्लिनिक एवं पंचकर्म केंद्र) में आपका स्वागत करती हूँ।",
    askName: "मैं आपको किस नाम से संबोधित करूँ? आपका शुभ नाम क्या है?",
    nameFirst: "जी, मैं अवश्य मार्गदर्शन करूँगा। पहले कृपया अपना शुभ नाम बता दीजिए।",
    badName: "क्षमा करें, नाम स्पष्ट नहीं समझ आया। क्या एक बार फिर बताएँगे?",
    confirmSalutation: (first: string) => `क्या मैं आपको ${first} जी कहकर संबोधित कर सकता हूँ?`,
    askSalutation: "आपको किस नाम से संबोधित करना पसंद होगा?",
    noName: "बिल्कुल, आप बिना नाम बताए भी परामर्श ले सकते हैं। किस स्वास्थ्य विषय पर सहायता चाहिए?",
    welcome: (name: string) => (name ? `${name} जी, बताइए, आज आपके स्वास्थ्य के लिए क्या सहायता करूँ?` : "बताइए, आज आपके स्वास्थ्य के लिए क्या सहायता करूँ?"),
    welcomeBack: (name: string) => `नमस्कार ${name} जी! वैद्यशाला में आपका पुनः स्वागत है। आज किस समस्या में सहायता चाहिए?`,
    thanks: (name: string) => `धन्यवाद, ${name} जी।`,
    team: (phone: string) =>
      `कृपया अपना 10 अंकों का मोबाइल नंबर साझा करें, हमारे डॉक्टर अपॉइंटमेंट के लिए शीघ्र संपर्क करेंगे। सीधे बात करने के लिए ${phone} पर कॉल करें।`,
    openPage: "पेज देखें",
  },
};

type Chip =
  | { kind: "ask"; label: string }
  | { kind: "consult"; label: string }
  | { kind: "answer"; label: string; reply: string; options?: string[]; target?: string }
  | { kind: "team"; label: string };

interface Line {
  title?: string;
  text: string;
  chips?: Chip[];
  link?: { href: string; label: string };
}
interface ChatFile {
  href: string;
  label: string;
  type?: string;
  size?: number;
}
interface Message extends Line {
  id: number;
  from: "bot" | "user" | "agent";
  by?: string;
  event?: "joined" | "left";
  files?: ChatFile[];
  at?: number;
  live?: boolean;
  key?: string;
  pending?: boolean;
}

interface ChatConfig {
  enabled: boolean;
  name: string;
  subtitle: string;
  launcher: string;
  avatar: string;
  messages: Partial<Record<Lang, { welcomeGreeting?: string; welcomeMessage?: string }>> | null;
  buttons: Array<{ label: string; hindi?: string; action: string; reply?: string; options?: string[]; target?: string }> | null;
  greeting?: Record<Lang, { title: string; chat: string; again: string }> | null;
  helpline?: string;
}

const DEFAULT_CHIPS: Record<Lang, Chip[]> = {
  en: [
    { kind: "ask", label: "📞 Live Voice Call" },
    { kind: "consult", label: "🌿 Book Consultation" },
    { kind: "ask", label: "Panchakarma Therapies" },
    { kind: "ask", label: "Chronic Disease Care" },
    { kind: "ask", label: "Clinic Address & Timings" },
  ],
  hi: [
    { kind: "ask", label: "📞 लाइव वॉइस कॉल" },
    { kind: "consult", label: "🌿 डॉक्टर कंसल्टेशन बुक करें" },
    { kind: "ask", label: "पंचकर्म थैरेपीज़" },
    { kind: "ask", label: "पुराने रोगों का उपचार" },
    { kind: "ask", label: "क्लिनिक का पता एवं समय" },
  ],
};

const BOT_NAME = "Salu";
const AVATAR = "/images/chatbot/saumya-avatar.png";
const CHAT_BG = "/images/chatbot/vaidhyashala-bg.svg";
const TEMPLE_TOP = "/images/chatbot/vaidhyashala-top.svg";
const MANDALA = "/images/chatbot/mandala.svg";
const VOICE_KEY = "vds_chat_voice";
const NOISE_KEY = "vds_chat_noise";
const CALL_IDLE_MS = 120000;
const SESSION_KEY = "vds_chat_session";
const NAME_KEY = "vds_chat_name";
const SALUTATION_KEY = "vds_chat_salutation";
const MUTED_KEY = "vds_chat_muted";
const BLOCK_KEY = "vds_chat_block";
const STRIKES_TO_BLOCK = 3;
const BLOCK_MS = 24 * 60 * 60 * 1000;
const MAX_NAME_ASKS = 3;
const CHAT_END_AFTER_GOODBYE_MS = 10000;

const FOREIGN_LETTERS = new RegExp(
  "(?![\\p{Script=Latin}\\p{Script=Devanagari}\\p{Script=Arabic}\\p{Script=Gurmukhi}\\p{Script=Gujarati}\\p{Script=Bengali}\\p{Script=Tamil}\\p{Script=Telugu}\\p{Script=Kannada}\\p{Script=Malayalam}\\p{Script=Oriya}])\\p{L}",
  "u"
);
const WANTS_TO_TYPE = /\b(likh\w*|type\w*|typing|text|chat)\b|लिख/i;
const WANTS_TO_TALK = /\b(talk|speak|voice|call|bol\w*|baat)\b|बोल|बात/i;
const LEAST_CONFIDENCE = -0.7;
const misheard = (text: string, logprobs?: Array<{ logprob: number }>) =>
  FOREIGN_LETTERS.test(text) || Boolean(logprobs?.length && logprobs.reduce((sum, w) => sum + w.logprob, 0) / logprobs.length < LEAST_CONFIDENCE);

interface CallEvent {
  type: string;
  item_id?: string;
  delta?: string;
  transcript?: string;
  text?: string;
  logprobs?: Array<{ logprob: number }>;
  item?: { id: string; type: string; role?: string; content?: Array<{ type: string }> };
  response?: { status?: string; output?: Array<{ type: string; name?: string; call_id?: string; arguments?: string }> };
  error?: { code?: string; message?: string };
}

/* Helpers */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const now = () => Date.now();

const stored = (key: string) => {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
};
const store = (key: string, value: string) => {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

const isKnownName = (name?: string | null): boolean => {
  if (!name) return false;
  const n = name.trim();
  if (!n || n.length < 2) return false;
  const lower = n.toLowerCase();
  return lower !== "visitor" && lower !== "null" && lower !== "undefined" && lower !== "unknown";
};

const newSessionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `vds-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const readBlock = (): { strikes: number; until: number } => {
  try {
    const saved = JSON.parse(stored(BLOCK_KEY) || "{}");
    return { strikes: Number(saved.strikes) || 0, until: Number(saved.until) || 0 };
  } catch {
    return { strikes: 0, until: 0 };
  }
};
const blockedUntil = () => {
  const { until } = readBlock();
  return until > Date.now() ? until : 0;
};
const countdown = (ms: number) => {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map((n) => String(n).padStart(2, "0")).join(":");
};
const timeOf = (at: number) => new Date(at).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

const HINGLISH = new Set(
  "hai hain kya kaise kaisa kab kahan kitna kitne kitni mujhe mera meri mere aap aapka aapki aapke kripya nahi nahin chahiye karna karni karo kar batao bataiye haan ho hoga hogi sakta sakte ke ki ka liye mein se ko bhi toh tha thi hum hamare humein hamara koi kuch abhi jaldi ghar par wala wali dijiye kijiye ilaj dava dawai doctor".split(" ")
);
const ENGLISH = new Set("the is are what how please my you your can do does need want for of to and with about when where which there have has will would could should treatment clinic doctor".split(" "));
const detectLang = (text: string): Lang | null => {
  if (/[ऀ-ॿ]/.test(text)) return "hi";
  const words = text.toLowerCase().match(/[a-z]+/g) || [];
  const hi = words.filter((w) => HINGLISH.has(w)).length;
  const en = words.filter((w) => ENGLISH.has(w)).length;
  if (hi >= 2 && hi > en) return "hi";
  if (en >= 2 && en > hi) return "en";
  return null;
};

const GREETING = /^(hi+|hello+|helo|hey+|hlo|namaste|namaskar|namaskaar|pranam|good (morning|afternoon|evening|day)|ok(ay)?|yes|haa?n?|ji|hmm+|thanks?|thank you)[\s!.🙏]*$/iu;
const REFUSES = /\b(no|nope|nahi|nhi|nahin|skip|later|baad (me|mein)|kyu|kyun|kyon|why|not now)\b/i;
const NAME_INTRO = /^(?:my name is|my name's|name is|i am|i'm|im|this is|it's|its|myself|mera naam|mera nam|naam|main|mai)\s+(.+)$/i;
const NOT_A_NAME = new Set(
  (
    "what how when where why who which price prices cost rate rates charges need want help service services treatment panchakarma booking book " +
    "kya kaise kab kahan kitna kitne kaun chahiye karna batao bataiye please plz mujhe hume hamein is are the a an do does can you " +
    "vamana virechana basti nasya shirodhara abhyanga kalkaji doctor consultation appointment nadi pariksha clinic medicine " +
    "hi hello hey namaste namaskar ok okay yes no haan ji thanks thank sir madam mam " +
    "kisne banaya banaya developer creator maker"
  ).split(" ")
);
const CREATOR_QUERY = /\b(kisne banaya|kisne banaya hai|kisne banaya h|kisne create kiya|kisne develop kiya|who made (you|this)|who created (you|this)|who developed (you|this)|who is (your developer|the developer|your creator)|who built (you|this)|who is rohit|rohit kumar)\b|किसने बनाया|किसने बनाया है|किसने डेवलप किया|रोहित कुमार/i;
const SAYS_YES = /^(ha+n?|haa+|han ji|haan ji|ji|ji ha+n|ji haan|yes|yeah|yup|ok(ay)?|sure|bilkul|zaroor|theek hai|thik hai|sahi hai|hmm+|kar sakti hain?|kar sakte hain?)\b[\s!.🙏]*/iu;
const SAYS_NO = /^(nahi+n?|nhi|nahin|na|no|nope|ji nahi+n?)\b[\s,.!]*/iu;
const ADDRESS_WORDS = /\b(mujhe|muje|aap|please|plz|kahiye|kahein|kahe|kaho|bulaiye|bulayein|bulao|boliye|bolo|call me|kehkar|keh kar|sambodhit|kariye|karein|ji|jee)\b/giu;
const URGENT = /(urgent|emergency|turant|jaldi|abhi chahiye|dard|pain|acute|severe|तुरंत|जल्दी|दर्द)/iu;

const extractName = (text: string): string | null => {
  let name = text.trim().replace(/[\s.!🙏]+$/u, "");
  const intro = name.match(NAME_INTRO);
  if (intro) name = intro[1];
  name = name
    .replace(/\s+(?:hai|hain|hu|hoon|hun|here)$/i, "")
    .replace(/\s+(?:ji|jee|जी)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (name.length < 2 || name.length > 40 || !/^\p{L}[\p{L}\p{M} .'-]*$/u.test(name)) return null;
  const words = name.split(" ");
  if (words.length > 3 || words.some((w) => NOT_A_NAME.has(w.toLowerCase()))) return null;
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const VISITOR_DONE = /^(ok(ay)?|thanks?|thank (you|u)|ty|bye|good ?bye|dhanyavaad|dhanyawad|dhanywad|shukriya|theek hai|thik hai|bas|nothing( else)?|no thanks?)\b[\s\w!.🙏]*$/iu;

const SITE_HOSTS = new Set(["vaidhyashala.com", "www.vaidhyashala.com", new URL(SITE_URL).host]);
const internalPath = (href: string) => {
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(/^https?:\/\//i.test(href) ? href : `https://${href}`);
    if (SITE_HOSTS.has(url.host) || url.host === window.location.host) return `${url.pathname}${url.search}${url.hash}` || "/";
  } catch {
    // ignore
  }
  return null;
};
const LINK_CLASS = "font-semibold text-[#0b3d2e] underline decoration-[#bf8a2e]/60 underline-offset-2 hover:decoration-[#bf8a2e]";
function ChatLink({ href, children, onNavigate }: { href: string; children: ReactNode; onNavigate: () => void }) {
  const path = internalPath(href);
  if (path)
    return (
      <Link href={path} onClick={onNavigate} className={LINK_CLASS}>
        {children}
      </Link>
    );
  return (
    <a href={/^https?:\/\//i.test(href) ? href : `https://${href}`} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {children}
    </a>
  );
}

const TOKEN = /\[([^\]\n]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)|\*\*([^*\n]+)\*\*|(https?:\/\/[^\s<>()]*[^\s<>().,!?;:'"])|(\+(?:91|44)[\s-]?\d{2,5}(?:[\s-]?\d{2,5}){1,3})/g;
const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
function RichText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  return (
    <>
      {text.split("\n").map((raw, i) => {
        const line = raw.replace(/^\s*#{1,6}\s+/, "");
        if (!line.trim()) return <span key={i} className="block h-1.5" />;
        const bullet = /^\s*[-*•]\s+/.test(line);
        const body = bullet ? line.replace(/^\s*[-*•]\s+/, "") : line;
        const parts: ReactNode[] = [];
        let last = 0;
        for (const m of body.matchAll(TOKEN)) {
          const at = m.index ?? 0;
          if (at > last) parts.push(body.slice(last, at));
          if (m[3]) parts.push(<strong key={at} className="font-semibold text-[#0b3d2e]">{m[3]}</strong>);
          else if (m[5])
            parts.push(
              <a key={at} href={`tel:${m[5].replace(/[^\d+]/g, "")}`} className={`${LINK_CLASS} whitespace-nowrap`}>
                {m[5]}
              </a>
            );
          else
            parts.push(
              <ChatLink key={at} href={m[2] || m[4]} onNavigate={onNavigate}>
                {m[1] || prettyUrl(m[4])}
              </ChatLink>
            );
          last = at + m[0].length;
        }
        if (last < body.length) parts.push(body.slice(last));
        return bullet ? (
          <span key={i} className="flex gap-2">
            <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[#bf8a2e]" />
            <span className="min-w-0">{parts}</span>
          </span>
        ) : (
          <span key={i} className="block">
            {parts}
          </span>
        );
      })}
    </>
  );
}

/* Icons */
const Svg = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    {children}
  </svg>
);
const CloseIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);
const MinusIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M5 12h14" />
  </Svg>
);
const SendIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Svg>
);
const BellIcon = ({ off, className }: { off: boolean; className?: string }) => (
  <Svg className={className}>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    {off ? (
      <>
        <path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5" />
        <path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7" />
        <path d="m2 2 20 20" />
      </>
    ) : (
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    )}
  </Svg>
);
const BanIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
  </Svg>
);
const VolumeIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M11 5 6 9H2v6h4l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
  </Svg>
);
const VolumeOffIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M11 5 6 9H2v6h4l5 4z" />
    <path d="m22 9-6 6M16 9l6 6" />
  </Svg>
);
const HeadsetIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </Svg>
);
const FileIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h5" />
  </Svg>
);
const MicIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
  </Svg>
);
const SpinnerIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M21 12a9 9 0 1 1-6.2-8.56" />
  </Svg>
);
const PauseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);
const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
  </svg>
);
const PhoneOffIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 4.2 2 2 0 0 1 5.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.9 9.7" />
    <path d="M22 2 2 22" />
  </Svg>
);
const MicOffIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M2 2l20 20M9 9v1a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.7M17 16.9A7 7 0 0 1 5 10M19 10a7 7 0 0 1-.1 1.2M12 17v5M8 22h8" />
  </Svg>
);
const ShieldIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
const InfoIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </Svg>
);
const LeafMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openRef: RefObject<(() => void) | null>;
  openAtOnce: boolean;
  onConfig: (settings: { enabled: boolean; label: string }) => void;
}

const Chatbot = ({ isOpen, setIsOpen, openRef, openAtOnce, onConfig }: ChatbotProps) => {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lang, setLang] = useState<Lang>("hi");
  const [muted, setMuted] = useState(() => stored(MUTED_KEY) === "1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [askingName, setAskingName] = useState(() => !isKnownName(stored(NAME_KEY)));
  const [teamLive, setTeamLive] = useState(false);
  const teamLiveRef = useRef(false);
  const [blockedTill, setBlockedTill] = useState(blockedUntil);
  const [clock, setClock] = useState(now);
  const [chatEnded, setChatEnded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);

  const configRef = useRef<ChatConfig | null>(null);
  const langRef = useRef<Lang>("hi");
  const mutedRef = useRef(muted);
  const phoneRef = useRef(CLINIC_PHONE);
  const idRef = useRef(0);
  const aliveRef = useRef(true);
  const activeRef = useRef(false);
  const startedRef = useRef(false);
  const sessionIdRef = useRef("");
  const nameRef = useRef("");
  const nameAsksRef = useRef(0);
  const salutationRef = useRef<{ name: string; first: string; choosing?: boolean } | null>(null);
  const pendingRef = useRef("");
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const audioRef = useRef<AudioContext | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closingAtRef = useRef<number | null>(null);

  /* Voice TTS & Audio Recording */
  const [voiceOn, setVoiceOn] = useState(() => stored(VOICE_KEY) !== "0");
  const voiceOnRef = useRef(stored(VOICE_KEY) !== "0");
  const [speaking, setSpeaking] = useState(false);
  const [mic, setMic] = useState<"idle" | "recording" | "transcribing">("idle");
  const [canRecord] = useState(() => typeof MediaRecorder !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia));
  const speechRef = useRef<{ queue: Promise<void>; audio: HTMLAudioElement | null; abort: AbortController | null; token: number }>({
    queue: Promise.resolve(),
    audio: null,
    abort: null,
    token: 0,
  });
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /* Live Spoken Voice Call (OpenAI Realtime over WebRTC) */
  const [canTalk] = useState(canCall);
  const [callState, setCallState] = useState<"off" | "connecting" | "on">("off");
  const [micMuted, setMicMuted] = useState(false);
  const [onHold, setOnHold] = useState(false);
  const onHoldRef = useRef(false);
  const [noiseOn, setNoiseOn] = useState(() => stored(NOISE_KEY) !== "0");
  const callRef = useRef<Call | null>(null);
  const micRingRef = useRef<HTMLSpanElement>(null);
  const heardRef = useRef(new Map<string, string>());
  const botTextRef = useRef(new Map<string, string>());
  const lastActivityRef = useRef(0);
  const endAfterSpeechRef = useRef(false);
  const callTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const endCallRef = useRef<(note?: string) => void>(() => {});
  const onCallEventRef = useRef<(event: CallEvent) => void>(() => {});
  const choosingRef = useRef(false);
  const endedByHandRef = useRef(false);
  const callGenRef = useRef(0);
  const startingRef = useRef(false);
  const inCall = callState === "on";

  const t = COPY[lang];
  const blocked = blockedTill > clock;
  const inputIsAbusive = input.trim().length > 0 && isAbusive(input);
  const botName = config?.name || BOT_NAME;
  const avatar = config?.avatar || AVATAR;

  useEffect(() => {
    activeRef.current = isOpen && !isMinimized;
  }, [isOpen, isMinimized]);

  useEffect(() => {
    aliveRef.current = true;
    sessionIdRef.current = stored(SESSION_KEY) || newSessionId();
    store(SESSION_KEY, sessionIdRef.current);
    const rawName = stored(NAME_KEY);
    if (isKnownName(rawName)) {
      nameRef.current = rawName.trim();
      setAskingName(false);
    } else {
      nameRef.current = "";
      store(NAME_KEY, "");
      store(SALUTATION_KEY, "");
      setAskingName(true);
    }
    const speech = speechRef.current;
    return () => {
      aliveRef.current = false;
      void audioRef.current?.close();
      speech.token += 1;
      speech.abort?.abort();
      speech.audio?.pause();
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      endCallRef.current();
    };
  }, []);

  useEffect(() => {
    if (!API) return;
    const controller = new AbortController();
    fetch(`${API}/chat/config`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        const data = body?.data as ChatConfig | undefined;
        if (!data) return;
        configRef.current = data;
        setConfig(data);
        onConfig({ enabled: data.enabled !== false, label: data.launcher || "" });
      })
      .catch(() => {});
    return () => controller.abort();
  }, [onConfig]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen || isMinimized || !window.matchMedia("(max-width: 639px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (!blockedTill) return;
    const tick = setInterval(() => {
      setClock(Date.now());
      if (Date.now() >= blockedTill) setBlockedTill(0);
    }, 1000);
    return () => clearInterval(tick);
  }, [blockedTill]);

  /* Synthesized Web Audio Sound FX */
  const audio = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      const ctx = (audioRef.current ??= new Ctx());
      if (ctx.state === "suspended") void ctx.resume();
      return ctx;
    } catch {
      return null;
    }
  };

  const chime = (notes: Array<[freq: number, at: number]>, volume: number, ring: number) => {
    if (mutedRef.current) return;
    const ctx = audio();
    if (!ctx) return;
    const start = ctx.currentTime + 0.01;
    const out = ctx.createDynamicsCompressor();
    out.connect(ctx.destination);
    notes.forEach(([freq, at]) => {
      [
        { type: "sine" as OscillatorType, mult: 1, level: volume },
        { type: "triangle" as OscillatorType, mult: 2, level: volume * 0.25 },
      ].forEach(({ type, mult, level }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq * mult;
        gain.gain.setValueAtTime(0.0001, start + at);
        gain.gain.exponentialRampToValueAtTime(level, start + at + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + at + ring);
        osc.connect(gain).connect(out);
        osc.start(start + at);
        osc.stop(start + at + ring + 0.05);
      });
    });
  };

  const playIncoming = () => chime([[880, 0], [1318.5, 0.13]], 0.32, 0.55);
  const playOpen = () => {
    if (mutedRef.current) return;
    const ctx = audio();
    if (!ctx) return;
    const start = ctx.currentTime + 0.02;
    const out = ctx.createDynamicsCompressor();
    out.connect(ctx.destination);
    [
      { at: 0, level: 0.3 },
      { at: 0.32, level: 0.16 },
    ].forEach(({ at, level }) => {
      [
        { ratio: 1, amp: 1, ring: 2.4 },
        { ratio: 2.0, amp: 0.45, ring: 1.8 },
        { ratio: 2.76, amp: 0.32, ring: 1.4 },
        { ratio: 4.07, amp: 0.18, ring: 0.9 },
        { ratio: 5.4, amp: 0.1, ring: 0.6 },
      ].forEach(({ ratio, amp, ring }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 784 * ratio;
        gain.gain.setValueAtTime(0.0001, start + at);
        gain.gain.exponentialRampToValueAtTime(level * amp, start + at + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + at + ring);
        osc.connect(gain).connect(out);
        osc.start(start + at);
        osc.stop(start + at + ring + 0.05);
      });
    });
  };

  const playSent = () => {
    if (mutedRef.current) return;
    const ctx = audio();
    if (!ctx) return;
    const start = ctx.currentTime + 0.01;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, start);
    osc.frequency.exponentialRampToValueAtTime(380, start + 0.09);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.15);
  };

  const stopSpeaking = () => {
    const s = speechRef.current;
    s.token += 1;
    s.abort?.abort();
    s.audio?.pause();
    s.audio = null;
    s.queue = Promise.resolve();
    setSpeaking(false);
  };

  const revealWordBoundary = (full: string, ratio: number) => {
    if (ratio >= 0.99) return full;
    const target = Math.max(1, Math.floor(full.length * ratio));
    const nextSpace = full.indexOf(" ", target);
    return full.slice(0, nextSpace > 0 && nextSpace - target < 14 ? nextSpace : target);
  };

  const speakSynced = (
    spokenText: string,
    displayText: string,
    onProgress: (partial: string) => void,
    onDone?: () => void
  ): Promise<void> => {
    if (!API || !voiceOnRef.current || !spokenText.trim() || callRef.current) {
      onProgress(displayText);
      onDone?.();
      return Promise.resolve();
    }
    const s = speechRef.current;
    const token = s.token;
    s.queue = s.queue.then(async () => {
      if (token !== s.token || !activeRef.current) {
        onProgress(displayText);
        onDone?.();
        return;
      }
      const abort = new AbortController();
      s.abort = abort;
      let played = false;
      try {
        const res = await fetch(`${API}/chat/speak`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: spokenText.slice(0, 1500) }),
          signal: abort.signal,
        });
        if (!res.ok || token !== s.token) return;
        const url = URL.createObjectURL(await res.blob());
        if (token !== s.token) {
          URL.revokeObjectURL(url);
          return;
        }
        const player = new Audio(url);
        s.audio = player;
        await new Promise<void>((resolve) => {
          let rafId = 0;
          const stopSync = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
          };
          const tick = () => {
            if (token !== s.token || player.paused || player.ended) {
              stopSync();
              return;
            }
            const dur = Number.isFinite(player.duration) && player.duration > 0 ? player.duration : Math.max(2.5, displayText.length * 0.095);
            const ratio = Math.min(1, Math.max(0.02, player.currentTime / dur));
            onProgress(revealWordBoundary(displayText, ratio));
            rafId = requestAnimationFrame(tick);
          };
          player.onplay = () => {
            played = true;
            setSpeaking(true);
            tick();
          };
          player.onended = () => {
            stopSync();
            onProgress(displayText);
            resolve();
          };
          player.onerror = () => {
            stopSync();
            resolve();
          };
          player.onpause = () => {
            stopSync();
            resolve();
          };
          player.play().catch(() => {
            stopSync();
            resolve();
          });
        });
        URL.revokeObjectURL(url);
      } catch {
        // fallback below
      } finally {
        if (!played && aliveRef.current && displayText.length > 0) {
          const stepMs = 45;
          const totalSteps = Math.min(40, Math.max(8, Math.ceil(displayText.length / 4)));
          for (let i = 1; i <= totalSteps; i++) {
            if (!aliveRef.current || token !== s.token) break;
            onProgress(revealWordBoundary(displayText, i / totalSteps));
            await sleep(stepMs);
          }
        }
        onProgress(displayText);
        onDone?.();
        if (token === s.token) {
          s.audio = null;
          setSpeaking(false);
        }
      }
    });
    return s.queue;
  };

  const speak = (text: string) => {
    if (!API || !voiceOnRef.current || !text.trim() || callRef.current) return;
    const s = speechRef.current;
    const token = s.token;
    s.queue = s.queue.then(async () => {
      if (token !== s.token || !activeRef.current) return;
      const abort = new AbortController();
      s.abort = abort;
      try {
        const res = await fetch(`${API}/chat/speak`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.slice(0, 1500) }),
          signal: abort.signal,
        });
        if (!res.ok || token !== s.token) return;
        const url = URL.createObjectURL(await res.blob());
        if (token !== s.token) return URL.revokeObjectURL(url);
        const player = new Audio(url);
        s.audio = player;
        setSpeaking(true);
        await new Promise<void>((resolve) => {
          player.onended = () => resolve();
          player.onerror = () => resolve();
          player.onpause = () => resolve();
          player.play().catch(() => resolve());
        });
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      } finally {
        if (token === s.token) {
          s.audio = null;
          setSpeaking(false);
        }
      }
    });
  };

  const setVoice = (on: boolean) => {
    voiceOnRef.current = on;
    setVoiceOn(on);
    store(VOICE_KEY, on ? "1" : "0");
  };

  const toggleVoice = () => {
    audio();
    if (voiceOn) {
      setVoice(false);
      stopSpeaking();
      return;
    }
    setVoice(true);
    const last = [...messages].reverse().find((m) => m.from === "bot" && !m.live);
    if (last) speak([last.title, last.text].filter(Boolean).join(". "));
  };

  const startRecording = async () => {
    if (mic !== "idle" || blocked || busy || chatEnded || !API) return;
    stopSpeaking();
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      void botSay([{ text: copy().micDenied }]);
      return;
    }
    const type = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported?.(m)) || "";
    const recorder = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    const parts: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size) parts.push(e.data);
    };
    recorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      clearTimeout(recordTimerRef.current);
      recorderRef.current = null;
      const blob = new Blob(parts, { type: recorder.mimeType || "audio/webm" });
      if (!aliveRef.current) return;
      if (blob.size < 1500) {
        setMic("idle");
        return;
      }
      setMic("transcribing");
      try {
        const form = new FormData();
        form.append("audio", blob, `speech.${/mp4/.test(blob.type) ? "m4a" : /ogg/.test(blob.type) ? "ogg" : "webm"}`);
        const res = await fetch(`${API}/chat/transcribe`, { method: "POST", body: form });
        const body = await res.json().catch(() => null);
        const said = String(body?.data?.text || "").trim();
        setMic("idle");
        if (!res.ok || !said) {
          void botSay([{ text: res.status === 429 ? copy().tooFast(phoneRef.current) : copy().micFailed }]);
          return;
        }
        if (!voiceOnRef.current) setVoice(true);
        send(said);
      } catch {
        setMic("idle");
        void botSay([{ text: copy().micFailed }]);
      }
    };
    recorderRef.current = recorder;
    recorder.start();
    setMic("recording");
    recordTimerRef.current = setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
    }, 30000);
  };

  const updateBubble = (key: string, from: Message["from"], change: Partial<Message>) =>
    setMessages((prev) => {
      const at = prev.findIndex((m) => m.key === key);
      if (at < 0) return [...prev, { id: ++idRef.current, from, key, text: "", at: Date.now(), live: true, ...change }];
      const next = [...prev];
      next[at] = { ...next[at], ...change };
      return next;
    });
  const dropBubble = (key: string) => setMessages((prev) => prev.filter((m) => m.key !== key));

  const saveTurn = (role: "user" | "assistant", text: string, key?: string) => {
    const from: Message["from"] = role === "user" ? "user" : "bot";
    const show = (shown: string) => key && updateBubble(key, from, { text: shown, live: false, pending: false, at: Date.now() });
    if (!API) {
      show(text);
      return;
    }
    if (key) show(text);
    void fetch(`${API}/chat/call/turn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionIdRef.current, role, text }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        const shown = body?.data?.text;
        show(typeof shown === "string" && shown ? shown : text);
      })
      .catch(() => show(text));
  };

  const continueTyping = () => {
    startedRef.current = true;
    const shown = addressOf();
    if (!isKnownName(nameRef.current)) {
      setAskingName(true);
      void botSay([{ text: copy().askName }]);
    } else {
      setAskingName(false);
      void botSay([{ text: copy().welcome(shown), chips: chips() }]);
    }
  };

  const runCallTools = async (requested: NonNullable<NonNullable<CallEvent["response"]>["output"]>) => {
    let replyAgain = false;
    for (const tool of requested) {
      const call = callRef.current;
      if (!call || !tool.call_id) return;
      if (tool.name === "continue_typing") {
        call.send({ type: "conversation.item.create", item: { type: "function_call_output", call_id: tool.call_id, output: JSON.stringify({ ok: true }) } });
        choosingRef.current = false;
        endedByHandRef.current = true;
        endCallRef.current();
        continueTyping();
        return;
      }
      if (tool.name === "end_conversation") {
        call.send({ type: "conversation.item.create", item: { type: "function_call_output", call_id: tool.call_id, output: JSON.stringify({ ok: true }) } });
        endAfterSpeechRef.current = true;
        setTimeout(() => endAfterSpeechRef.current && endCallRef.current(copy().callEnded), 20000);
        continue;
      }
      let output: unknown = { ok: false };
      try {
        let args: unknown = {};
        try {
          args = JSON.parse(tool.arguments || "{}");
        } catch {
          // ignore
        }
        const res = await fetch(`${API}/chat/call/tool`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current, name: tool.name, args }),
        });
        const data = (await res.json())?.data;
        output = data?.output ?? output;
        if (data?.name && isKnownName(data.name)) {
          remember(sessionIdRef.current, data.name, data.salutation || data.name);
          setAskingName(false);
          pendingRef.current = "";
        }
      } catch {
        // ignore
      }
      callRef.current?.send({ type: "conversation.item.create", item: { type: "function_call_output", call_id: tool.call_id, output: JSON.stringify(output) } });
      replyAgain = true;
    }
    if (replyAgain) callRef.current?.send({ type: "response.create" });
  };

  const onCallEvent = (event: CallEvent) => {
    switch (event.type) {
      case "conversation.item.added": {
        const { item } = event;
        if (item?.type !== "message" || item.content?.some((part) => part.type === "input_text")) break;
        if (item.role === "user") updateBubble(item.id, "user", {});
        else if (item.role === "assistant") updateBubble(item.id, "bot", {});
        break;
      }
      case "input_audio_buffer.speech_started":
        lastActivityRef.current = Date.now();
        break;
      case "pipeline.heard":
        lastActivityRef.current = Date.now();
        if (event.item_id && event.text) {
          if (FOREIGN_LETTERS.test(event.text)) {
            updateBubble(event.item_id, "user", { text: "" });
            break;
          }
          updateBubble(event.item_id, "user", { text: isAbusive(event.text) || isAbusive(toRoman(event.text)) ? "" : event.text });
        }
        break;
      case "conversation.item.input_audio_transcription.delta": {
        if (!event.item_id) break;
        const heard = (heardRef.current.get(event.item_id) || "") + (event.delta || "");
        heardRef.current.set(event.item_id, heard);
        updateBubble(event.item_id, "user", { text: heard });
        break;
      }
      case "conversation.item.input_audio_transcription.completed": {
        lastActivityRef.current = Date.now();
        if (!event.item_id) break;
        heardRef.current.delete(event.item_id);
        const text = (event.transcript || "").trim();
        if (!text) {
          dropBubble(event.item_id);
          break;
        }
        if (misheard(text, event.logprobs)) {
          dropBubble(event.item_id);
          callRef.current?.send({ type: "response.cancel" });
          callRef.current?.send({ type: "output_audio_buffer.clear" });
          callRef.current?.send({ type: "conversation.item.delete", item_id: event.item_id });
          break;
        }
        choosingRef.current = false;
        if (isAbusive(text)) {
          dropBubble(event.item_id);
          callRef.current?.send({ type: "response.cancel" });
          callRef.current?.send({ type: "output_audio_buffer.clear" });
          callRef.current?.send({ type: "conversation.item.delete", item_id: event.item_id });
          void strike();
          break;
        }
        switchLang(text);
        saveTurn("user", text, event.item_id);
        break;
      }
      case "conversation.item.input_audio_transcription.failed":
        if (event.item_id) {
          heardRef.current.delete(event.item_id);
          dropBubble(event.item_id);
        }
        break;
      case "response.output_audio_transcript.delta":
        if (event.item_id) {
          const said = (botTextRef.current.get(event.item_id) || "") + (event.delta || "");
          botTextRef.current.set(event.item_id, said);
          updateBubble(event.item_id, "bot", { text: said });
        }
        break;
      case "response.output_audio_transcript.done": {
        if (!event.item_id) break;
        botTextRef.current.delete(event.item_id);
        const text = (event.transcript || "").trim().replace(/^["“”']+|["“”']+$/g, "").trim();
        if (!text) {
          dropBubble(event.item_id);
          break;
        }
        if (activeRef.current) playIncoming();
        saveTurn("assistant", text, event.item_id);
        break;
      }
      case "response.done": {
        const unfinished = new Map(botTextRef.current);
        botTextRef.current.clear();
        unfinished.forEach((said, key) => {
          if (said.trim()) saveTurn("assistant", said.trim(), key);
        });
        setMessages((prev) => prev.filter((m) => !(m.from === "bot" && m.key && m.live && !m.text && !m.pending)));
        const requested = (event.response?.output || []).filter((item) => item.type === "function_call");
        if (event.response?.status === "completed" && requested.length) void runCallTools(requested);
        break;
      }
      case "output_audio_buffer.started":
        lastActivityRef.current = Date.now();
        setSpeaking(true);
        callRef.current?.setAssistantTalking(true);
        break;
      case "output_audio_buffer.stopped":
      case "output_audio_buffer.cleared":
        lastActivityRef.current = Date.now();
        setSpeaking(false);
        callRef.current?.setAssistantTalking(false);
        if (endAfterSpeechRef.current) endCallRef.current(copy().callEnded);
        break;
      case "error":
        console.warn("[VaidhyaMitra] call error:", event.error?.code, event.error?.message);
        break;
      default:
        break;
    }
  };

  const endCall = (note?: string) => {
    callGenRef.current += 1;
    const call = callRef.current;
    if (!call) {
      if (startingRef.current) {
        startingRef.current = false;
        setCallState("off");
      }
      return;
    }
    callRef.current = null;
    endAfterSpeechRef.current = false;
    onHoldRef.current = false;
    setOnHold(false);
    call.stop();
    clearTimeout(callTimerRef.current);
    heardRef.current.clear();
    botTextRef.current.clear();
    setCallState("off");
    setSpeaking(false);
    void fetch(`${API}/chat/call/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionIdRef.current }),
    }).catch(() => {});
    if (note) void botSay([{ text: note }]);
  };

  useEffect(() => {
    endCallRef.current = endCall;
    onCallEventRef.current = onCallEvent;
  });

  useEffect(() => {
    if (!inCall) return;
    const timer = setInterval(() => {
      if (!onHoldRef.current && Date.now() - lastActivityRef.current > CALL_IDLE_MS) endCallRef.current(COPY[langRef.current].callIdle);
    }, 5000);
    return () => clearInterval(timer);
  }, [inCall]);

  const startCall = async (askTalkOrType = false) => {
    if (callRef.current || startingRef.current || blocked || chatEnded || !API) return;
    startingRef.current = true;
    const gen = ++callGenRef.current;
    stopSpeaking();
    setCallState("connecting");
    let maxSeconds = 600;
    let name = addressOf();
    let greeting = "";
    type Opened = { engine?: string; token?: string; sdp?: string; sessionId: string; maxSeconds: number; name: string; greeting?: string };

    const ask = async (request: object): Promise<Opened> => {
      const res = await fetch(`${API}/chat/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, sessionId: sessionIdRef.current, pageUrl: window.location.pathname, noise: noiseOn }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        if (body?.code === "BLOCKED") blockFor(body.blockedFor);
        throw new Error(body?.code || "CALL_FAILED");
      }
      const data = body.data as Opened;
      if (data.engine === "realtime") return data;
      greeting = data.greeting || "";
      if (data.sessionId && data.sessionId !== sessionIdRef.current) {
        sessionIdRef.current = data.sessionId;
        store(SESSION_KEY, data.sessionId);
      }
      maxSeconds = data.maxSeconds || maxSeconds;
      name = data.name || name;
      return data;
    };

    const callEvents = {
      onEvent: (event: { type: string; [key: string]: unknown }) => onCallEventRef.current(event as unknown as CallEvent),
      onLevel: (level: number) => {
        const ring = micRingRef.current;
        if (ring) ring.style.transform = `scale(${1 + Math.min(level * 14, 0.7)})`;
      },
      onClosed: () => endCallRef.current(COPY[langRef.current].callDropped),
    };

    try {
      let call: Call | null = null;
      if (!call) call = await openCall({ ...callEvents, connect: async (offer) => (await ask({ sdp: offer })).sdp || "" }, { noiseCancel: noiseOn });
      startingRef.current = false;
      if (gen !== callGenRef.current || !aliveRef.current || !activeRef.current) {
        call.stop();
        void fetch(`${API}/chat/call/end`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        }).catch(() => {});
        if (gen === callGenRef.current) setCallState("off");
        return;
      }
      callRef.current = call;
      lastActivityRef.current = Date.now();
      setCallState("on");
      setMicMuted(false);
      choosingRef.current = askTalkOrType;
      const welcome =
        greeting ||
        (isKnownName(name)
          ? `नमस्कार ${name} जी! मैं शालू। बताइए, आज आपके स्वास्थ्य के लिए क्या सहायता करूँ?`
          : "नमस्कार! मैं शालू, आपकी आयुर्वेद साथी। वैद्यशाला में आपका स्वागत करती हूँ। मैं आपको किस नाम से संबोधित करूँ? आपका शुभ नाम क्या है?");

      call.send({
        type: "response.create",
        response: { instructions: `Greet the visitor now, warmly and naturally in your calm Ayurvedic assistant voice in Hindi written in Devanagari: "${welcome}"` },
      });
      clearTimeout(callTimerRef.current);
      callTimerRef.current = setTimeout(() => endCallRef.current(COPY[langRef.current].callEnding), maxSeconds * 1000);
    } catch (error) {
      startingRef.current = false;
      if (gen !== callGenRef.current) return;
      setCallState("off");
      if (blockedTill > Date.now()) return;
      if (askTalkOrType) {
        endedByHandRef.current = true;
        if (!messages.length) void startChat();
        else continueTyping();
        return;
      }
      const reason = (error as DOMException)?.name;
      void botSay([
        { text: reason === "NotAllowedError" ? copy().micDenied : reason === "NotFoundError" ? copy().micNotFound : copy().callFailed },
      ]);
    }
  };

  const toggleCallMic = () => {
    const next = !micMuted;
    setMicMuted(next);
    if (!onHoldRef.current) callRef.current?.setMuted(next);
  };

  const toggleHold = () => {
    const call = callRef.current;
    if (!call) return;
    const next = !onHoldRef.current;
    onHoldRef.current = next;
    setOnHold(next);
    lastActivityRef.current = Date.now();
    if (next) {
      call.send({ type: "response.cancel" });
      call.send({ type: "output_audio_buffer.clear" });
      call.setMuted(true);
    } else {
      call.setMuted(micMuted);
      call.resume();
    }
  };

  const toggleNoise = () => {
    const next = !noiseOn;
    setNoiseOn(next);
    store(NOISE_KEY, next ? "" : "0");
    callRef.current?.setNoiseCancel(next);
  };

  const typeInCall = (text: string) => {
    const call = callRef.current;
    if (!call) return;
    userSay(text);
    saveTurn("user", text);
    lastActivityRef.current = Date.now();
    call.send({ type: "conversation.item.create", item: { type: "message", role: "user", content: [{ type: "input_text", text }] } });
    call.send({ type: "response.create" });
  };

  const onMic = () => {
    audio();
    if (teamLiveRef.current && !callRef.current) {
      void botSay([{ text: copy().teamOnCall }]);
      return;
    }
    if (canTalk) {
      if (callRef.current) {
        endedByHandRef.current = true;
        endCall(copy().callEnded);
      } else void startCall();
      return;
    }
    if (mic === "recording") {
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    } else void startRecording();
  };

  const blockFor = (forMs: number | null | undefined) => {
    const until = Date.now() + (forMs && forMs > 0 ? forMs : 100 * 365 * BLOCK_MS);
    store(BLOCK_KEY, JSON.stringify({ strikes: 0, until }));
    setClock(Date.now());
    setBlockedTill(until);
  };

  const copy = () => COPY[langRef.current];
  const switchLang = (text: string) => {
    const next = detectLang(text);
    if (!next || next === langRef.current) return;
    langRef.current = next;
    setLang(next);
  };

  const botSay = (lines: Line[]) => {
    queueRef.current = queueRef.current.then(async () => {
      for (const line of lines) {
        if (!aliveRef.current) return;
        setIsTyping(true);
        await sleep(350 + Math.min(line.text.length * 4, 500));
        if (!aliveRef.current) return;
        if (API && voiceOnRef.current && !callRef.current && activeRef.current) {
          let bubbleId = 0;
          await speakSynced(
            [line.title, line.text].filter(Boolean).join(". "),
            line.text,
            (partial) => {
              if (!aliveRef.current) return;
              if (!bubbleId) {
                const id = ++idRef.current;
                bubbleId = id;
                setIsTyping(false);
                setMessages((prev) => [...prev, { id, from: "bot", at: Date.now(), title: line.title, text: partial, live: true }]);
                if (activeRef.current) playIncoming();
              } else {
                const id = bubbleId;
                setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: partial } : m)));
              }
            },
            () => {
              if (!aliveRef.current || !bubbleId) return;
              const id = bubbleId;
              setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: line.text, chips: line.chips, link: line.link, live: false } : m)));
            }
          );
          await sleep(160);
        } else {
          setIsTyping(false);
          const bubble: Message = { id: ++idRef.current, from: "bot", at: Date.now(), ...line };
          setMessages((prev) => [...prev, bubble]);
          if (activeRef.current) playIncoming();
          await sleep(280);
        }
      }
    });
    return queueRef.current;
  };

  const userSay = (text: string) => {
    stopSpeaking();
    setMessages((prev) => [...prev, { id: ++idRef.current, from: "user", text, at: Date.now() }]);
    playSent();
  };

  const track = (lines: Array<{ role: "user" | "assistant"; content: string }>) => {
    if (!API || !sessionIdRef.current) return;
    void fetch(`${API}/chat/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionIdRef.current, pageUrl: window.location.pathname, messages: lines.map((l) => ({ ...l, content: l.content.slice(0, 2000) })) }),
    }).catch(() => {});
  };

  const chips = (): Chip[] => DEFAULT_CHIPS[langRef.current];

  const welcomeLines = (): Line[] => {
    const trained = configRef.current?.greeting?.[langRef.current];
    if (trained?.chat) return [{ title: trained.title || copy().greeting, text: trained.chat }];
    const own = configRef.current?.messages?.[langRef.current] || configRef.current?.messages?.en;
    const name = configRef.current?.name || BOT_NAME;
    return [{ title: own?.welcomeGreeting || copy().greeting, text: own?.welcomeMessage || copy().intro(name) }];
  };

  const remember = (sessionId: string, name: string, salutation = "") => {
    sessionIdRef.current = sessionId;
    store(SESSION_KEY, sessionId);
    if (isKnownName(name)) {
      nameRef.current = name.trim();
      store(NAME_KEY, name.trim());
      store(SALUTATION_KEY, salutation.trim());
    } else {
      nameRef.current = "";
      store(NAME_KEY, "");
      store(SALUTATION_KEY, "");
    }
  };

  const addressOf = () => {
    const sal = stored(SALUTATION_KEY);
    if (isKnownName(sal)) return sal.trim();
    if (isKnownName(nameRef.current)) return nameRef.current.trim();
    return "";
  };

  const startByName = async (name: string, salutation = "") => {
    const valid = isKnownName(name) ? name.trim() : "";
    const res = await fetch(`${API}/chat/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionIdRef.current, name: valid || "Visitor", salutation, pageUrl: window.location.pathname }),
    });
    if (res.status === 400) return { ok: false as const, badName: true };
    if (res.status === 403) {
      const body = await res.json().catch(() => null);
      if (body?.code === "BLOCKED") {
        blockFor(body.blockedFor);
        return { ok: false as const, blocked: true };
      }
    }
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json())?.data as {
      sessionId: string;
      resumed?: boolean;
      messages?: Array<{ role: string; content: string; createdAt?: string; by?: string; event?: "joined" | "left"; files?: ChatFile[] }>;
    };
    if (valid) {
      remember(data.sessionId || sessionIdRef.current, valid, salutation);
    }
    const history = (data.messages || [])
      .filter((m) => m.content?.trim() || m.files?.length)
      .map((m): Message => {
        const at = m.createdAt ? Date.parse(m.createdAt) : undefined;
        if (m.role !== "agent") return { id: ++idRef.current, from: m.role === "user" ? "user" : "bot", text: m.content, at };
        return { id: ++idRef.current, from: "agent", text: m.content, by: m.by, event: m.event, files: m.files, at };
      });
    return { ok: true as const, history, resumed: Boolean(data.resumed) };
  };

  const startChat = async () => {
    const saved = isKnownName(nameRef.current) ? nameRef.current.trim() : "";
    const shown = addressOf();
    if (!saved) {
      setAskingName(true);
      await botSay([...welcomeLines(), { text: copy().askName }]);
      return;
    }
    setIsTyping(true);
    try {
      const result = API ? await startByName(saved, stored(SALUTATION_KEY)) : null;
      setIsTyping(false);
      if (result?.ok && (result.history.length || result.resumed)) {
        setMessages((prev) => [...result.history, ...prev]);
        await botSay([{ text: shown ? copy().welcomeBack(shown) : copy().welcome(""), chips: chips() }]);
      } else {
        await botSay([...welcomeLines(), { text: copy().welcome(shown), chips: chips() }]);
      }
    } catch {
      setIsTyping(false);
      await botSay([...welcomeLines(), { text: copy().welcome(shown), chips: chips() }]);
    }
  };

  const ask = async (question: string, retry = true): Promise<void> => {
    await queueRef.current;
    if (CREATOR_QUERY.test(question.trim())) {
      setIsTyping(true);
      const replyText = CREATOR_REPLY[langRef.current];
      let cid = 0;
      await speakSynced(
        replyText,
        replyText,
        (partial) => {
          if (!aliveRef.current) return;
          if (!cid) {
            cid = ++idRef.current;
            setIsTyping(false);
            setMessages((prev) => [...prev, { id: cid, from: "bot", text: partial, at: Date.now(), live: true }]);
            if (activeRef.current) playIncoming();
          } else {
            const id = cid;
            setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: partial } : m)));
          }
        },
        () => {
          if (cid) setMessages((prev) => prev.map((m) => (m.id === cid ? { ...m, text: replyText, live: false } : m)));
        }
      );
      return;
    }
    let restart = false;
    setBusy(true);
    if (!teamLiveRef.current) setIsTyping(true);
    let reply = "";
    let bubbleId = 0;
    const show = (text: string) => {
      if (!aliveRef.current) return;
      if (!bubbleId) {
        const id = ++idRef.current;
        bubbleId = id;
        setIsTyping(false);
        setMessages((prev) => [...prev, { id, from: "bot", text, at: Date.now(), live: true }]);
        if (activeRef.current) playIncoming();
      } else {
        const id = bubbleId;
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text } : m)));
      }
    };
    try {
      if (!API) throw new Error("No API");
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message: question, pageUrl: window.location.pathname }),
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null);
        if (res.status === 403 && body?.code === "BLOCKED") blockFor(body.blockedFor);
        else if (res.status === 409 && body?.code === "CHAT_CLOSED" && retry) restart = true;
        else if (res.status === 403 && body?.code === "DETAILS_REQUIRED") {
          remember(sessionIdRef.current, "");
          pendingRef.current = question;
          setAskingName(true);
          show(copy().askName);
        } else show(res.status === 429 ? copy().tooFast(phoneRef.current) : copy().offline(phoneRef.current));
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let cut = buffer.indexOf("\n\n");
        while (cut >= 0) {
          const event = buffer.slice(0, cut);
          buffer = buffer.slice(cut + 2);
          cut = buffer.indexOf("\n\n");
          for (const line of event.split("\n")) {
            if (!line.startsWith("data:")) continue;
            let data: { delta?: string; error?: string } = {};
            try {
              data = JSON.parse(line.slice(5).trim());
            } catch {
              continue;
            }
            if (typeof data.delta === "string") reply += data.delta;
            else if (typeof data.error === "string") reply = data.error;
            else continue;
            if (!voiceOnRef.current || callRef.current) show(reply);
          }
        }
      }
      if (!reply) show(copy().offline(phoneRef.current));
    } catch {
      if (!reply) show(copy().offline(phoneRef.current));
    } finally {
      if (!voiceOnRef.current || callRef.current || !reply) {
        setIsTyping(false);
        const id = bubbleId;
        if (id) setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, live: false } : m)));
      }
      setBusy(false);
    }
    if (restart) {
      sessionIdRef.current = newSessionId();
      store(SESSION_KEY, sessionIdRef.current);
      if (nameRef.current) await startByName(nameRef.current).catch(() => null);
      return ask(question, false);
    }
    if (reply && voiceOnRef.current && !callRef.current) {
      await speakSynced(reply, reply, show, () => {
        setIsTyping(false);
        const id = bubbleId;
        if (id) setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: reply, live: false } : m)));
      });
    } else if (reply) {
      speak(reply);
    }
    if (VISITOR_DONE.test(question.trim()) && reply && !/[?؟]\s*$/.test(reply.trim())) closingAtRef.current = Date.now() + CHAT_END_AFTER_GOODBYE_MS;
  };

  const takeName = async (text: string) => {
    const said = text.trim();
    if (CREATOR_QUERY.test(said)) {
      await botSay([{ text: CREATOR_REPLY[langRef.current] }, { text: copy().askName }]);
      return;
    }
    const asked = salutationRef.current;
    if (asked) {
      if (!asked.choosing && SAYS_YES.test(said)) return finishName(asked.name, asked.first);
      const preferred = extractName(said.replace(SAYS_NO, "").replace(ADDRESS_WORDS, " ").replace(/\s+/g, " ").trim());
      if (preferred) return finishName(asked.name, preferred);
      if (!asked.choosing) {
        salutationRef.current = { ...asked, choosing: true };
        await botSay([{ text: copy().askSalutation }]);
        return;
      }
      return finishName(asked.name, asked.first);
    }
    if (URGENT.test(said)) {
      pendingRef.current = said;
      return finishName("", "");
    }
    const name = GREETING.test(said) ? null : extractName(said);
    const refused = !name && REFUSES.test(said) && said.split(/\s+/).length <= 4;
    if (!name && !refused) {
      nameAsksRef.current += 1;
      if (!GREETING.test(said) && said.split(/\s+/).length > 1 && !pendingRef.current) pendingRef.current = said;
      if (nameAsksRef.current < MAX_NAME_ASKS) {
        const again = GREETING.test(said) ? copy().askName : pendingRef.current ? copy().nameFirst : copy().badName;
        await botSay([{ text: again }]);
        return;
      }
    }
    if (!name) return finishName("", "", refused);
    const first = name.split(" ")[0];
    if (name.includes(" ")) {
      salutationRef.current = { name, first };
      await botSay([{ text: copy().confirmSalutation(first) }]);
      return;
    }
    return finishName(name, name);
  };

  const finishName = async (name: string, salutation: string, refused = false) => {
    salutationRef.current = null;
    setBusy(true);
    const valid = isKnownName(name) ? name.trim() : "";
    const validSalutation = isKnownName(salutation) ? salutation.trim() : valid;
    let result: Awaited<ReturnType<typeof startByName>> | null = null;
    try {
      result = API ? await startByName(valid || "Visitor", validSalutation) : null;
    } catch {
      result = null;
    }
    setBusy(false);
    if (result && !result.ok) {
      if (!("blocked" in result)) await botSay([{ text: copy().badName }]);
      return;
    }
    if (valid) {
      remember(sessionIdRef.current, valid, validSalutation);
      setAskingName(false);
    } else {
      store(NAME_KEY, "");
      store(SALUTATION_KEY, "");
      nameRef.current = "";
      setAskingName(false);
    }
    const shownName = validSalutation || valid || "";
    if (result?.ok && result.history.length) {
      setMessages((prev) => [...result.history, ...prev]);
    }
    const pending = pendingRef.current;
    pendingRef.current = "";
    if (pending) {
      if (shownName) await botSay([{ text: copy().thanks(shownName) }]);
      await ask(pending);
    } else {
      const back = result?.ok && (result.history.length || result.resumed) && shownName;
      await botSay([{ text: back ? copy().welcomeBack(shownName) : refused ? copy().noName : copy().welcome(shownName), chips: chips() }]);
    }
  };

  const open = () => {
    audio();
    playOpen();
    setIsOpen(true);
    setIsMinimized(false);
    activeRef.current = true;
    if (window.matchMedia("(min-width: 640px)").matches) setTimeout(() => inputRef.current?.focus(), 450);
    if (chatEnded || callRef.current) return;
    if (canTalk && API && !endedByHandRef.current && !teamLiveRef.current && blockedUntil() === 0) {
      void startCall(true);
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;
    void startChat();
  };

  useEffect(() => {
    openRef.current = open;
  });

  const openedAtOnceRef = useRef(false);
  useEffect(() => {
    if (!openAtOnce || openedAtOnceRef.current) return;
    openedAtOnceRef.current = true;
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAtOnce]);

  useEffect(() => {
    const timer = setInterval(() => {
      const at = closingAtRef.current;
      if (!at || Date.now() < at) return;
      if (inputRef.current?.value.trim()) closingAtRef.current = Date.now() + 500;
      else {
        closingAtRef.current = null;
        setChatEnded(true);
      }
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const resumeChat = () => {
    audio();
    setChatEnded(false);
    void botSay([{ text: copy().welcome(addressOf()), chips: chips() }]);
  };

  const closeChat = () => {
    if (closing) return;
    activeRef.current = false;
    stopSpeaking();
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    endCall();
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsOpen(false);
    }, 240);
  };

  const onNavigate = () => {
    if (window.matchMedia("(max-width: 639px)").matches) closeChat();
  };

  const warn = (strikes: number) => {
    const text = copy().abuseWarning(strikes, strikes >= STRIKES_TO_BLOCK - 1);
    const call = callRef.current;
    if (!call) {
      void botSay([{ text }]);
      return;
    }
    lastActivityRef.current = Date.now();
    call.send({ type: "response.create", response: { instructions: `Say only this calmly in Hindi: "${text}"` } });
  };
  const closeForAbuse = (block: () => void) => {
    if (callRef.current) endCallRef.current();
    block();
  };
  const strike = async () => {
    if (API) {
      try {
        const res = await fetch(`${API}/chat/abuse`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        });
        const data = res.ok ? (await res.json())?.data : null;
        if (data) {
          if (data.blocked) closeForAbuse(() => blockFor(data.blockedFor));
          else warn(data.strikes || 1);
          return;
        }
      } catch {
        // ignore
      }
    }
    const { strikes } = readBlock();
    const next = strikes + 1;
    const until = next >= STRIKES_TO_BLOCK ? Date.now() + BLOCK_MS : 0;
    store(BLOCK_KEY, JSON.stringify({ strikes: until ? 0 : next, until }));
    if (until)
      closeForAbuse(() => {
        setClock(Date.now());
        setBlockedTill(until);
      });
    else warn(next);
  };

  const send = (text: string) => {
    if (!text || blocked || (busy && !callRef.current) || chatEnded) return;
    closingAtRef.current = null;
    if (isAbusive(text)) {
      void strike();
      return;
    }
    switchLang(text);
    if (callRef.current && choosingRef.current) {
      choosingRef.current = false;
      if (WANTS_TO_TALK.test(text) && !WANTS_TO_TYPE.test(text)) {
        typeInCall(text);
        return;
      }
      endedByHandRef.current = true;
      endCall();
      startedRef.current = true;
      if (WANTS_TO_TYPE.test(text) && text.trim().split(/\s+/).length <= 4) {
        userSay(text);
        continueTyping();
        return;
      }
    } else if (callRef.current) {
      typeInCall(text);
      return;
    }
    userSay(text);
    if (askingName && !teamLiveRef.current) void takeName(text);
    else void ask(text);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || blocked || (busy && !callRef.current)) return;
    setInput("");
    send(text);
  };

  const onChip = (chip: Chip) => {
    if (blocked || busy || chatEnded) return;
    audio();
    closingAtRef.current = null;
    if (chip.label.includes("वॉइस कॉल") || chip.label.includes("Voice Call")) {
      onMic();
      return;
    }
    if (chip.kind === "consult") {
      setShowConsultModal(true);
      return;
    }
    if (chip.kind === "ask") {
      userSay(chip.label);
      void ask(chip.label);
      return;
    }
    userSay(chip.label);
    if (chip.kind === "team") {
      const reply = copy().team(phoneRef.current);
      track([
        { role: "user", content: chip.label },
        { role: "assistant", content: reply },
      ]);
      void botSay([{ text: reply }]);
      return;
    }
    const link = chip.target ? { href: chip.target, label: copy().openPage } : undefined;
    track([
      { role: "user", content: chip.label },
      { role: "assistant", content: [chip.reply, chip.target].filter(Boolean).join("\n") },
    ]);
    void botSay([{ text: chip.reply, link, chips: chip.options?.map((label): Chip => ({ kind: "ask", label })) }]);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    store(MUTED_KEY, next ? "1" : "");
    if (!next) playIncoming();
  };

  const showAvatar = (index: number) => messages[index].from === "bot" && messages[index - 1]?.from !== "bot";
  const lastId = messages[messages.length - 1]?.id;

  const placeholder = blocked
    ? t.blockedPlaceholder
    : callState === "connecting"
      ? t.connecting
      : inCall
        ? onHold
          ? t.onHoldHint
          : micMuted
          ? t.muted
          : speaking
            ? t.interruptHint
            : t.listeningCall
        : mic === "recording"
      ? t.listening
      : mic === "transcribing"
        ? t.transcribing
        : askingName
          ? t.namePlaceholder
          : t.placeholder;
  const status = teamLive
    ? t.teamStatus
    : onHold && inCall
      ? t.onHold
      : speaking
      ? t.speaking
      : inCall
        ? t.inCall
        : callState === "connecting"
          ? t.connecting
          : isTyping
            ? t.typing
            : config?.subtitle || t.subtitle;
  const blockedForever = blockedTill - clock > 30 * 24 * 60 * 60 * 1000;
  const typingDots = [0, 0.15, 0.3].map((d) => <span key={d} className="vds-dot h-2 w-2 rounded-full bg-[#bf8a2e]" style={{ animationDelay: `${d}s` }} />);
  const botAvatar = (visible: boolean) => (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f1f5e8] shadow-[0_4px_10px_-4px_rgba(11,61,46,0.35)] ring-2 ring-[#bf8a2e]/80 ${visible ? "" : "invisible"}`}>
      <Image src={avatar} alt="" width={40} height={40} className="h-full w-full object-cover" />
    </span>
  );
  const headBtn = "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/10 transition hover:bg-white/25";

  return (
    <>
      <style>{`
        @keyframes vdsChatIn {
          0% { opacity: 0; transform: translate(18px, 36px) scale(.5); filter: blur(10px); border-radius: 48px; }
          55% { opacity: 1; filter: blur(0); }
          75% { transform: translate(0, -5px) scale(1.015); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes vdsChatOut {
          0% { opacity: 1; transform: none; }
          100% { opacity: 0; transform: translate(18px, 30px) scale(.55); filter: blur(8px); border-radius: 48px; }
        }
        @keyframes vdsHeadIn { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
        @keyframes vdsBodyIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes vdsMsgIn {
          0% { opacity: 0; transform: translateY(10px) scale(.9); }
          65% { opacity: 1; transform: translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes vdsDot { 0%, 80%, 100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }
        @keyframes vdsRing { 0% { box-shadow: 0 0 0 0 rgba(191,138,46,.7); } 100% { box-shadow: 0 0 0 10px rgba(191,138,46,0); } }
        @keyframes vdsRec { 0% { box-shadow: 0 0 0 0 rgba(220,38,38,.55); } 100% { box-shadow: 0 0 0 12px rgba(220,38,38,0); } }
        .vds-chat-in { animation: vdsChatIn .55s cubic-bezier(.2,.9,.25,1) both; transform-origin: bottom right; }
        .vds-chat-out { animation: vdsChatOut .26s cubic-bezier(.5,0,.75,0) both; transform-origin: bottom right; }
        .vds-head-in { animation: vdsHeadIn .45s .12s cubic-bezier(.2,.9,.3,1) both; }
        .vds-body-in { animation: vdsBodyIn .45s .2s cubic-bezier(.2,.9,.3,1) both; }
        .vds-msg-in { animation: vdsMsgIn .36s cubic-bezier(.2,.9,.3,1.2) both; transform-origin: bottom left; }
        .vds-msg-in.vds-mine { transform-origin: bottom right; }
        .vds-dot { animation: vdsDot 1.1s infinite ease-in-out; }
        .vds-speaking { animation: vdsRing 1.2s infinite; }
        .vds-recording { animation: vdsRec 1.1s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .vds-chat-in, .vds-chat-out, .vds-head-in, .vds-body-in, .vds-msg-in, .vds-speaking, .vds-recording { animation-duration: .01s; }
        }
      `}</style>

      {isOpen && (
        <>
          <section
            role="dialog"
            aria-label={`${botName} chat`}
            onKeyDown={(e) => e.key === "Escape" && closeChat()}
            className={`${closing ? "vds-chat-out" : "vds-chat-in"} fixed z-[1000] flex flex-col overflow-hidden bg-[#fafbf7] ${chatFont.className} shadow-[0_24px_60px_-12px_rgba(11,61,46,0.35),0_0_0_1px_rgba(11,61,46,0.14)] inset-x-2 bottom-2 rounded-[24px] sm:inset-x-auto sm:right-5 sm:bottom-[88px] sm:w-[375px] ${
              isMinimized ? "" : "h-[82dvh] sm:h-[560px] sm:max-h-[calc(100vh-108px)]"
            }`}
          >
            {/* Header: Forest green & Vedic gold accent */}
            <header className="vds-head-in relative shrink-0 bg-[linear-gradient(135deg,#06281e_0%,#0b3d2e_55%,#125742_100%)] px-3.5 pt-4 pb-6 text-white">
              <LeafMark className="pointer-events-none absolute top-1.5 left-1/2 h-[15px] w-[24px] -translate-x-1/2 text-[#e8b85a]" />
              <div className="relative flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <span className={`flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-[#f1f5e8] ring-[3px] ring-[#e8b85a] ${speaking ? "vds-speaking" : ""}`}>
                    <Image src={avatar} alt={botName} width={50} height={50} className="h-full w-full object-cover" />
                  </span>
                  <span className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4" title={t.online}>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-60" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#22c55e]" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[18px] leading-tight font-bold">{teamLive ? t.teamTitle : botName}</p>
                  <p className={`truncate text-[11px] font-semibold ${teamLive || speaking || isTyping || inCall ? "text-[#fcd98a]" : "text-white/85"}`}>{status}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {!inCall && canTalk && API && (
                    <button
                      type="button"
                      onClick={() => onMic()}
                      aria-label={t.callStart}
                      title={t.callStart}
                      className="flex h-7 items-center gap-1.5 rounded-full bg-[#e8b85a] px-2.5 text-[11px] font-bold text-[#06281e] shadow-sm transition hover:bg-[#fcd98a] active:scale-95"
                    >
                      <HeadsetIcon className="h-3.5 w-3.5" />
                      <span>वॉइस कॉल</span>
                    </button>
                  )}
                  {inCall && (
                    <button
                      type="button"
                      onClick={() => {
                        endedByHandRef.current = true;
                        endCall(copy().callEnded);
                      }}
                      aria-label={t.callEnd}
                      title={t.callEnd}
                      className="flex h-7 items-center gap-1 rounded-full bg-red-600 px-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
                    >
                      <PhoneOffIcon className="h-3 w-3" />
                      <span>कॉल काटें</span>
                    </button>
                  )}
                  <button type="button" onClick={toggleVoice} aria-label={voiceOn ? t.voiceOn : t.voiceOff} title={voiceOn ? t.voiceOn : t.voiceOff} aria-pressed={voiceOn} className={headBtn}>
                    {voiceOn ? <VolumeIcon className="h-4 w-4" /> : <VolumeOffIcon className="h-4 w-4" />}
                  </button>
                  <button type="button" onClick={() => setIsMinimized((v) => !v)} aria-label="Minimise chat" className={`${headBtn} hidden sm:flex`}>
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={closeChat} aria-label="Close chat" className={headBtn}>
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <svg aria-hidden viewBox="0 0 360 20" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-[20px] w-full">
                <path d="M0 20V12C80 24 190 -2 360 8V20Z" fill="#fafbf7" />
                <path d="M0 12C80 24 190 -2 360 8" fill="none" stroke="#e8b85a" strokeWidth="2.4" />
              </svg>
            </header>

            {!isMinimized && (
              <>
                {/* Messages Body */}
                <div className="relative min-h-0 flex-1 bg-[linear-gradient(#fafbf7,#f1f5e8)]">
                  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-12 -left-16 h-44 w-44 bg-contain bg-no-repeat opacity-25" style={{ backgroundImage: `url(${MANDALA})` }} />
                    <div className="absolute top-0 right-0 h-[72px] w-[48%] bg-contain bg-right-top bg-no-repeat opacity-50" style={{ backgroundImage: `url(${TEMPLE_TOP})` }} />
                    <span className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] leading-none text-[#bf8a2e] opacity-[0.06] select-none">ॐ</span>
                    <div className="absolute inset-x-0 bottom-0 h-[62%] bg-bottom bg-no-repeat [background-size:100%_auto]" style={{ backgroundImage: `url(${CHAT_BG})` }} />
                  </div>
                  <div ref={scrollRef} role="log" aria-label={`Chat with ${botName}`} className="vds-body-in absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain px-3.5 pt-2 pb-4">
                    <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.06em] text-[#0b3d2e]/80" lang="sa">
                      {t.mantra}
                    </p>
                    <div className="relative space-y-3">
                      {messages.map((m, i) =>
                        m.from === "agent" ? (
                          m.event ? (
                            <div key={m.id} className="vds-msg-in flex justify-center">
                              <span className="flex max-w-[90%] items-center gap-1.5 rounded-full border border-[#bf8a2e]/50 bg-[#f1f5e8] px-3 py-1 text-center text-[11px] font-semibold text-[#0b3d2e] shadow-[0_2px_6px_-3px_rgba(11,61,46,0.35)]">
                                <HeadsetIcon className="h-3 w-3 shrink-0" />
                                {m.event === "joined" ? t.teamJoined : t.teamLeft}
                              </span>
                            </div>
                          ) : (
                            <div key={m.id} className="vds-msg-in flex items-start gap-2">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#bf8a2e,#0b3d2e)] text-white shadow-[0_4px_10px_-4px_rgba(11,61,46,0.5)] ring-2 ring-[#f1f5e8]">
                                <HeadsetIcon className="h-[18px] w-[18px]" />
                              </span>
                              <div className="max-w-[80%] min-w-0">
                                <p className="mb-0.5 pl-1 text-[10.5px] font-bold text-[#0b3d2e]">
                                  {t.teamName}
                                  {m.by ? <span className="font-medium text-[#606462]"> · {m.by}</span> : null}
                                </p>
                                <div className="rounded-[18px] rounded-tl-[6px] border border-[#bf8a2e]/60 bg-[#fbfdf7] px-3.5 py-2.5 text-[13px] leading-[1.6] font-medium text-[#1c2c24] shadow-[0_8px_18px_-12px_rgba(11,61,46,0.25)]">
                                  {m.files?.map((file) =>
                                    file.type?.startsWith("image/") ? (
                                      <a key={file.href} href={file.href} target="_blank" rel="noopener noreferrer" className="mb-1.5 block overflow-hidden rounded-[12px]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={file.href} alt={file.label} className="max-h-[200px] w-auto max-w-full object-cover" />
                                      </a>
                                    ) : (
                                      <a
                                        key={file.href}
                                        href={file.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mb-1.5 flex items-center gap-2 rounded-[12px] border border-[#bf8a2e]/40 bg-white/80 px-2.5 py-2 text-[12px] font-semibold text-[#0b3d2e] transition hover:bg-white"
                                      >
                                        <FileIcon className="h-4 w-4 shrink-0" />
                                        <span className="min-w-0 flex-1 truncate">{file.label}</span>
                                        <span className="shrink-0 text-[10.5px] text-[#606462]">{t.openFile}</span>
                                      </a>
                                    )
                                  )}
                                  {m.text && <p className="whitespace-pre-line [overflow-wrap:anywhere]">{m.text}</p>}
                                </div>
                                {m.at && <p className="mt-1 pl-1 text-[10px] text-[#606462]">{timeOf(m.at)}</p>}
                              </div>
                            </div>
                          )
                        ) : m.from === "bot" ? (
                          <div key={m.id} className="vds-msg-in flex items-start gap-2">
                            {botAvatar(showAvatar(i))}
                            <div className="max-w-[80%] min-w-0">
                              <div
                                className={`relative rounded-[18px] border border-[#e2dec9] bg-[#ffffff]/95 px-3.5 py-2.5 text-[13px] leading-[1.6] font-medium text-[#1c2c24] shadow-[0_8px_18px_-12px_rgba(11,61,46,0.2)] ${
                                  showAvatar(i) ? "rounded-tl-[6px]" : ""
                                }`}
                              >
                                {m.title && <p className="text-[15px] font-bold text-[#0b3d2e]">{m.title}</p>}
                                {m.text && <RichText text={m.text} onNavigate={onNavigate} />}
                                {m.live && !m.text && <span className="flex items-center gap-1 py-1">{typingDots}</span>}
                                {m.link && (
                                  <span className="mt-2 block">
                                    <ChatLink href={m.link.href} onNavigate={onNavigate}>
                                      {m.link.label} →
                                    </ChatLink>
                                  </span>
                                )}
                              </div>
                              {m.at && !m.live && <p className="mt-1 pl-1 text-[10px] text-[#606462]">{timeOf(m.at)}</p>}
                              {m.chips?.length && m.id === lastId && !busy && !blocked && !chatEnded ? (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {m.chips.map((chip) => (
                                    <button
                                      key={chip.label}
                                      type="button"
                                      onClick={() => onChip(chip)}
                                      className="cursor-pointer rounded-full border border-[#bf8a2e]/60 bg-[#f1f5e8] px-3 py-1.5 text-[12px] font-semibold text-[#0b3d2e] shadow-[0_4px_12px_-6px_rgba(11,61,46,0.25)] transition hover:border-[#bf8a2e] hover:bg-[#e4ebd4]"
                                    >
                                      {chip.label}
                                    </button>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ) : (
                          <div key={m.id} className="vds-msg-in vds-mine flex justify-end">
                            <div className="max-w-[80%] min-w-0">
                              <div className="rounded-[18px] rounded-tr-[6px] bg-[linear-gradient(135deg,#0b3d2e,#125742)] px-3.5 py-2.5 text-[13px] leading-[1.6] font-medium text-white shadow-[0_6px_16px_-8px_rgba(11,61,46,0.4)]">
                                <p className="whitespace-pre-line [overflow-wrap:anywhere]">{m.text}</p>
                              </div>
                              {m.at && <p className="mt-1 pr-1 text-right text-[10px] text-[#606462]">{timeOf(m.at)}</p>}
                            </div>
                          </div>
                        )
                      )}
                      {isTyping && !messages.some((m) => m.from === "bot" && m.live) && (
                        <div className="vds-msg-in flex items-center gap-2">
                          {botAvatar(true)}
                          <div className="flex h-9 items-center gap-1 rounded-full border border-[#e2dec9] bg-white px-4">
                            {typingDots}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                {chatEnded && (
                  <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#e2dec9] bg-[#fafbf7] px-4 py-3">
                    <span className="text-[13px] font-semibold text-[#0b3d2e]">{t.chatEnded}</span>
                    <button
                      type="button"
                      onClick={resumeChat}
                      className="shrink-0 cursor-pointer rounded-full bg-[linear-gradient(135deg,#0b3d2e,#125742)] px-4 py-2 text-[12.5px] font-semibold text-white transition hover:brightness-110"
                    >
                      {t.resume}
                    </button>
                  </div>
                )}
                <form onSubmit={onSubmit} className={`relative shrink-0 bg-[#fafbf7] px-3 pt-2 pb-1.5 ${chatEnded ? "hidden" : ""}`}>
                  {blocked && (
                    <div role="status" className="mb-2 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                      <BanIcon className="h-4 w-4 shrink-0 text-red-500" />
                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="text-[11.5px] font-semibold text-red-700">{t.blockedNote}</p>
                        <p className="text-[10.5px] text-red-600/80">{blockedForever ? t.blockedByTeam : t.blockedOpensIn}</p>
                      </div>
                      {!blockedForever && (
                        <span className="shrink-0 rounded-lg bg-red-500 px-2 py-1 font-mono text-[13px] font-bold text-white tabular-nums">{countdown(blockedTill - clock)}</span>
                      )}
                    </div>
                  )}
                  {inCall && (
                    <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
                      <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] font-semibold text-[#0b3d2e]" title={noiseOn ? t.noiseOnHint : t.noiseOffHint}>
                        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#22c55e]" />
                        <span className="truncate">{t.noise}</span>
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={noiseOn}
                        aria-label={t.noise}
                        title={noiseOn ? t.noiseOnHint : t.noiseOffHint}
                        onClick={toggleNoise}
                        className={`relative flex h-[22px] w-[52px] shrink-0 cursor-pointer items-center rounded-full px-1 text-[9px] font-bold transition ${noiseOn ? "bg-[#0b3d2e] text-white" : "bg-[#e2dec9] text-[#606462]"}`}
                      >
                        <span className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-all ${noiseOn ? "left-[33px]" : "left-[3px]"}`} />
                        <span className={noiseOn ? "pl-0.5" : "ml-auto pr-0.5"}>{noiseOn ? "ON" : "OFF"}</span>
                      </button>
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-1.5 rounded-full border bg-white py-1.5 pr-1.5 pl-3 shadow-[0_10px_24px_-14px_rgba(11,61,46,0.35)] ${
                      inputIsAbusive
                        ? "border-red-500 ring-2 ring-red-200"
                        : mic === "recording" || (inCall && !micMuted)
                          ? "border-emerald-500 ring-2 ring-emerald-100"
                          : "border-[#e2dec9] focus-within:border-[#bf8a2e]"
                    } ${blocked ? "opacity-60" : ""}`}
                  >
                    <LeafMark className="h-[16px] w-[26px] shrink-0 text-[#0b3d2e]" />
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={placeholder}
                      disabled={blocked || mic !== "idle" || callState === "connecting"}
                      aria-invalid={inputIsAbusive}
                      maxLength={askingName ? 200 : 1000}
                      autoComplete={askingName ? "name" : "off"}
                      enterKeyHint="send"
                      className="min-w-0 flex-1 bg-transparent text-[16px] text-[#1c2c24] outline-none placeholder:text-[#8d928f] sm:text-[13.5px]"
                      aria-label={placeholder}
                    />
                    {inCall ? (
                      <>
                        <button
                          type="button"
                          onClick={toggleCallMic}
                          title={micMuted ? t.callUnmute : t.callMute}
                          aria-label={micMuted ? t.callUnmute : t.callMute}
                          aria-pressed={micMuted}
                          className={`relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition ${micMuted ? "bg-[#f1f5e8] text-[#8d928f]" : "bg-[#e4ebd4] text-[#0b3d2e]"}`}
                        >
                          {!micMuted && <span ref={micRingRef} className="absolute inset-0 rounded-full bg-[#0b3d2e]/20 transition-transform duration-100" />}
                          {micMuted ? <MicOffIcon className="h-3.5 w-3.5" /> : <MicIcon className="relative h-3.5 w-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={toggleHold}
                          title={onHold ? t.callResume : t.callHold}
                          aria-label={onHold ? t.callResume : t.callHold}
                          aria-pressed={onHold}
                          className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition ${onHold ? "bg-[#0b3d2e] text-white hover:bg-[#07241b]" : "bg-[#f1f5e8] text-[#0b3d2e] hover:bg-[#e4ebd4]"}`}
                        >
                          {onHold ? <PlayIcon className="h-3 w-3" /> : <PauseIcon className="h-3 w-3" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            endedByHandRef.current = true;
                            endCall(copy().callEnded);
                          }}
                          title={t.callEnd}
                          aria-label={t.callEnd}
                          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                        >
                          <PhoneOffIcon className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      (canTalk || canRecord) &&
                      API && (
                        <button
                          type="button"
                          onClick={onMic}
                          disabled={blocked || (busy && !canTalk) || mic === "transcribing" || callState === "connecting" || chatEnded}
                          aria-label={canTalk ? t.callStart : mic === "recording" ? t.micStop : t.micStart}
                          title={canTalk ? t.callStart : mic === "recording" ? t.micStop : t.micStart}
                          className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition disabled:cursor-default disabled:opacity-40 ${
                            mic === "recording" ? "vds-recording bg-red-500 text-white" : "border border-[#0b3d2e]/30 text-[#0b3d2e] hover:bg-[#f1f5e8]"
                          }`}
                        >
                          {mic === "transcribing" || callState === "connecting" ? <SpinnerIcon className="h-4 w-4 animate-spin" /> : <MicIcon className="h-4 w-4" />}
                        </button>
                      )
                    )}
                    <button
                      type="submit"
                      disabled={!input.trim() || (busy && !inCall) || blocked}
                      aria-label="Send"
                      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b3d2e,#125742)] text-white shadow-[0_6px_14px_-6px_rgba(11,61,46,0.8)] transition hover:scale-105 hover:brightness-110 disabled:cursor-default disabled:opacity-55 disabled:hover:scale-100"
                    >
                      <SendIcon className="h-4 w-4 -translate-x-px translate-y-px" />
                    </button>
                  </div>
                  {inputIsAbusive && (
                    <p role="alert" className="mt-1 text-center text-[11px] font-semibold text-red-600">
                      {t.abuseHint}
                    </p>
                  )}
                  <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-[#606462]">
                    <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-[#bf8a2e]" />
                    <span className="truncate">{t.footer}</span>
                    <span title={t.privacy} aria-label={t.privacy} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#0b3d2e]">
                      <InfoIcon className="h-3.5 w-3.5" />
                    </span>
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={muted ? t.soundOff : t.soundOn}
                      aria-label={muted ? t.soundOff : t.soundOn}
                      aria-pressed={!muted}
                      className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#0b3d2e] transition hover:bg-[#f1f5e8]"
                    >
                      <BellIcon off={muted} className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>

          {/* Desktop Close Button */}
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="vds-chat-in fixed right-6 bottom-5 z-[1000] hidden h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b3d2e,#06281e)] text-white shadow-[0_8px_20px_rgba(11,61,46,0.4)] ring-2 ring-[#e8b85a]/70 transition hover:scale-105 sm:flex"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Plan Consultation Modal if triggered from quick chips */}
      <PlanConsultationModal
        isOpen={showConsultModal}
        onClose={() => setShowConsultModal(false)}
      />
    </>
  );
};

export default Chatbot;
