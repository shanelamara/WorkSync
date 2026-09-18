# WorkSync

> A personalized project management system designed for organizing, prioritizing, tracking, and executing tasks with high velocity.

---

## 🏗️ Architecture Overview

WorkSync is structured using a **Feature-Sliced / Domain-Driven Architecture** integrated with the **Next.js (App Router)** framework. The codebase is organized by business domain (`projects`, `tasks`, `views`, `analytics`, `settings`) rather than flat technical categories, making it intuitive to maintain, extend, and scale.

```
WorkSync/
├── public/                     # Static assets (brand SVG, favicons)
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, route handlers)
│   │   ├── (dashboard)/        # Authenticated/Main workspace layout group
│   │   │   ├── dashboard/      # Executive overview & personal scorecard
│   │   │   ├── projects/       # Projects gallery and filtering
│   │   │   │   └── [id]/       # Dynamic workspace (Kanban, List, Calendar views)
│   │   │   ├── tasks/          # Universal inbox & cross-project task manager
│   │   │   ├── calendar/       # Master schedule & focus timer
│   │   │   ├── analytics/      # Velocity charts, streaks, and throughput metrics
│   │   │   ├── settings/       # Theme, accent colors, and personalization
│   │   │   └── layout.tsx      # Application shell (Sidebar, Navbar, Command Menu)
│   │   ├── api/                # REST route handlers (/api/tasks, /api/projects)
│   │   ├── globals.css         # Modern design tokens, variables, & styling
│   │   ├── layout.tsx          # Root HTML layout with providers & fonts
│   │   └── page.tsx            # Welcome / landing page
│   ├── components/             # Reusable, domain-agnostic UI primitives
│   │   ├── layout/             # Sidebar, Navbar, CommandPalette
│   │   └── ui/                 # Button, Card, Badge, Modal, Input
│   ├── features/               # Modular business domains
│   │   ├── projects/           # Project cards, header, types, actions
│   │   ├── tasks/              # Task cards, quick add, types, actions
│   │   ├── views/              # Visualization engines (KanbanBoard, TaskTable)
│   │   ├── analytics/          # Productivity scorecard & velocity calculations
│   │   └── settings/           # Personalization and theme controls
│   ├── lib/                    # Shared utilities, persistence, and storage helpers
│   ├── types/                  # Global TypeScript contracts and domain models
│   └── data/                   # Realistic starter seed dataset
├── .env.example                # Sample environment configuration
├── .gitignore                  # Git ignore rules for Next.js & Node
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript path alias configuration (@/* -> ./src/*)
└── next.config.ts              # Next.js build configuration
```

---

## 🚀 Key Features

1. **Executive Command Center**: High-level daily scorecards, active project snapshots, and urgent priority action items.
2. **Dynamic Kanban Board**: 5-column workflow (`Backlog`, `To Do`, `In Progress`, `Review`, `Done`) with inline task creation.
3. **Structured Table View**: Dense, sorted task list for fast inline tracking across projects.
4. **Streak & Velocity Engine**: Personal productivity metrics, milestone badges, and weekly velocity visualizations.
5. **Command Palette (`Ctrl+K` / `Cmd+K`)**: Keyboard-driven navigation across any view or project.
6. **Custom Personalization**: Interface theme switcher (Dark/Light/System) and customizable accent color schemes.
7. **Offline-Ready & Extensible**: Built with an offline-first storage and seed system that can seamlessly connect to Prisma, SQLite, PostgreSQL, or Supabase.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
npm run start
```
