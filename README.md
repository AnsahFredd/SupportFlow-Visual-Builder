# SupportFlow Visual Builder

This is a visual editor for customer-support chatbot flows. The brief was to replace a spreadsheet-based config with something you can actually see: the conversation as a flowchart, editable in place, with a way to test-drive the bot end to end.

I built the flowchart rendering and the connector lines by hand (no graph libraries), and kept all state in memory since there's no backend.

## What it does

- **Flow canvas** — renders each node from `flow_data.json` as a card placed at its x/y coordinates, with SVG lines connecting parents to children.
- **Node editor** — click a node to edit its question text; the canvas updates as you type.
- **Preview mode** — steps through the flow as a chat, the way a customer would see it. A side panel logs the path taken and the answer chosen at each step. When you hit an end node you can restart.
- **Advanced logic** — my wildcard feature (see below).

## The wildcard feature

I added an **Advanced Logic** toggle on each node. When it's on, you can set a keyword, and the node only shows in preview if the user's previous answer contains that keyword (case-insensitive).

I picked this because the people configuring these bots are support managers, not developers. Letting them gate a node on what the customer actually said means they can build branching, context-aware flows themselves instead of filing a ticket for an engineer to hardcode it.

## Stack

React + TypeScript, built with Vite. Styling is plain CSS — no UI frameworks.

## Design file

[Figma Design Link] — https://www.figma.com/design/B8DqfH4XPUfmq31x6CdpdU/SupportFlow-Visual-Builder?node-id=1-3&t=0GaX999kdlj3wWcG-1

## Running it

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Deployment

Live: https://support-flow-visual-builder-weld.vercel.app/
