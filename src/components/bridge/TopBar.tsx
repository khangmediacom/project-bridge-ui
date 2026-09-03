import { Bell, Settings, Zap, Waypoints } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusDot({ tone = "gpt", pulse = true }: { tone?: string; pulse?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block size-1.5 rounded-full",
        pulse && "animate-pulse-dot",
        tone === "gpt" && "bg-gpt",
        tone === "studio" && "bg-studio",
        tone === "warn" && "bg-warn",
        tone === "off" && "bg-muted-foreground",
      )}
    />
  );
}

export function TopBar({
  projectName,
  connected,
  wake,
  onToggleWake,
}: {
  projectName: string;
  connected: boolean;
  wake: boolean;
  onToggleWake: () => void;
}) {
  return (
    <header className="grid h-12 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface/70 px-3 backdrop-blur sm:grid-cols-[1fr_auto_1fr] sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gpt/15 text-gpt">
          <Waypoints className="size-4" />
        </span>
        <span className="truncate text-[13px] font-semibold tracking-[0.18em]">BRIDGE</span>
      </div>

      <div className="hidden min-w-0 justify-center sm:flex">
        <span className="truncate text-sm font-medium text-muted-foreground">{projectName}</span>
      </div>

      <div className="flex items-center justify-end gap-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium">
          <StatusDot tone={connected ? "gpt" : "off"} pulse={connected} />
          <span className="hidden xs:inline sm:inline">{connected ? "Connected" : "Offline"}</span>
        </span>
        <button
          onClick={onToggleWake}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200",
            wake
              ? "border-warn/30 bg-warn/10 text-warn"
              : "border-border bg-surface-2/60 text-muted-foreground",
          )}
        >
          <Zap className="size-3" />
          <span className="hidden sm:inline">Wake {wake ? "On" : "Off"}</span>
        </button>
        <button className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
          <Bell className="size-4" />
        </button>
        <button className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
          <Settings className="size-4" />
        </button>
      </div>
    </header>
  );
}
