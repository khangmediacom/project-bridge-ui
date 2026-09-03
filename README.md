# Bridge AI Workspace

Redesign the entire frontend UI of my existing application called “Bridge”.



Bridge is NOT a generic dashboard. It is a tablet-first AI orchestration workspace where the user should be able to work almost entirely inside one Android APK.



The app coordinates:

- Human user

- ChatGPT Web as the main architect / coder / reviewer

- Google AI Studio as execution workspace / junior coder / build-test environment

- GitHub as source of truth

- Bridge backend as task, state, routing, wake and message relay



IMPORTANT:

This is a FRONTEND REDESIGN only.

Do not redesign or replace backend semantics, REST endpoints, task logic, Wake Engine, authentication, GitHub integration, resource registry, project routing, or Android automation.

The finished UI must be implementable in the existing React + TypeScript + Tailwind application.



PRIMARY DESIGN GOAL



The user should open Bridge APK and feel like they are using ONE unified AI development app.



The UI must be:

- extremely clean

- tablet-first

- fast to scan

- visually polished

- minimal text

- icon-driven

- compact

- modern

- not enterprise-dashboard clutter

- not full of large cards

- not full of repeated status text

- optimized for Samsung/Android tablet landscape and portrait



Use Lucide-style icons, subtle microanimations, smooth transitions, small status pulses, clear hierarchy and premium dark UI.



Do NOT overuse gradients, giant cards, glass effects or excessive borders.



==================================================

1. TOP APP BAR

==================================================



Very compact height.



Left:

Bridge logo/icon

BRIDGE



Center:

Current active project name



Right compact status chips:

● Connected

⚡ Wake On



Optional small notification / settings icon.



No large header block.



==================================================

2. PROJECT ROUTER — VERY IMPORTANT

==================================================



This must sit directly under the app bar.



Show ONLY projects that already exist.



Display projects as compact horizontal chips/cards.



Example:



[ 🟢 Bridge ACTIVE ] [ Khmer Chess ] [ Learning Khmer ] [ + ]



Rules:

- active project = clearly green

- inactive projects = neutral

- clicking another project immediately switches the full Bridge context

- no page reload

- smooth 150–250ms transition

- remember selected project

- designed conceptually like a lightweight 9router-style project/session switcher



The project creation form must NOT always be visible.



By default only show:



[ + Add Project ]



When clicked, expand a compact creation panel containing:



Project name

GitHub Repo URL

AI Studio URL

ChatGPT conversation URL



Save / Cancel



After saving, collapse the form again.



==================================================

3. ACTIVE PROJECT CONTEXT

==================================================



Do NOT create separate giant Repo / Studio / ChatGPT cards.



Put them into ONE compact project module.



Example structure:



Bridge

main

github.com/machxanht/BridgeChatgpt



AI Studio

● AI Studio Main

Open



ChatGPT

● Bridge Chat Main

Open



Actions:

Edit

Open Stack

More



The entire module should be approximately one compact panel, not three large columns.



Inline edit mode should allow editing:



Project name

Repo URL

Branch

Studio URL

Studio session label

ChatGPT URL

ChatGPT session label



Buttons:



Edit

Save

Cancel

Open Repo

Open Studio

Open ChatGPT



When edit is OFF, hide all input boxes.



Show human-readable session names first.

IDs may appear only as tiny secondary metadata or tooltip.



If a ChatGPT conversation is not registered, show one compact warning:



⚠ Bind ChatGPT conversation



Do not render a giant empty card.



==================================================

4. PROJECT SWITCHING / 9ROUTER-LIKE UX

==================================================



Switching project must immediately switch:



repo context

Studio target

ChatGPT target

Bridge Chat feed

task routing

wake routing



The frontend should visually behave like each project has its own workspace/session stack.



Provide UI states/hooks that can later integrate with Android native routing so selecting a project can bring its registered Studio and ChatGPT Chrome tabs into context.



Do not implement fake backend behavior.



==================================================

5. BRIDGE CHAT — THIS IS THE MAIN SCREEN

==================================================



Bridge Chat should occupy most of the screen.



This is the primary workspace.



It should feel closer to ChatGPT / Slack / modern AI chat than a mission-control dashboard.



Message feed examples:



👤 You

Fix the login problem.



🧠 ChatGPT

I analyzed it. I’m sending Studio these changes...



🔵 AI Studio

Build finished.

Tests passed.



🧠 ChatGPT

Reviewed. One issue remains...



Messages must remain visible after sending.



Human messages, ChatGPT replies, Studio results, blockers, review requests and important task transitions appear in ONE chronological feed.



Use visually distinct bubbles:



Human = neutral / purple accent

ChatGPT = green or emerald accent

AI Studio = cyan / blue accent

System/task state = small compact status cards



Do NOT turn every task into a giant card.



Examples of compact inline system events:



✓ TASK-42 completed

⚡ Studio woke

◉ Build running

✓ 28 tests passed

⚠ Review requested



Clicking a system event may expand details.



==================================================

6. CHAT COMPOSER

==================================================



Sticky at bottom.



Large enough for tablet typing but visually simple.



Example:



[ Message Bridge...                           ] [ Send ]



Default mode:



✨ Auto



Auto means ChatGPT is the lead/router.



A small optional target selector may expand to:



Auto

ChatGPT

AI Studio

Specific session



Do not permanently show complicated routing controls.



Support multiline input.



Show sending / queued / delivered feedback subtly.



==================================================

7. TASKS AND AGENT STATUS

==================================================



Do NOT keep a huge Mission Control section on the main page.



At most show a tiny compact activity strip near Bridge Chat:



🧠 ChatGPT ● ready

🔵 Studio ● working

TASK-42 · Building · 62%



Everything else goes into a collapsed drawer:



⚙ System Details



Inside System Details place:



Tasks

Agent status

Logs

Findings

Batch status

Diagnostics

Emergency controls

Raw messages

Advanced routing



System Details must be collapsed by default.



==================================================

8. REMOVE / REDUCE CLUTTER

==================================================



Remove or hide from the main workspace:



duplicated repository cards

duplicated Studio cards

duplicated ChatGPT cards

large instructional paragraphs

internal workspace IDs

agent instance IDs

technical routing explanations

large status blocks

multiple separate task composers

multiple message composers

large activity log feeds

raw heartbeat messages

repeated badges



Technical information belongs in System Details or tooltips.



==================================================

9. VISUAL STYLE

==================================================



Premium modern dark UI.



Suggested palette:



background:

very dark navy / graphite



ChatGPT:

emerald



AI Studio:

cyan / blue



Human:

violet



Active project:

strong emerald / green



Warnings:

amber



Errors:

red



Use:

subtle shadows

soft borders

small glow only for active states

microanimations

animated status dot

smooth project switch

smooth expandable panels

animated send state



Avoid:

cyberpunk overload

huge neon borders

too many colors

large gradients

large glass cards

text-heavy enterprise UI



==================================================

10. TABLET RESPONSIVE BEHAVIOR

==================================================



Priority device:

Android tablet / Samsung tablet.



Landscape:

project router top

project context compact

Bridge Chat fills remaining space

System Details drawer collapsed



Portrait:

project chips horizontal scroll

project context stacks compactly

chat remains primary

composer always reachable



Buttons must be touch friendly.



Minimum comfortable touch targets.



No tiny desktop-only controls.



==================================================

11. COMPONENT ARCHITECTURE

==================================================



Design the frontend around clean reusable components such as:



BridgeShell

TopBar

ProjectSwitcher

AddProjectPopover

ProjectContextBar

SessionChip

BridgeChat

ChatMessage

TaskEvent

ChatComposer

AgentMiniStatus

SystemDetailsDrawer



The exact naming may differ.



==================================================

12. EXISTING DATA / API CONSTRAINTS

==================================================



Assume the existing backend already provides:



projects/workspaces

repository URL

branch

Studio registered resource URLs

ChatGPT registered conversation URLs

resource labels

connection status

tasks

messages

activities

Wake status



Do not invent a new backend.



The UI should consume existing state and actions.



Design editable components so Save maps cleanly to existing project/resource endpoints.



==================================================

13. FINAL RESULT

==================================================



The first screen should visually communicate only:



1. Which project am I in?

2. Is Bridge connected?

3. Are ChatGPT and Studio available?

4. What are the AIs currently doing?

5. What did they say?

6. Where do I type the next instruction?



Everything else should stay hidden until requested.



Please produce a complete polished frontend redesign with realistic mock data demonstrating:



- 3 projects

- one active project

- registered Studio session

- registered ChatGPT session

- chat conversation Human → ChatGPT → Studio → ChatGPT

- running task event

- collapsed System Details

- Add Project form collapsed by default



The design should look like a real premium AI development application, not an admin dashboard.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://project-bridge-ui.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/434cd75f-a916-4276-b83f-e8be6ed86607).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
