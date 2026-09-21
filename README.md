# Dinesh Kumar S - Portfolio

Modern, animated personal portfolio built with React + Vite + TypeScript + Tailwind CSS.

## Features

- 🌙 Dark theme by default + Light theme toggle
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive (mobile, tablet, desktop)
- ♻️ Reusable components
- 📄 Downloadable resume
- 🗂️ **Data-driven content** – edit `src/data/` files to add projects, experience, skills, education without touching UI code
- 🎨 Modern glassmorphism design with indigo/cyan accents

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3.4
- Framer Motion
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── sections/       # Page sections (Hero, About, Skills, etc.)
├── data/           # ⭐ All content lives here
│   ├── profile.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── index.ts
├── context/        # Theme context
├── App.tsx
├── main.tsx
└── index.css
public/
├── profile.png     # Profile photo
└── Resume.pdf      # Downloadable resume
```

## How to add content

- **New experience** → edit `src/data/experience.ts`
- **New project** → edit `src/data/projects.ts`
- **New skill group / skill** → edit `src/data/skills.ts`
- **New education** → edit `src/data/education.ts`
- **Profile / about / contact** → edit `src/data/profile.ts`

No UI code changes needed.

## Author

**Dinesh Kumar S**  
Backend Developer  
[GitHub](https://github.com/Dinesh-012) · [LinkedIn](https://linkedin.com/in/sdk07)
