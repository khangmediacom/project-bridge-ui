export type AgentKey = "human" | "chatgpt" | "studio" | "system";

export type SessionRef = {
  label: string;
  id: string;
  url: string;
};

export type Project = {
  id: string;
  name: string;
  repoUrl: string;
  branch: string;
  studio: SessionRef | null;
  chatgpt: SessionRef | null;
  connected: boolean;
  wake: boolean;
};

export type ChatMessage =
  | {
      kind: "message";
      id: string;
      author: Exclude<AgentKey, "system">;
      time: string;
      text: string;
    }
  | {
      kind: "event";
      id: string;
      time: string;
      tone: "ok" | "run" | "warn" | "wake";
      label: string;
      detail: string;
    };

export const PROJECTS: Project[] = [
  {
    id: "bridge",
    name: "Bridge",
    repoUrl: "github.com/machxanht/BridgeChatgpt",
    branch: "main",
    studio: { label: "AI Studio Main", id: "ws_8f21ac", url: "https://aistudio.google.com/app/prompts/1" },
    chatgpt: { label: "Bridge Chat Main", id: "conv_41d0", url: "https://chatgpt.com/c/bridge-main" },
    connected: true,
    wake: true,
  },
  {
    id: "khmer-chess",
    name: "Khmer Chess",
    repoUrl: "github.com/machxanht/khmer-chess",
    branch: "dev",
    studio: { label: "Chess Studio", id: "ws_2b90de", url: "https://aistudio.google.com/app/prompts/2" },
    chatgpt: null,
    connected: true,
    wake: false,
  },
  {
    id: "learning-khmer",
    name: "Learning Khmer",
    repoUrl: "github.com/machxanht/learning-khmer",
    branch: "main",
    studio: { label: "Lessons Studio", id: "ws_77c1aa", url: "https://aistudio.google.com/app/prompts/3" },
    chatgpt: { label: "Khmer Tutor Chat", id: "conv_9ac2", url: "https://chatgpt.com/c/khmer" },
    connected: false,
    wake: false,
  },
];

export const FEEDS: Record<string, ChatMessage[]> = {
  bridge: [
    { kind: "message", id: "m1", author: "human", time: "09:41", text: "Fix the login problem." },
    {
      kind: "message",
      id: "m2",
      author: "chatgpt",
      time: "09:41",
      text: "I analyzed it — the session token is dropped on refresh. I'm sending Studio these changes to the auth middleware and the token store.",
    },
    { kind: "event", id: "e1", time: "09:42", tone: "wake", label: "Studio woke", detail: "Wake Engine delivered payload to AI Studio Main (ws_8f21ac)." },
    { kind: "event", id: "e2", time: "09:42", tone: "run", label: "TASK-42 · Build running", detail: "Branch main · patch 3 files · pnpm build" },
    {
      kind: "message",
      id: "m3",
      author: "studio",
      time: "09:47",
      text: "Build finished. Tests passed — 28 green, 0 failed. Patch applied to src/auth/session.ts and src/auth/middleware.ts.",
    },
    { kind: "event", id: "e3", time: "09:47", tone: "ok", label: "28 tests passed", detail: "vitest run · 1.9s · no regressions detected." },
    {
      kind: "message",
      id: "m4",
      author: "chatgpt",
      time: "09:48",
      text: "Reviewed. One issue remains: refresh tokens are still stored in localStorage. I'd move them to an httpOnly cookie before merging.",
    },
    { kind: "event", id: "e4", time: "09:48", tone: "warn", label: "Review requested", detail: "TASK-42 awaiting your approval to open a PR against main." },
  ],
  "khmer-chess": [
    { kind: "message", id: "k1", author: "human", time: "08:12", text: "Generate the piece movement rules." },
    { kind: "event", id: "k2", time: "08:13", tone: "warn", label: "ChatGPT not bound", detail: "Register a ChatGPT conversation to enable routing for this project." },
  ],
  "learning-khmer": [
    { kind: "message", id: "l1", author: "studio", time: "Yesterday", text: "Lesson generator export completed. 42 cards written to /content." },
  ],
};

export const AGENT_META: Record<
  Exclude<AgentKey, "system">,
  { name: string; dot: string; ring: string; text: string }
> = {
  human: { name: "You", dot: "bg-human", ring: "ring-human/30", text: "text-human" },
  chatgpt: { name: "ChatGPT", dot: "bg-gpt", ring: "ring-gpt/30", text: "text-gpt" },
  studio: { name: "AI Studio", dot: "bg-studio", ring: "ring-studio/30", text: "text-studio" },
};
