# AGENTS.md — BRAIN DYPCOEI Website

## Stack & Conventions
- Next.js App Router, TypeScript strict mode — never use `any`.
- Tailwind CSS + shadcn/ui for all UI; don't pull in another component or styling library without asking first.
- Supabase for Postgres, Auth, and Storage. Row Level Security is mandatory on every table — no table ships without a policy.
- Server components by default; add `"use client"` only where interactivity actually requires it.
- Keep components small and single-purpose; separate UI, business logic, and data access (`lib/supabase`, `lib/validation`).
- All forms use React Hook Form + Zod, validated on both client and server.
- After any non-trivial change, run lint, typecheck, and build — fix failures before calling a task done.

## Design — Do Not Violate
- **Light theme only**. Never add dark-mode styles, a `dark:` Tailwind variant set, or a theme toggle, even if it seems like a natural improvement.
- **One accent color, used sparingly**. If the real BRAIN DYPCOEI brand color hasn't been provided yet, use the placeholder in the design tokens (`#2E4CFF`) and leave a clear comment that it's a placeholder — don't invent a "final" palette.
- White and off-white surfaces, generous whitespace, thin borders, very subtle shadows.
- Dark charcoal or deep-navy text for contrast (`#14161A` / `#0F172A`), never pure black, never low-contrast gray.
- No neon, no heavy gradients, no glassmorphism, no stock robot imagery, no excessive card grids.

## Content — Do Not Violate
- Never fabricate events, team members, projects, testimonials, sponsors, or statistics.
- Placeholder content must be obviously placeholder (for example, `"Sample Event — replace with real data"`), never realistic-looking fake data.

## Safety & Autonomy
- Never run a destructive database migration (dropping a table or column, truncating data) without pausing for explicit approval first.
- Never commit `.env` files or a Supabase service-role key. Server-only secrets stay server-only.
- Don't install a new dependency that isn't already agreed in the spec without asking first.
- Don't modify or weaken an existing RLS policy without showing the before/after and asking for approval.

## Verification
- A change to a public page or a form isn't done until you've driven the browser through it yourself and put a screenshot in the Walkthrough. "The code looks right" is not verification.
