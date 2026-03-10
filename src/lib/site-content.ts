import {
  Activity,
  Bolt,
  Brackets,
  Command,
  Focus,
  Gauge,
  Layers3,
  Mic2,
  ScanSearch,
  Shield,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type ProductSummary = {
  href: string;
  name: string;
  eyebrow: string;
  summary: string;
  status: string;
  icon: LucideIcon;
  details: string[];
};

export const navItems = [
  { href: "/", label: "Overview" },
  { href: "/vorn-voice", label: "Vorn Voice" },
  { href: "/context-cursor", label: "Context Cursor" },
  { href: "/quad-code", label: "Quad Code" },
];

export const products: ProductSummary[] = [
  {
    href: "/vorn-voice",
    name: "Vorn Voice",
    eyebrow: "Shipping now",
    summary:
      "Voice-first dictation for software work with local transcription, push-to-talk control, and instant paste into the app you already have focused.",
    status: "Available on macOS",
    icon: Mic2,
    details: ["Local whisper models", "Global hotkey", "Direct download"],
  },
  {
    href: "/context-cursor",
    name: "Context Cursor",
    eyebrow: "Coming soon",
    summary:
      "Give an LLM the context of what your cursor is pointing at so 'look at this' becomes an exact instruction instead of a vague prompt.",
    status: "In development",
    icon: ScanSearch,
    details: ["Cursor-aware context", "Screen-first handoff", "Tighter prompting loop"],
  },
  {
    href: "/quad-code",
    name: "Quad Code",
    eyebrow: "Coming soon",
    summary:
      "Open four coding terminal sessions at once so OpenCode, Codecs, Cloud Code, or other parallel workflows can run side by side.",
    status: "In development",
    icon: Brackets,
    details: ["Four terminals", "Parallel coding", "CLI-first workflow"],
  },
];

export const voiceHighlights = [
  {
    icon: Command,
    title: "Push-to-talk hotkeys",
    body: "Hold your global shortcut, speak naturally, and release to transcribe into any app.",
  },
  {
    icon: Bolt,
    title: "Local whisper models",
    body: "Start with bundled base.en, then install tiny.en for speed or small.en for higher accuracy.",
  },
  {
    icon: WandSparkles,
    title: "Auto-paste flow",
    body: "Drop dictated text directly into the focused app while keeping clipboard restore optional.",
  },
  {
    icon: Shield,
    title: "Guided setup checks",
    body: "Get clear runtime diagnostics and permission health before your first dictation session.",
  },
  {
    icon: Gauge,
    title: "Weekly speaking stats",
    body: "Track words per minute and rolling output to measure gains over time.",
  },
  {
    icon: Activity,
    title: "Automatic updates",
    body: "Packaged app builds can fetch updates in the background and install on restart.",
  },
];

export const voiceUseCases = [
  {
    title: "Quick PR replies",
    snippet:
      "Hold Shift + Command + R\n\"Looks good. I tested the fallback path and it now recovers correctly.\"",
  },
  {
    title: "Issue triage notes",
    snippet:
      "Speak naturally, release hotkey\nVorn Voice transcribes and pastes into Linear, GitHub, or Slack.",
  },
  {
    title: "Docs while coding",
    snippet:
      "Keep hands on keyboard\nDictate implementation notes as you navigate code.",
  },
];

export const voiceFaqs = [
  {
    question: "Does it run locally?",
    answer:
      "Yes. Vorn Voice is designed around local whisper model workflows and local runtime checks.",
  },
  {
    question: "Can I change the hotkey?",
    answer: "Absolutely. Capture and validate your own global shortcut inside settings.",
  },
  {
    question: "What happens after I speak?",
    answer:
      "Release your hotkey, transcription runs, and the result can auto-paste into the active app.",
  },
];

export const workflowPillars = [
  {
    icon: Layers3,
    title: "A focused toolset",
    body: "Each Vorn product does one job cleanly instead of hiding everything behind one oversized app.",
  },
  {
    icon: Focus,
    title: "Context where you need it",
    body: "Voice, cursor signals, and terminal layout all reduce the friction between intent and execution.",
  },
  {
    icon: Mic2,
    title: "Start with Vorn Voice",
    body: "The first shipping tool already handles a real workflow: speaking ideas and turning them into clean text anywhere.",
  },
];
