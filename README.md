# BaseCMS - Next.js + Strapi Headless CMS

A modern, full-stack web application built with Next.js 14 (App Router), Strapi v5, and Shadcn UI components.

## 🚀 Features

- **Next.js 14** with App Router and ISR (Incremental Static Regeneration)
- **Strapi v5** headless CMS with PostgreSQL
- **Shadcn UI** components from custom registry
- **Axios** for API calls
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **MinIO** for local file storage (S3-compatible)
- **Docker Compose** for easy development setup

## 📦 Project Structure

```
basecms/
├── landingpage/          # Next.js frontend
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities
│   └── components.json   # Shadcn config
├── strapi/               # Strapi backend
│   ├── src/
│   │   ├── api/          # Content types
│   │   ├── components/   # Strapi components
│   │   └── index.ts      # Bootstrap script
│   └── config/           # Strapi configuration
└── docker-compose.yml    # Docker services
```

## 🛠️ Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **HTTP Client**: Axios
- **ISR**: 60-second revalidation

### Backend (Strapi)
- **CMS**: Strapi v5
- **Database**: PostgreSQL
- **Storage**: MinIO (S3-compatible)
- **Language**: TypeScript

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd basecms
   ```

2. **Start Docker services** (PostgreSQL + MinIO)
   ```bash
   docker-compose up -d
   ```

3. **Install dependencies**
   ```bash
   # Strapi
   cd strapi
   npm install

   # Next.js
   cd ../landingpage
   npm install
   ```

4. **Start Strapi** (first time will run bootstrap)
   ```bash
   cd strapi
   npm run develop
   ```
   - Access admin: `http://localhost:1337/admin`
   - Create your admin account
   - Bootstrap script will auto-create:
     - Landing page with 8 blocks
     - 2 categories (Technology, Design)
     - 3 blog posts

5. **Start Next.js**
   ```bash
   cd landingpage
   npm run dev
   ```
   - Access frontend: `http://localhost:3000`

## 📝 Content Types

### Landing Page (Single Type)
Dynamic zone with 8 block types:
- **Hero** - Main hero section
- **Features** - Feature grid
- **Content** - Rich content with images
- **Testimonials** - Customer reviews
- **Pricing** - Pricing plans
- **Banner** - Call-to-action banner
- **Contact** - Contact form & info
- **CTA** - Final call-to-action

### Blog Post (Collection Type)
- Title, slug, content
- Cover image
- Category relation
- Authors relation
- SEO metadata

### Category (Collection Type)
- Name, slug
- Relations to blog posts and articles

## 🎨 Shadcn Components

Using custom registry: `https://registry-template-alpha.vercel.app/r/registry.json`

Installed components:
- `hero-section` - Hero with multiple variants
- `blog` - Blog grid/list/carousel layouts
- `banner` - Versatile banner component
- `contact` - Contact section with form
- `content` - Content section with rich text
- `card`, `button`, `input`, `label`, `textarea` - Base UI components

## 🔧 Configuration

### Environment Variables

**Strapi** (`.env`):
```env
DATABASE_URL=postgresql://strapi:strapi@localhost:5432/strapi
S3_ACCESS_KEY_ID=minioadmin
S3_ACCESS_SECRET=minioadmin
S3_BUCKET=strapi-uploads
S3_ENDPOINT=http://minio:9000
```

**Next.js** (`landingpage/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

## 📚 API Endpoints

- **Landing Page**: `GET /api/landing-page`
- **Blog Posts**: `GET /api/blog-posts`
- **Single Post**: `GET /api/blog-posts?filters[slug][$eq]=post-slug`
- **Categories**: `GET /api/categories`

## 🚀 Deployment

See `DEPLOYMENT.md` for deployment guides to:
- Vercel (Next.js)
- Heroku (Strapi)
- Railway (Full stack)

## 📖 Documentation

- [Block Components Reference](./docs/blocks-reference.md)
- [Landing Page Structure](./docs/landing-page-structure.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Strapi](https://strapi.io/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
