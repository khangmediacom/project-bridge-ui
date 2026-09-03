import { Brain, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

export function AgentMiniStatus({
  gptState,
  studioState,
  task,
}: {
  gptState: string;
  studioState: string;
  task: { id: string; phase: string; progress: number } | null;
}) {
  return (
    <div className="no-scrollbar flex shrink-0 items-center gap-3 overflow-x-auto border-y border-border bg-surface/40 px-3 py-1.5 text-[11.5px] sm:px-4">
      <span className="inline-flex shrink-0 items-center gap-1.5 text-muted-foreground">
        <Brain className="size-3.5 text-gpt" />
        <span className="size-1.5 animate-pulse-dot rounded-full bg-gpt" />
        {gptState}
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-muted-foreground">
        <Boxes className="size-3.5 text-studio" />
        <span className="size-1.5 animate-pulse-dot rounded-full bg-studio" />
        {studioState}
      </span>
      {task && (
        <span className="ml-auto inline-flex shrink-0 items-center gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">{task.id}</span>
          <span>· {task.phase}</span>
          <span className="relative h-1 w-20 overflow-hidden rounded-full bg-surface-2">
            <span
              className={cn("absolute inset-y-0 left-0 rounded-full bg-studio transition-all duration-500")}
              style={{ width: `${task.progress}%` }}
            />
          </span>
          <span className="tabular-nums">{task.progress}%</span>
        </span>
      )}
    </div>
  );
}
