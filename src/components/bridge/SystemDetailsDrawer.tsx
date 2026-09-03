import { useState } from "react";
import {
  Settings2,
  ChevronUp,
  ListTodo,
  Activity,
  ScrollText,
  Search,
  Layers3,
  Stethoscope,
  ShieldAlert,
  Radio,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PANELS = [
  { icon: ListTodo, label: "Tasks", meta: "3 open · 1 running" },
  { icon: Activity, label: "Agent status", meta: "ChatGPT ready · Studio working" },
  { icon: ScrollText, label: "Logs", meta: "412 lines" },
  { icon: Search, label: "Findings", meta: "2 open" },
  { icon: Layers3, label: "Batch status", meta: "Idle" },
  { icon: Stethoscope, label: "Diagnostics", meta: "All checks pass" },
  { icon: ShieldAlert, label: "Emergency controls", meta: "Halt · Reset routing" },
  { icon: Radio, label: "Raw messages", meta: "Heartbeats hidden" },
  { icon: Route, label: "Advanced routing", meta: "Auto (ChatGPT lead)" },
];

export function SystemDetailsDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="shrink-0 border-t border-border bg-surface/50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center gap-2 px-3 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground sm:px-4"
      >
        <Settings2 className="size-4" />
        System Details
        <ChevronUp className={cn("ml-auto size-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="thin-scrollbar max-h-[38vh] animate-rise overflow-y-auto border-t border-border px-3 py-3 sm:px-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PANELS.map((p) => (
              <button
                key={p.label}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
              >
                <p.icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium">{p.label}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">{p.meta}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
