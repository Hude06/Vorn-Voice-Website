import {
  Bolt,
  Command,
  Focus,
  Mic2,
  Shield,
  WalletCards,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type SiteFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type VoiceUseCase = {
  title: string;
  body: string;
  example: string;
};

export type VoiceComparisonRow = {
  label: string;
  vorn: string;
  wisprFlow: string;
};

export const vornOneTimePrice = "$9.99";
export const wisprFlowName = "Wispr Flow";

export const navItems = [
  { href: "/", label: "Overview" },
  { href: "/vorn-voice", label: "How it works" },
];

export const homePrinciples: SiteFeature[] = [
  {
    icon: Mic2,
    title: "Speak instead of stopping to type",
    body: "Use Vorn when you already know what you want to say and just want the words to appear faster.",
  },
  {
    icon: Focus,
    title: "Works in the app already open",
    body: "Dictate into notes, docs, browsers, chat, tickets, and editors without changing windows or context.",
  },
  {
    icon: WalletCards,
    title: `One-time ${vornOneTimePrice}`,
    body: "Vorn keeps the pricing simple: buy it once and use it without another monthly subscription.",
  },
];

export const voiceWorkflow = [
  {
    step: "01",
    title: "Press your shortcut",
    body: "Start dictation from any Mac app with a push-to-talk key combo you choose.",
  },
  {
    step: "02",
    title: "Say what you want written",
    body: "Speak a message, note, doc paragraph, update, or reply in natural language.",
  },
  {
    step: "03",
    title: "Release to insert text",
    body: "Vorn transcribes the audio and sends clean text back to the app already in focus.",
  },
] as const;

export const voiceHighlights = [
  {
    icon: Command,
    title: "Custom push-to-talk shortcut",
    body: "Choose the key combo that feels natural, then start dictation from anywhere on your Mac.",
  },
  {
    icon: Bolt,
    title: "Local transcription",
    body: "Speech-to-text runs on device so dictation stays fast and ready whenever you need it.",
  },
  {
    icon: WandSparkles,
    title: "Paste back into the current app",
    body: "Release the shortcut and Vorn returns the transcript to the text field already in focus.",
  },
  {
    icon: Shield,
    title: "Guided setup checks",
    body: "Permission and runtime checks help you get working without guesswork on day one.",
  },
  {
    icon: Focus,
    title: "Useful for everyday writing",
    body: "Handle messages, notes, docs, tickets, and status updates without breaking your flow.",
  },
  {
    icon: WalletCards,
    title: `${vornOneTimePrice} once`,
    body: "Pay once instead of picking up another recurring subscription just to turn speech into text.",
  },
];

export const voiceUseCases: VoiceUseCase[] = [
  {
    title: "Messages and follow-ups",
    body: "Reply while the thought is fresh instead of retyping it from scratch.",
    example:
      "Thanks. I reviewed the change and it looks ready to ship after one more quick test.",
  },
  {
    title: "Notes while you think",
    body: "Capture rough ideas, meeting notes, and reminders before they disappear.",
    example:
      "Customer wants a simpler export flow and clearer status messaging on the empty state.",
  },
  {
    title: "Docs and handoff updates",
    body: "Draft internal docs, outlines, and status notes without bouncing between tabs.",
    example:
      "Here is the rollout plan, the risk to watch, and what the next person should pick up tomorrow.",
  },
  {
    title: "Tickets and support replies",
    body: "Explain what changed or what happens next in plain language.",
    example:
      "I found the issue, restarted the sync, and the updated records should appear in a few minutes.",
  },
];

export const voiceComparisonRows: VoiceComparisonRow[] = [
  {
    label: "Price model",
    vorn: `${vornOneTimePrice} one time`,
    wisprFlow: "Free tier, then a recurring subscription for Pro",
  },
  {
    label: "Product shape",
    vorn: "A focused Mac dictation app built around fast push-to-talk writing",
    wisprFlow: "A broader voice product with more modes, tiers, and workflow features",
  },
  {
    label: "Best fit",
    vorn: "People who want simple voice-to-text without another monthly bill",
    wisprFlow: "People who want a larger subscription product and a wider feature set",
  },
] as const;

export const voiceFaqs = [
  {
    question: "What does Vorn Voice do?",
    answer:
      "It turns speech into text in the Mac app you are already using. Hold your shortcut, speak naturally, and release to insert the result.",
  },
  {
    question: "Where can I use it?",
    answer:
      "Anywhere you can normally type on macOS: notes, docs, chat, browsers, ticketing tools, and editors.",
  },
  {
    question: "Does it run on my Mac?",
    answer: "Yes. Vorn is built around local, on-device transcription.",
  },
  {
    question: "How much does it cost?",
    answer: `Vorn Voice is ${vornOneTimePrice} one time. There is no recurring subscription.`,
  },
  {
    question: `How is it different from ${wisprFlowName}?`,
    answer: `Vorn is a smaller, simpler Mac dictation app with a one-time ${vornOneTimePrice} price. ${wisprFlowName} offers a broader product with subscription tiers.`,
  },
  {
    question: "Can I change the hotkey?",
    answer: "Yes. You can capture and validate your own global shortcut in settings.",
  },
] as const;
