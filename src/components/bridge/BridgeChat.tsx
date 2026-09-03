import { useState } from "react";
import { User, Brain, Boxes, Check, Play, TriangleAlert, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/bridge-data";

const AUTHOR = {
  human: { name: "You", icon: User, accent: "text-human", bubble: "border-human/20 bg-human/8", dot: "bg-human" },
  chatgpt: { name: "ChatGPT", icon: Brain, accent: "text-gpt", bubble: "border-gpt/20 bg-gpt/8", dot: "bg-gpt" },
  studio: { name: "AI Studio", icon: Boxes, accent: "text-studio", bubble: "border-studio/20 bg-studio/8", dot: "bg-studio" },
} as const;

const TONE = {
  ok: { icon: Check, cls: "text-gpt border-gpt/20 bg-gpt/8" },
  run: { icon: Play, cls: "text-studio border-studio/20 bg-studio/8" },
  warn: { icon: TriangleAlert, cls: "text-warn border-warn/25 bg-warn/8" },
  wake: { icon: Zap, cls: "text-warn border-warn/20 bg-warn/8" },
} as const;

function MessageRow({ m }: { m: Extract<ChatMessage, { kind: "message" }> }) {
  const a = AUTHOR[m.author];
  const Icon = a.icon;
  const mine = m.author === "human";
  return (
    <div className={cn("flex animate-rise gap-2.5", mine && "flex-row-reverse")}>
      <span
        className={cn(
          "mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-surface",
          a.accent,
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <div className={cn("min-w-0 max-w-[min(46rem,88%)]", mine && "items-end text-right")}>
        <div className={cn("mb-1 flex items-center gap-2 text-[11px]", mine && "justify-end")}>
          <span className={cn("font-semibold", a.accent)}>{a.name}</span>
          <span className="text-muted-foreground">{m.time}</span>
        </div>
        <div
          className={cn(
            "rounded-xl border px-3 py-2 text-left text-[13.5px] leading-relaxed",
            mine ? "border-human/25 bg-human/10" : a.bubble,
          )}
        >
          {m.text}
        </div>
      </div>
    </div>
  );
}

function EventRow({ e }: { e: Extract<ChatMessage, { kind: "event" }> }) {
  const [open, setOpen] = useState(false);
  const t = TONE[e.tone];
  const Icon = t.icon;
  return (
    <div className="flex animate-rise justify-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full max-w-[min(46rem,92%)] rounded-lg border px-3 py-1.5 text-left transition-colors",
          t.cls,
        )}
      >
        <span className="flex items-center gap-2 text-[12px] font-medium">
          <Icon className="size-3.5 shrink-0" />
          <span className="truncate">{e.label}</span>
          <span className="ml-auto shrink-0 text-[10px] opacity-70">{e.time}</span>
          <ChevronRight className={cn("size-3.5 shrink-0 transition-transform", open && "rotate-90")} />
        </span>
        {open && (
          <p className="mt-1.5 animate-fade text-[12px] leading-relaxed text-muted-foreground">{e.detail}</p>
        )}
      </button>
    </div>
  );
}

export function BridgeChat({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="thin-scrollbar flex-1 overflow-y-auto px-3 pb-2 sm:px-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 py-2">
        {messages.map((m) =>
          m.kind === "message" ? <MessageRow key={m.id} m={m} /> : <EventRow key={m.id} e={m} />,
        )}
      </div>
    </div>
  );
}
