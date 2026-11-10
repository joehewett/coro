# CLAUDE.md

This repo is the portfolio site for Coro Benavent: https://corobenavent.com

## Who you work with

Coro is the main user. She is an actress, director and musician. She is not a developer.

- Talk to her in plain language. Do not explain code unless she asks.
- She will ask for content changes: new photos, new projects, new credits, text edits.
- Do the whole job yourself: edit, build, commit, push. Do not hand her terminal commands.
- If she sends a photo or file, copy it into `public/` (see below) and wire it up.
- When you finish, tell her what changed and give her the live link to check.
- Joe (the repo owner) built the site. If something is broken and you cannot fix it, tell her to ask Joe.

## How changes go live

Vercel deploys every push to `main` to corobenavent.com. It takes about one minute.

Workflow for every change:

1. `git pull` first. Joe may have pushed changes.
2. Make the edit.
3. Run `pnpm build`. If it fails, fix it. Never push a failing build.
4. For visual changes, run `pnpm dev` and check the page at http://localhost:5173. Take a screenshot if you can.
5. Commit with a short, plain message, for example "Add Tonos BTS photos".
6. `git push` to `main`.
7. Tell Coro the page URL, for example https://corobenavent.com/director/tonos.

Rules:

- Never force-push. Never rewrite history.
- Never delete photos from `public/` unless Coro asks. Old pages or backups may use them.
- If `git pull` shows a conflict, stop and tell Coro to ask Joe.
- Use `pnpm`, not `npm`. The repo has a `pnpm-lock.yaml`. Do not create a `package-lock.json`.
- First time on a new machine: run `pnpm install`. If `pnpm` is missing, run `npm install -g pnpm`.

## Site map

| Page | URL | File |
| --- | --- | --- |
| Landing (4 photo tiles) | `/` | `src/components/Homepage.tsx` |
| Actress | `/actress` | `src/components/ActressPage.tsx` |
| Director | `/director` | `src/components/DirectorPage.tsx` |
| Musician | `/musician` | `src/components/MusicianPage.tsx` |
| Me | `/me` | `src/components/MePage.tsx` |
| One project | `/director/look-around` etc. | `src/components/projects/*.tsx` |

All routes live in `src/App.tsx`. The footer is `src/components/Footer.tsx`.

## Common tasks

**Edit text or CV entries.** The Actress page holds the CV text (training, film, theatre, skills) as plain lists in `ActressPage.tsx`. The CV PDF is `public/cv.pdf`. Replace that file to update the download.

**Edit credits or a project description.** Open the project file in `src/components/projects/`. Credits are a list of `{ name, role }`. Set `isHighlighted: true` on Coro's own credit.

**Add photos.** Put image files in the folder that matches the section:

- `public/actress/` – acting photos and actress project thumbnails
- `public/director/` – director project thumbnails and stills
- `public/music/` – music thumbnails
- `public/me/` – Me page photos
- `public/landing/` – landing page tiles

Use lowercase file names with dashes, for example `tonos-still-1.jpg`. Keep the original quality. Do not shrink photos unless a file is over 10 MB. The site resizes images itself through `OptimizedImage` and Vercel.

**Actress gallery.** The gallery shows `public/actress/img1.jpeg` to `img34.jpeg`. To add a photo, save it as the next number and raise `length: 34` in `ActressPage.tsx`. To hide one, add its number to `excludedImages`.

**Project stills.** Add a `stills` list to the project file. `LookAround.tsx` is the example.

**Add a new project.**

1. Copy a similar file in `src/components/projects/` (for example `Tonos.tsx`) and rename it.
2. Fill in title, description, credits, main image and YouTube embed URL (`https://www.youtube.com/embed/<id>`).
3. Add a route in `src/App.tsx`.
4. Add a card to the `projects` list on the section page (for example `DirectorPage.tsx`). The list order is the order on the page.
5. Add `status: 'In Post-Production'` or similar if the project is not out yet.

## Writing style for site copy

- Do not use em-dashes (—). Coro removed them on purpose. Use a full stop, comma or colon.
- Keep Coro's wording. Fix only obvious typos unless she asks for a rewrite.
- Spanish titles keep their accents: Palomitas sin Maíz, Sesión de Surf.

## Tech notes

React 19, TypeScript, Vite, Tailwind. Single-page app. `vercel.json` rewrites all paths to `index.html` and turns on image optimisation. `OptimizedImage` serves the raw file in dev and the Vercel-resized file in production.
