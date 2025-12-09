# Cấu trúc Dự án

## Tổng quan Thư mục

```
basecms/
├── docs/                          # Tài liệu dự án
├── landingpage/                   # Next.js frontend application
├── packages/                      # Shared packages
│   ├── strapi-page-builder/      # Strapi plugin
│   └── strapi-page-builder-react/# React editor component
├── strapi/                        # Strapi CMS backend
├── docker-compose.yml             # Docker services configuration
├── .env                          # Root environment variables
└── README.md                     # Project readme
```

## Chi tiết Cấu trúc

### `/strapi` - Strapi Backend

```
strapi/
├── config/                        # Strapi configuration
│   ├── admin.ts                  # Admin panel config
│   ├── api.ts                    # API config
│   ├── database.ts               # Database config
│   ├── middlewares.ts            # Middleware config
│   ├── plugins.ts                # Plugin config
│   └── server.ts                 # Server config
├── src/
│   ├── admin/                    # Admin customization
│   ├── api/                      # API endpoints
│   │   ├── blog-post/           # Blog post content type
│   │   ├── category/            # Category content type
│   │   └── landing-page/        # Landing page content type
│   ├── components/               # Strapi components
│   │   ├── blocks/              # Page builder blocks
│   │   │   ├── banner.json
│   │   │   ├── content.json
│   │   │   ├── faq.json
│   │   │   ├── features.json
│   │   │   ├── header.json
│   │   │   ├── hero.json
│   │   │   └── testimonial.json
│   │   └── elements/            # Reusable elements
│   │       ├── logo.json
│   │       └── style-config.json
│   ├── extensions/              # Plugin extensions
│   └── index.ts                 # Entry point
├── public/                       # Public assets
├── types/                        # TypeScript types
│   └── generated/               # Auto-generated types
├── .env                         # Environment variables
├── package.json
└── tsconfig.json
```

#### Content Types

**Landing Page** (`/api/landing-page`)
- Quản lý landing pages
- Tích hợp với Page Builder
- Support i18n

**Blog Post** (`/api/blog-post`)
- Blog articles
- Categories
- Rich text content
- Featured images

**Category** (`/api/category`)
- Blog categories
- Hierarchical structure

#### Components

**Blocks** (`/components/blocks`)
- Banner: Hero banners với CTA
- Content: Rich text content blocks
- FAQ: Accordion FAQ sections
- Features: Feature showcases
- Header: Page headers
- Hero: Hero sections
- Testimonial: Customer testimonials

**Elements** (`/components/elements`)
- Logo: Logo component
- Style Config: Dynamic styling configuration

### `/landingpage` - Next.js Frontend

```
landingpage/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (routes)/            # Route groups
│   │   ├── debug/               # Debug pages
│   │   ├── editor/              # Page builder editor
│   │   │   └── page.tsx        # Editor page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   │   ├── ui/                  # UI components
│   │   │   ├── button.tsx
│   │   │   ├── image.tsx
│   │   │   ├── logo.tsx
│   │   │   └── strapi-image.tsx
│   │   ├── banner.tsx           # Banner component
│   │   ├── blog.tsx             # Blog component
│   │   ├── BlockRenderer.tsx    # Strapi block renderer
│   │   ├── container.tsx        # Container component
│   │   ├── content.tsx          # Content component
│   │   ├── faq.tsx              # FAQ component
│   │   ├── header.tsx           # Header component
│   │   ├── hero-section.tsx     # Hero section
│   │   ├── PageBuilderRenderer.tsx # Page builder renderer
│   │   └── text.tsx             # Text component
│   └── lib/                     # Utilities
│       ├── page-builder-config.tsx # Page builder config
│       ├── strapi.ts            # Strapi client
│       └── styles.ts            # Style utilities
├── public/                       # Static assets
├── .env.local                   # Environment variables
├── next.config.ts               # Next.js config
├── package.json
├── tailwind.config.js           # Tailwind config
└── tsconfig.json
```

#### Key Files

**`src/app/editor/page.tsx`**
- Page Builder editor interface
- Loads Editor component from `@wecre8websites/strapi-page-builder-react`
- Communicates với Strapi plugin

**`src/lib/page-builder-config.tsx`**
- Cấu hình components cho Page Builder
- Định nghĩa props và fields
- Component mapping

**`src/lib/strapi.ts`**
- Strapi API client
- Fetch functions
- Type definitions

**`src/components/PageBuilderRenderer.tsx`**
- Render Page Builder content
- Component resolution
- Style application

### `/packages/strapi-page-builder` - Strapi Plugin

```
packages/strapi-page-builder/
├── admin/                        # Admin UI
│   └── src/
│       ├── components/          # React components
│       ├── hooks/               # Custom hooks
│       ├── icons/               # Icon components
│       ├── pages/               # Plugin pages
│       │   ├── App.tsx         # Plugin app
│       │   └── HomePage.tsx    # Main editor page
│       ├── translations/        # i18n translations
│       └── index.ts            # Admin entry point
├── server/                      # Server-side logic
│   └── src/
│       ├── controllers/        # API controllers
│       ├── routes/             # API routes
│       ├── services/           # Business logic
│       └── index.ts            # Server entry point
├── shared/                      # Shared types
│   └── types/
├── dist/                        # Build output
└── package.json
```

#### Key Components

**`admin/src/pages/HomePage.tsx`**
- Main editor interface
- Iframe management
- Message passing với editor
- Template management
- State management

**`server/src/controllers/`**
- Editor controller: Xử lý editor requests
- Template controller: Quản lý templates
- Content controller: Fetch content data

**`server/src/services/`**
- Editor service: Business logic cho editor
- Template service: Template CRUD operations

### `/packages/strapi-page-builder-react` - React Editor

```
packages/strapi-page-builder-react/
├── src/
│   ├── components/              # Editor components
│   │   └── BlocksEditor.tsx
│   ├── utils/                   # Utilities
│   ├── index.tsx                # Main Editor component
│   └── rsc.tsx                  # React Server Component
├── dist/                        # Build output
│   ├── index.js                # CJS bundle
│   ├── index.mjs               # ESM bundle
│   ├── index.css               # Styles
│   └── *.d.ts                  # Type definitions
├── node_modules/
│   └── @measured/puck/         # Puck editor dependency
├── package.json
├── tsconfig.json
└── tsup.config.ts              # Build config
```

#### Key Files

**`src/index.tsx`**
- Editor component
- Message handling
- State management
- Puck integration

**`src/components/BlocksEditor.tsx`**
- Block editor interface
- Component rendering
- Drag-and-drop logic

**`src/utils/`**
- processConfig: Process component config
- processProps: Process component props

## File Naming Conventions

### Components
- PascalCase: `HeroSection.tsx`, `BlogPost.tsx`
- Lowercase với dashes cho files: `hero-section.tsx`

### Utilities
- camelCase: `strapi.ts`, `styles.ts`

### Config Files
- kebab-case: `page-builder-config.tsx`
- Dot notation: `.env.local`, `next.config.ts`

## Import Paths

### Absolute Imports (Next.js)
```typescript
import { Button } from '@/components/ui/button'
import { strapi } from '@/lib/strapi'
```

### Relative Imports
```typescript
import { Editor } from './components/Editor'
import type { Config } from '../types'
```

### Package Imports
```typescript
import { Editor } from '@wecre8websites/strapi-page-builder-react'
import '@wecre8websites/strapi-page-builder-react/editor.css'
```

## Build Outputs

### Strapi
- `dist/`: Compiled JavaScript
- `build/`: Admin panel build
- `.cache/`: Strapi cache

### Landing Page
- `.next/`: Next.js build output
- `out/`: Static export (nếu có)

### Packages
- `dist/`: Compiled bundles
- `*.d.ts`: TypeScript declarations

## Environment Files

```
.env                    # Root environment
strapi/.env            # Strapi environment
landingpage/.env.local # Next.js environment
```

**Lưu ý**: Không commit `.env` files vào git. Sử dụng `.env.example` làm template.

## Git Structure

```
.git/                  # Git repository
.gitignore            # Git ignore rules
.gitmodules           # Git submodules
```

### Submodules
- `packages/strapi-page-builder-react`: Có thể là submodule

## Docker Volumes

```
docker-compose.yml định nghĩa:
- postgres_data: PostgreSQL data
- minio_data: MinIO storage
```

## Bước tiếp theo

- [Strapi CMS](./04-strapi-cms.md)
- [Page Builder](./05-page-builder.md)
- [Landing Page](./06-landing-page.md)
