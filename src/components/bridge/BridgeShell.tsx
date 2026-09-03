import { useEffect, useMemo, useState } from "react";
import { TopBar } from "./TopBar";
import { ProjectSwitcher } from "./ProjectSwitcher";
import { ProjectContextBar } from "./ProjectContextBar";
import { AgentMiniStatus } from "./AgentMiniStatus";
import { BridgeChat } from "./BridgeChat";
import { ChatComposer } from "./ChatComposer";
import { SystemDetailsDrawer } from "./SystemDetailsDrawer";
import { FEEDS, PROJECTS, type ChatMessage, type Project } from "@/lib/bridge-data";

const STORAGE_KEY = "bridge.activeProject";

export function BridgeShell() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [feeds, setFeeds] = useState<Record<string, ChatMessage[]>>(FEEDS);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved && PROJECTS.some((p) => p.id === saved)) setActiveId(saved);
  }, []);

  const active = useMemo(
    () => projects.find((p) => p.id === activeId) ?? projects[0],
    [projects, activeId],
  );

  function selectProject(id: string) {
    setActiveId(id);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, id);
  }

  function send(text: string) {
    const msg: ChatMessage = {
      kind: "message",
      id: `m-${Date.now()}`,
      author: "human",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text,
    };
    setFeeds((f) => ({ ...f, [active.id]: [...(f[active.id] ?? []), msg] }));
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <TopBar
        projectName={active.name}
        connected={active.connected}
        wake={active.wake}
        onToggleWake={() =>
          setProjects((ps) => ps.map((p) => (p.id === active.id ? { ...p, wake: !p.wake } : p)))
        }
      />

      <ProjectSwitcher
        projects={projects}
        activeId={active.id}
        onSelect={selectProject}
        onCreate={(draft) => {
          const id = draft.name.toLowerCase().replace(/\s+/g, "-") || `project-${Date.now()}`;
          const created: Project = {
            id,
            name: draft.name,
            repoUrl: draft.repoUrl,
            branch: "main",
            studio: draft.studioUrl ? { label: "Studio Main", id: "ws_new", url: draft.studioUrl } : null,
            chatgpt: draft.chatUrl ? { label: "Chat Main", id: "conv_new", url: draft.chatUrl } : null,
            connected: true,
            wake: false,
          };
          setProjects((ps) => [...ps, created]);
          setFeeds((f) => ({ ...f, [id]: [] }));
          selectProject(id);
        }}
      />

      <div key={active.id} className="flex min-h-0 flex-1 animate-fade flex-col">
        <ProjectContextBar
          project={active}
          onSave={(next) => setProjects((ps) => ps.map((p) => (p.id === next.id ? next : p)))}
        />

        <AgentMiniStatus
          gptState={active.chatgpt ? "ready" : "unbound"}
          studioState={active.id === "bridge" ? "working" : "idle"}
          task={active.id === "bridge" ? { id: "TASK-42", phase: "Building", progress: 62 } : null}
        />

        <BridgeChat messages={feeds[active.id] ?? []} />
        <ChatComposer onSend={send} />
      </div>

      <SystemDetailsDrawer />
    </div>
  );
}
