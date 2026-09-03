import { createFileRoute } from "@tanstack/react-router";
import { BridgeShell } from "@/components/bridge/BridgeShell";

const title = "Bridge — AI Orchestration Workspace";
const description =
  "Bridge coordinates ChatGPT, Google AI Studio and GitHub in one tablet-first AI development workspace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BridgeShell />;
}
