# Docly

Docly is a real-time collaborative document editor inspired by Google Docs, enabling users to create, edit, and share documents seamlessly.

## Features

- **Real-time collaborative editing** — multiple users can edit the same document simultaneously, with live cursors and presence powered by Liveblocks.
- **Rich text editor** — built on Tiptap, supporting headings, text alignment, font family/size, line height, colors, highlights, links, images, tables, task lists, and more.
- **Comments & threads** — inline comments and discussion threads anchored to document content.
- **Notifications inbox** — an in-app notification center for document activity (comments, mentions, invites).
- **Authentication & organizations** — sign-in/sign-up and multi-organization support via Clerk, including room-level permissions.
- **Document management** — create, search, and browse documents from a home dashboard with pagination.
- **Collaborative margin ruler** — a shared, synced ruler for adjusting document margins.
- **Persistence** — documents and metadata are stored and queried through Convex.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) + React 19 |
| Editor | [Tiptap](https://tiptap.dev/) |
| Real-time collaboration | [Liveblocks](https://liveblocks.io/) |
| Backend / database | [Convex](https://www.convex.dev/) |
| Auth | [Clerk](https://clerk.com/) |
| Styling / UI | Tailwind CSS + Radix UI (shadcn-style components) |
| Language | TypeScript |
| Package manager | pnpm |

## Project Structure

```
convex/                  # Convex schema, queries/mutations, auth config
src/
  app/
    (auth)/              # Sign-in / sign-up routes
    (home)/               # Dashboard: document list, search, templates
    api/liveblocks-auth/  # Liveblocks auth endpoint
    documents/[documentId] # Editor page, toolbar, navbar, ruler, room, inbox
    store/                # Client-side state (editor store)
  components/ui/          # Shared UI primitives (Radix-based)
  extensions/              # Custom Tiptap extensions (font size, line height, etc.)
  hooks/                   # Shared React hooks
  lib/                     # Utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (this project uses pnpm as its package manager — see `packageManager` in `package.json`)
- A [Convex](https://www.convex.dev/) project
- A [Clerk](https://clerk.com/) application
- A [Liveblocks](https://liveblocks.io/) project

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root with the following:

```
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVEBLOCKS_SECRET_KEY=
```

### Run the development server

```bash
pnpm dev
```

In a separate terminal, run the Convex dev server:

```bash
npx convex dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for production

```bash
pnpm build
pnpm start
```

## Deployment

The app is designed to deploy on [Vercel](https://vercel.com/). Ensure the environment variables above are configured in your Vercel project settings, and that Vercel is set to use pnpm (via the `packageManager` field in `package.json` and a matching `pnpm-lock.yaml`).
