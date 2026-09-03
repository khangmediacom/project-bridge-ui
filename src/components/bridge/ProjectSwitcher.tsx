import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/bridge-data";

type NewProject = { name: string; repoUrl: string; studioUrl: string; chatUrl: string };

const EMPTY: NewProject = { name: "", repoUrl: "", studioUrl: "", chatUrl: "" };

export function ProjectSwitcher({
  projects,
  activeId,
  onSelect,
  onCreate,
}: {
  projects: Project[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: (p: NewProject) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<NewProject>(EMPTY);

  return (
    <div className="shrink-0 border-b border-border bg-background/60 px-3 py-2 sm:px-4">
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
        {projects.map((p) => {
          const active = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={cn(
                "group inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-[13px] font-medium transition-all duration-200",
                active
                  ? "border-gpt/40 bg-gpt/12 text-gpt shadow-[0_0_0_3px_var(--color-gpt)/8]"
                  : "border-border bg-surface text-muted-foreground hover:border-border hover:bg-surface-2 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  active ? "animate-pulse-dot bg-gpt" : "bg-muted-foreground/50",
                )}
              />
              {p.name}
              {active && (
                <span className="rounded-full bg-gpt/15 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.12em]">
                  ACTIVE
                </span>
              )}
            </button>
          );
        })}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Add project"
          className={cn(
            "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-dashed px-3 text-[13px] transition-colors duration-200",
            open
              ? "border-human/50 bg-human/10 text-human"
              : "border-border text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          )}
        >
          <Plus className={cn("size-4 transition-transform duration-200", open && "rotate-45")} />
          <span className="hidden sm:inline">Add Project</span>
        </button>
      </div>

      {open && (
        <div className="mt-2 animate-rise rounded-xl border border-border bg-surface p-3 shadow-panel">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Project name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
            <Field label="GitHub repo URL" value={draft.repoUrl} onChange={(v) => setDraft({ ...draft, repoUrl: v })} />
            <Field label="AI Studio URL" value={draft.studioUrl} onChange={(v) => setDraft({ ...draft, studioUrl: v })} />
            <Field label="ChatGPT conversation URL" value={draft.chatUrl} onChange={(v) => setDraft({ ...draft, chatUrl: v })} />
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => {
                setDraft(EMPTY);
                setOpen(false);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <X className="size-3.5" /> Cancel
            </button>
            <button
              disabled={!draft.name.trim()}
              onClick={() => {
                onCreate(draft);
                setDraft(EMPTY);
                setOpen(false);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Check className="size-3.5" /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[13px] outline-none transition-shadow placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
