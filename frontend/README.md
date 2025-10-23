## Ian Ward — Portfolio (Frontend)

Tech: Next.js 16 (App Router) + TypeScript + Tailwind CSS.

### Local development

1. Start the Django backend first on `http://127.0.0.1:8000`.
2. Start the frontend dev server:

```bash
npm run dev
```

This sets `NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api` and runs at `http://localhost:3000`.

### Production build

```bash
npm run build && npm start
```

Set `NEXT_PUBLIC_API_BASE` to your deployed backend API URL when building.

### Environment

- `NEXT_PUBLIC_API_BASE` — Base URL for the Django API (e.g. `http://127.0.0.1:8000/api`)

### Content

The homepage fetches:
- Profile (primary)
- Ventures
- Testimonials

The contact form posts to `/api/contact/` and shows a success/error state.
