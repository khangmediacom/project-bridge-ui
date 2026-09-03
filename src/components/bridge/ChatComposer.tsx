import { useRef, useState } from "react";
import { Sparkles, Brain, Boxes, ChevronDown, ArrowUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Target = "auto" | "chatgpt" | "studio" | "session";

const TARGETS: { key: Target; label: string; icon: typeof Sparkles }[] = [
  { key: "auto", label: "Auto", icon: Sparkles },
  { key: "chatgpt", label: "ChatGPT", icon: Brain },
  { key: "studio", label: "AI Studio", icon: Boxes },
  { key: "session", label: "Specific session", icon: Check },
];

export function ChatComposer({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const [target, setTarget] = useState<Target>("auto");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "delivered">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = TARGETS.find((t) => t.key === target)!;
  const ActiveIcon = active.icon;

  function submit() {
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText("");
    setState("sending");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState("delivered");
      timer.current = setTimeout(() => setState("idle"), 1400);
    }, 550);
  }

  return (
    <div className="sticky bottom-0 shrink-0 border-t border-border bg-background/85 px-3 py-2.5 backdrop-blur sm:px-4">
      <div className="mx-auto max-w-4xl">
        {pickerOpen && (
          <div className="mb-2 flex animate-rise flex-wrap gap-1.5">
            {TARGETS.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTarget(t.key);
                  setPickerOpen(false);
                }}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] transition-colors",
                  t.key === target
                    ? "border-gpt/40 bg-gpt/10 text-gpt"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground",
                )}
              >
                <t.icon className="size-3.5" />
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 shadow-panel focus-within:ring-2 focus-within:ring-ring/60">
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-surface-2 px-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ActiveIcon className="size-3.5" />
            <span className="hidden sm:inline">{active.label}</span>
            <ChevronDown className={cn("size-3 transition-transform", pickerOpen && "rotate-180")} />
          </button>

          <textarea
            value={text}
            rows={1}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Message Bridge..."
            className="max-h-40 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-[14px] leading-snug outline-none placeholder:text-muted-foreground/70"
          />

          <button
            onClick={submit}
            disabled={!text.trim()}
            aria-label="Send"
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 disabled:opacity-30",
              state === "sending" && "scale-95",
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>

        <div className="h-4 pt-1 text-right text-[10.5px] text-muted-foreground">
          {state === "sending" && <span className="animate-fade">Sending…</span>}
          {state === "delivered" && <span className="animate-fade text-gpt">Delivered</span>}
        </div>
      </div>
    </div>
  );
}
