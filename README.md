# Qarint Junior

Gamified English learning platform for Muslim children (ages 4-12).

## Features

- 🎮 4 Mini Games (Memory Match, Splat Word Hunt, Sentence Builder, Mad-Libs)
- 🏆 Gamification System (XP, Streak, Leaderboard)
- 📚 Cambridge YLE Aligned Curriculum
- 🎨 Safe, Family-Values Based Content
- 🔊 Web Speech API for pronunciation

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Supabase (Database & Auth)
- Canvas Confetti (Celebrations)
- Heroicons (UI Icons)
- OpenMoji (Game Illustrations)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Set up Supabase database:
   - Run `supabase/schema.sql` in your Supabase SQL editor
   - Run `supabase/seed.sql` to populate initial vocabulary

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── components/        # Layout components (Sidebar, Topbar)
│   ├── games/             # Game pages
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   └── games/             # Game components
├── lib/                    # Utilities
│   └── supabase/          # Supabase clients
├── store/                  # Zustand stores
├── actions/                # Server Actions
├── types/                  # TypeScript types
└── supabase/               # Database schema & seeds
```

## Development Rules

See `.cursorrules` for:
- Cultural safety guidelines
- UI/UX design system
- Code quality standards
- Content filtering rules

## License

Private - Qarint Platform
