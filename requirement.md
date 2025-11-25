Project: Next.js landing + blog + auth + CMS
Base: https://github.com/naufaldi/next-landing-vpn#

Requirements:
- Frontend: Next.js (App Router), TypeScript, TailwindCSS, ShadCN UI, react-hook-form, react-query, dayjs.
- Rendering: SSG + ISR. Pre-generate main pages; blog posts and blog list use ISR with revalidate and on-demand revalidate.
- Backend: Strapi v4 (headless) using PostgreSQL.
- Auth: JWT via Strapi for register/login; Next.js client stores access token in httpOnly cookie; protect user pages.
- Storage: Postgres for Strapi content, Adminer for DB admin.
- Dev container: docker-compose for Next.js, Strapi, Postgres, Adminer. Use volumes for DB and Strapi uploads.
- Package manager: yarn (or pnpm optional).
- Focus: performance, SEO, accessible components, minimal runtime for ISR (explain hosting choices).

Pages & features to implement:
- Landing (homepage): hero, CTA, features, Pricing summary, Testimonials, footer with contact form.
- Blog index (SSG/ISR): list posts, pagination, search (client-side).
- Blog post detail (ISR): pre-generate popular posts with generateStaticParams; `export const revalidate = 60` (configurable).
- Contact form: posts to Strapi `contacts` content-type; server action or API route to submit, store in Strapi, send optional email (SMTP env).
- Auth: register/login pages using Strapi endpoints; secure area (e.g., /dashboard) that fetches user-specific data.
- FAQ, UserGuide, Pricing, About Us, Testimonials/Reviews pages (SSG).
- Admin actions: after CMS update, call Next.js on-demand revalidate (use `revalidatePath` or `revalidateTag` via Next.js server actions or Strapi webhook).
- Components: shadcn-styled Button, Input, Textarea, Card, Modal, Nav, Footer, BlogCard, Markdown renderer (use `react-markdown` + rehype plugins).
- Forms: use react-hook-form + zod/yup for validation.
- Data fetching: use Next.js server components for SSG/ISR pages; use react-query for client data (comments, user dashboard).
- SEO: dynamic metadata per page, OpenGraph tags, structured data for blog posts.

Strapi content types (fields):
1. `post`
- title (string)
- slug (uid)
- excerpt (text)
- content (rich-text / markdown)
- cover_image (media)
- publishedAt (datetime)
- tags (relation many)
- author (relation)
- featured (boolean)
2. `author`
- name, bio, avatar
3. `page` (for static pages like About, Pricing, UserGuide)
- title, slug(uid), content(rich-text), meta (JSON)
4. `testimonial`
- name, role, company, quote, avatar, rating
5. `faq`
- question, answer, order
6. `contact`
- name, email, message, status
7. `user` (Strapi default) used for auth
8. `pricing_plan`
- name, price, features (JSON/array)

Strapi API endpoints (examples):
- `GET /posts` (with query params `_limit`, `_start`, `_sort`)
- `GET /posts?filters[slug][$eq]=:slug`
- `POST /contacts` (public or protected)
- `POST /auth/local/register`
- `POST /auth/local` (login)
- Strapi webhook: on content change POST to Next.js revalidate endpoint.

Docker compose (services summary):
- `postgres` (image: postgres:15) with volume `postgres_data`
- `strapi` (image: strapi/strapi or local build)
    - env: DATABASE_CLIENT=postgres, DB_HOST=postgres, DB_PORT=5432, DB_NAME, DB_USERNAME, DB_PASSWORD, JWT_SECRET, ADMIN_JWT_SECRET, APP_KEYS
    - volumes: ./strapi:/srv/app
- `next` (node:18) – dev and production Dockerfiles
    - build args, ports 3000, env: NEXT_PUBLIC_API_URL=http://strapi:1337, NEXTAUTH_URL
    - mount for dev, or static build output for production
- `adminer` (phpmyadmin-like): for DB access (optional)
- network: web

Example docker-compose.yml (short):
- Provide services with restart, depends_on, volumes, env_file. (Implement in repo.)

Next.js specifics:
- App Router pages: use `generateStaticParams` for posts to prerender top n posts; `export const revalidate = 60` in `app/blog/[slug]/page.tsx`.
- Use `fetch(url, { next: { revalidate: 60 } })` in server components when calling Strapi.
- On-demand revalidation: create server action or API route `/api/revalidate` that validates secret and calls `res.revalidate()` or uses `revalidatePath` / `revalidateTag` depending on App Router setup. Configure Strapi webhook to call it on content changes.
- Authentication: handle JWT via Strapi responses, store token in httpOnly cookie, refresh on login; implement server-side check in protected server components via cookie.
- Image: use Next Image with remotePatterns allowing Strapi media host.
- Performance: compose small bundles, use ShadCN components + cva, avoid heavy client JS; use islands for interactive parts only.

Scripts & env:
- `.env.local` vars for Next and Strapi, DB creds, JWT secrets, SMTP.
- package.json scripts: dev, build, start, strapi:develop, strapi:build.

Deployment notes:
- For ISR you need hosting with server/edge runtime (Vercel, Netlify Edge, Render with functions, Cloudflare Pages + Workers not recommended for ISR unless using edge adapters). If purely static, you can export static; but ISR requires runtime for regeneration.
- Use Vercel for easiest ISR + On-demand revalidate.

Deliverables:
- Repo scaffolded from base, with:
    - `apps/next` (Next.js app)
    - `apps/strapi` (Strapi project)
    - `docker-compose.yml`
    - README with run commands, deploy notes, env example, webhook setup
    - Minimal production Dockerfiles for Next and Strapi

Non-functional requirements:
- TypeScript strict mode
- ESLint + Prettier
- Accessibility (aria where appropriate)
- Unit tests skeleton (Jest) and Storybook for common UI components (optional)

Please generate file tree, key files (Next app router pages for home, blog index, blog [slug], contact API), Strapi model schemas (JSON), and a runnable `docker-compose.yml` exactly matching above. Use yarn. Keep code minimal but production-ready and document how to run locally and how to set Strapi webhook to call Next.js revalidate endpoint.
