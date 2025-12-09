# Tổng quan Dự án

## Giới thiệu

BaseCMS là một hệ thống quản lý nội dung (CMS) hiện đại được xây dựng với:

- **Strapi v5** - Headless CMS mã nguồn mở
- **Next.js 16** - React framework với App Router
- **PostgreSQL** - Cơ sở dữ liệu quan hệ
- **MinIO** - Object storage tương thích S3
- **Page Builder Plugin** - Trình chỉnh sửa trang kéo-thả trực quan

## Kiến trúc Hệ thống

```
┌─────────────────────────────────────────────────────────────┐
│                        BaseCMS Project                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   Strapi     │◄───────►│  PostgreSQL  │                  │
│  │   Backend    │         │   Database   │                  │
│  │  (Port 1337) │         │  (Port 5432) │                  │
│  └──────┬───────┘         └──────────────┘                  │
│         │                                                     │
│         │ REST API                                           │
│         │                                                     │
│  ┌──────▼───────┐         ┌──────────────┐                  │
│  │   Next.js    │◄───────►│    MinIO     │                  │
│  │  Landing Page│         │   Storage    │                  │
│  │  (Port 3000) │         │  (Port 9000) │                  │
│  └──────────────┘         └──────────────┘                  │
│                                                               │
│  ┌──────────────────────────────────────┐                   │
│  │      Page Builder Plugin             │                   │
│  │  - Strapi Plugin (Admin UI)          │                   │
│  │  - React Component (Editor)          │                   │
│  └──────────────────────────────────────┘                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Các Thành phần Chính

### 1. Strapi CMS (`/strapi`)

Backend headless CMS quản lý:
- Content types (Landing Page, Blog Post, Category)
- Media library
- User authentication & permissions
- API endpoints
- Page Builder plugin

### 2. Landing Page (`/landingpage`)

Frontend Next.js application:
- Server-side rendering (SSR)
- Static site generation (SSG)
- Page Builder renderer
- Component library
- Tailwind CSS styling

### 3. Page Builder Plugin (`/packages/strapi-page-builder`)

Strapi plugin cung cấp:
- Visual editor interface trong Strapi Admin
- Template management
- Content localization
- Integration với Strapi content types

### 4. Page Builder React (`/packages/strapi-page-builder-react`)

React component library:
- Drag-and-drop editor
- Component configuration
- Real-time preview
- Message passing với parent window

## Tính năng Chính

### ✨ Page Builder
- **Visual Editor**: Kéo-thả components để xây dựng trang
- **Template System**: Tạo và quản lý templates có thể tái sử dụng
- **Live Preview**: Xem trước thay đổi real-time
- **Component Library**: Thư viện components có sẵn (Hero, Banner, FAQ, etc.)

### 🌐 Multi-language Support
- Hỗ trợ đa ngôn ngữ với Strapi i18n
- Locale-specific content
- Default locale fallback

### 📦 Content Management
- Blog posts với categories
- Landing pages với page builder
- Media management với MinIO
- Rich text editor

### 🎨 Styling System
- Tailwind CSS
- Dynamic styling với style-config
- Responsive design
- Dark mode support

## Tech Stack Chi tiết

### Backend
- **Strapi**: v5.31.2
- **Node.js**: v22.19.0
- **PostgreSQL**: Latest
- **TypeScript**: v5.7.3

### Frontend
- **Next.js**: v16.0.4
- **React**: v19.2.0
- **Tailwind CSS**: v4
- **TypeScript**: v5

### DevOps
- **Docker**: Container orchestration
- **Docker Compose**: Multi-container setup
- **MinIO**: S3-compatible storage
- **pnpm/yarn**: Package management

## Workflow Phát triển

1. **Content Creation**: Tạo content trong Strapi Admin
2. **Page Building**: Sử dụng Page Builder để thiết kế layout
3. **Preview**: Xem trước trong editor
4. **Publish**: Publish content
5. **Frontend Render**: Next.js fetch và render content

## Yêu cầu Hệ thống

- Node.js >= 18.0.0
- Docker & Docker Compose
- PostgreSQL 14+
- 4GB RAM minimum
- 10GB disk space

## Môi trường

Dự án hỗ trợ các môi trường:
- **Development**: Local development với hot-reload
- **Staging**: Testing environment
- **Production**: Production deployment

## Bảo mật

- JWT authentication
- Role-based access control (RBAC)
- API token authentication
- CORS configuration
- Environment variables cho sensitive data
