# Atelier 🎨

Welcome to **Atelier**, my personal monorepo. This is where I experiment, build, and showcase various projects, tools, and applications for my portfolio.

Named after an artist's workshop, Atelier serves as a centralized creative space to keep all my code organized, share components, and maintain a consistent workflow across different projects.

---

## 📂 Project Structure

```text
atelier/
├── apps/                # Standalone applications (web apps, mobile, etc.)
│   ├── project-1/       # First project
│   └── project-2/       # Second project
├── packages/            # Shared libraries, UI components, and configs
│   ├── ui/              # Shared design system / UI components
│   └── config/          # Shared configurations (TypeScript, ESLint, etc.)
└── package.json         # Root workspace configuration

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or your preferred package manager like npm/yarn)

### Installation

Clone the repository and install dependencies from the root directory:

```bash
# Clone the repository
git clone https://github.com/kevon-net/atelier.git
cd atelier

# Install dependencies
pnpm install

```

---

## 💻 Development

You can run individual projects or work across the workspace using your package manager's workspace commands.

- **Run a specific project:** `pnpm <app-name>:dev`
- **If a project is exported statically, run with:** `npx serve@latest out -l <port>`

---

## 🛠️ Tech Stack

- **Monorepo Manager:** pnpm Workspaces (or Turborepo / Nx if applicable)
- **Frontend:** React / Next.js / TypeScript (adjust as needed)
- **Styling:** Tailwind CSS

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
