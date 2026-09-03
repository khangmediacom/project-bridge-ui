import { useEffect, useState } from "react";
import {
  Github,
  ExternalLink,
  Pencil,
  Check,
  X,
  Layers,
  MoreHorizontal,
  TriangleAlert,
  GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/bridge-data";
import { Field } from "./ProjectSwitcher";

function SessionChip({
  tone,
  kind,
  label,
  id,
  url,
}: {
  tone: "studio" | "gpt";
  kind: string;
  label: string;
  id: string;
  url: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-surface-2/50 px-2.5 py-1.5">
      <span
        className={cn("size-1.5 shrink-0 animate-pulse-dot rounded-full", tone === "gpt" ? "bg-gpt" : "bg-studio")}
      />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-medium leading-tight">{label}</div>
        <div className="truncate text-[10px] leading-tight text-muted-foreground" title={id}>
          {kind}
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="ml-auto grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
        aria-label={`Open ${kind}`}
      >
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}

export function ProjectContextBar({
  project,
  onSave,
}: {
  project: Project;
  onSave: (p: Project) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(project);

  useEffect(() => {
    setDraft(project);
    setEditing(false);
  }, [project]);

  return (
    <section className="shrink-0 animate-fade px-3 py-2 sm:px-4">
      <div className="rounded-xl border border-border bg-surface p-2.5 shadow-panel">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-muted-foreground">
              <Github className="size-4" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold leading-tight">{project.name}</div>
              <div className="flex min-w-0 items-center gap-1 text-[11px] leading-tight text-muted-foreground">
                <GitBranch className="size-3 shrink-0" />
                <span className="shrink-0">{project.branch}</span>
                <span className="truncate">· {project.repoUrl}</span>
              </div>
            </div>
          </div>

          <div className="col-span-2 grid gap-2 sm:grid-cols-2 lg:col-span-2 lg:contents">
            {project.studio ? (
              <SessionChip tone="studio" kind="AI Studio" {...project.studio} />
            ) : (
              <Warn text="Bind AI Studio workspace" />
            )}
            {project.chatgpt ? (
              <SessionChip tone="gpt" kind="ChatGPT" {...project.chatgpt} />
            ) : (
              <Warn text="Bind ChatGPT conversation" />
            )}
          </div>

          <div className="flex items-center justify-end gap-1">
            <IconBtn label="Edit" onClick={() => setEditing((v) => !v)} active={editing}>
              <Pencil className="size-4" />
            </IconBtn>
            <IconBtn label="Open stack">
              <Layers className="size-4" />
            </IconBtn>
            <IconBtn label="More">
              <MoreHorizontal className="size-4" />
            </IconBtn>
          </div>
        </div>

        {editing && (
          <div className="mt-2.5 animate-rise border-t border-border pt-2.5">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Project name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
              <Field label="Repo URL" value={draft.repoUrl} onChange={(v) => setDraft({ ...draft, repoUrl: v })} />
              <Field label="Branch" value={draft.branch} onChange={(v) => setDraft({ ...draft, branch: v })} />
              <Field
                label="Studio URL"
                value={draft.studio?.url ?? ""}
                onChange={(v) =>
                  setDraft({ ...draft, studio: { id: draft.studio?.id ?? "", label: draft.studio?.label ?? "", url: v } })
                }
              />
              <Field
                label="Studio session label"
                value={draft.studio?.label ?? ""}
                onChange={(v) =>
                  setDraft({ ...draft, studio: { id: draft.studio?.id ?? "", url: draft.studio?.url ?? "", label: v } })
                }
              />
              <Field
                label="ChatGPT URL"
                value={draft.chatgpt?.url ?? ""}
                onChange={(v) =>
                  setDraft({ ...draft, chatgpt: { id: draft.chatgpt?.id ?? "", label: draft.chatgpt?.label ?? "", url: v } })
                }
              />
              <Field
                label="ChatGPT session label"
                value={draft.chatgpt?.label ?? ""}
                onChange={(v) =>
                  setDraft({ ...draft, chatgpt: { id: draft.chatgpt?.id ?? "", url: draft.chatgpt?.url ?? "", label: v } })
                }
              />
            </div>
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => {
                  setDraft(project);
                  setEditing(false);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-3.5" /> Cancel
              </button>
              <button
                onClick={() => {
                  onSave(draft);
                  setEditing(false);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Check className="size-3.5" /> Save
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Warn({ text }: { text: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-warn/25 bg-warn/8 px-2.5 py-1.5 text-[12px] font-medium text-warn transition-colors hover:bg-warn/15">
      <TriangleAlert className="size-3.5 shrink-0" />
      <span className="truncate">{text}</span>
    </button>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "grid size-9 place-items-center rounded-lg transition-colors",
        active ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
