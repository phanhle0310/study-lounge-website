# Ma Space
Run: `npm install` then `npm run dev` (open the address it prints). Deploy: push to GitHub, import in Vercel (vercel.json already handles page refreshes).
- `src/config/site.ts` — business name, opening hours (edit placeholders here)
- `src/data/` — spaces, menu, membership plans
- `src/services/` — ALL data access. Swap `mockBookingService` for a Supabase version in `services/index.ts`
- `src/lib/` — pricing + availability rules (pure functions)
- `src/pages/`, `src/components/` — screens and reusable pieces
