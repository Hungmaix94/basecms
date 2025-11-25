# Implementation Plan: Polyvac Landing Page Clone

This document outlines the tasks required to implement the Polyvac Landing Page Clone feature, adhering to the specified requirements and design. Each task focuses on code generation, modification, or testing, building incrementally towards the complete feature.

## 1. Project Setup & Configuration

- [x] 1.1. **Initialize Monorepo Structure and Docker Compose**
    - Create the base project directory.
    - Create `apps/next` and `apps/strapi` subdirectories.
    - Develop a `docker-compose.yml` file to orchestrate `postgres`, `strapi`, and `next` services as described in `requirement.md`.
    - Include necessary environment variables and volume configurations for development.
    - *References*: `requirement.md` (Project structure, Docker compose summary).

- [x] 1.2. **Setup Next.js Application**
    - Initialize a new Next.js project within `apps/next` using `yarn create next-app` with TypeScript and App Router.
    - Configure TailwindCSS in the Next.js project.
    - Install ShadCN UI dependencies and initialize it for the project.
    - *References*: `requirement.md` (Frontend: Next.js, TypeScript, TailwindCSS, ShadCN UI), `design.md` (Architecture: `apps/next`).

- [x] 1.3. **Setup Strapi Application**
    - Initialize a new Strapi project within `apps/strapi` using `yarn create strapi-app` with TypeScript and PostgreSQL.
    - Configure `database.js` to connect to the `postgres` service defined in `docker-compose.yml`.
    - *References*: `requirement.md` (Backend: Strapi v4, PostgreSQL), `design.md` (Architecture: `apps/strapi`).

## 2. Strapi Backend Implementation

- [x] 2.1. **Define Strapi Content Types**
    - Create the following content types in Strapi:
        - **Single Types**: `LandingPageSettings`, `AboutUsSection`.
        - **Collection Types**: `HeroSlide`, `Product`, `Service`, `Partner`, `NavItem`.
    - Configure fields for each content type as detailed in `design.md` (Section 4. Data Models).
    - Ensure appropriate relations (e.g., for `NewsArticle` if needed for basic news display on landing).
    - *References*: `requirements.md` (All sections, requirement 2.1.6, 2.2.6, 2.3.4, 2.4.4, 2.5.4, 2.6.6, 2.7.3, 2.8.4, 3.3.1), `design.md` (Section 4. Data Models).

- [ ] 2.2. **Configure Strapi Permissions and Seed Data** (CANCELLED due to environmental constraints)
    - Set public permissions for API endpoints required by the Next.js frontend (e.g., for `HeroSlide`, `Product`, `Service`, `NewsArticle`, `Partner`).
    - Optionally, create minimal seed data for each content type to facilitate frontend development and testing.
    - *References*: `requirements.md` (All sections requiring CMS data), `design.md` (Architecture, Data Models).

## 3. Next.js Frontend Implementation

- [x] 3.1. **Global Styling and Layout**
    - Implement base TailwindCSS styles and configurations.
    - Create `app/globals.css` for global styles.
    - Implement `app/layout.tsx` to define the root layout for the application, including the `<html/>`, `<body/>`, and potentially the `Header` and `Footer` (or place them in `app/page.tsx`).
    - *References*: `requirement.md` (TailwindCSS), `design.md` (Section 3.1 Core Layout Components).

- [x] 3.2. **Data Fetching Utilities**
    - Create a utility file (e.g., `lib/strapi.ts` or `utils/api.ts`) for fetching data from the Strapi API.
    - Implement functions to fetch data for each content type needed by the landing page (e.g., `getHeroSlides`, `getAboutUsContent`, etc.).
    - Ensure caching and revalidation strategies are considered for SSG/ISR, as per `requirement.md` (Next.js specifics: `fetch(url, { next: { revalidate: 60 } })`).
    - *References*: `requirement.md` (Data fetching: Next.js server components), `design.md` (Section 2. Architecture).

- [x] 3.3. **Implement Shared UI Components (ShadCN)**
    - Implement general-purpose UI components using ShadCN UI, such as `Button`, `Input`, `Textarea`, `Card`, `Modal` (if needed for search functionality), `Carousel` (for hero, products, partners).
    - Ensure these components are styled with TailwindCSS.
    - *References*: `requirement.md` (ShadCN UI, TailwindCSS, Components), `design.md` (Section 3.2. Shared Components).

- [x] 3.4. **Implement Header Component**
    - Create `components/Header.tsx`.
    - Implement the logo display, primary navigation links, language switcher, and search icon according to `design.md` (Section 3.2. Header Component).
    - Fetch header content (logo, navigation links) from Strapi via data fetching utilities.
    - Ensure responsiveness.
    - *References*: `requirements.md` (Section 2.1 Header Component), `design.md` (Section 3.2. Header Component).

- [x] 3.5. **Implement Hero Section Carousel**
    - Create `components/HeroCarousel.tsx` and `components/HeroSlide.tsx`.
    - Implement the carousel functionality using a suitable library (e.g., Embla Carousel integrated with ShadCN).
    - Integrate `HeroSlide` to display background image, title, subtitle, and CTA button.
    - Fetch hero slide data from Strapi.
    - *References*: `requirements.md` (Section 2.2 Hero Section Carousel), `design.md` (Section 3.2. HeroCarousel.tsx, HeroSlide.tsx).

- [x] 3.6. **Implement About Us Section**
    - Create `components/AboutUsSection.tsx`.
    - Implement the layout with image, title, content, and "Read More" button.
    - Fetch "About Us" content from Strapi.
    - *References*: `requirements.md` (Section 2.3 About Us Section), `design.md` (Section 3.2. AboutUsSection.tsx).

- [x] 3.7. **Implement Products Section**
    - Create `components/ProductCarousel.tsx` and `components/ProductCard.tsx`.
    - Implement a carousel to display product images and names.
    - Fetch product data from Strapi.
    - *References*: `requirements.md` (Section 2.4 Products Section), `design.md` (Section 3.2. ProductCarousel.tsx, ProductCard.tsx).

- [x] 3.8. **Implement Services Section**
    - Create `components/ServicesGrid.tsx` and `components/ServiceCard.tsx`.
    - Implement a grid layout for services, displaying icon, title, and description.
    - Fetch service data from Strapi.
    - *References*: `requirements.md` (Section 2.5 Services Section), `design.md` (Section 3.2. ServicesGrid.tsx, ServiceCard.tsx).

- [x] 3.9. **Implement News & Events Section**
    - Create `components/NewsGrid.tsx` and `components/NewsCard.tsx`.
    - Implement a grid to display news article images, titles, and excerpts.
    - Include a "View All" button.
    - Fetch recent news articles from Strapi.
    - *References*: `requirements.md` (Section 2.6 News & Events Section), `design.md` (Section 3.2. NewsGrid.tsx, NewsCard.tsx).

- [x] 3.10. **Implement Partners Section**
    - Create `components/PartnersCarousel.tsx` and `components/PartnerLogo.tsx`.
    - Implement a carousel to display partner logos.
    - Fetch partner data from Strapi.
    - *References*: `requirements.md` (Section 2.7 Partners Section), `design.md` (Section 3.2. PartnersCarousel.tsx, PartnerLogo.tsx).

- [x] 3.11. **Implement Footer Component**
    - Create `components/Footer.tsx`.
    - Implement the multi-column layout with contact information, navigational links, social media embed, and copyright notice.
    - Fetch footer content from Strapi.
    - *References*: `requirements.md` (Section 2.8 Footer Component), `design.md` (Section 3.2. Footer.tsx).

- [x] 3.12. **Assemble Landing Page (`app/page.tsx`)**
    - Integrate all implemented sections (`Header`, `HeroCarousel`, `AboutUsSection`, `ProductCarousel`, `ServicesGrid`, `NewsGrid`, `PartnersCarousel`, `Footer`) into `app/page.tsx`.
    - Orchestrate data fetching for all sections within this server component.
    - Ensure correct SSG setup for the page.
    - *References*: `design.md` (Section 3.1 Core Layout Components).

## 4. Testing

- [x] 4.1. **Write Unit Tests for React Components**
    - Develop unit tests for `Header`, `HeroSlide`, `ProductCard`, `ServiceCard`, `NewsCard`, `PartnerLogo`, and `Footer` components using Jest and React Testing Library.
    - Focus on prop rendering, conditional rendering, and basic event handling.
    - *References*: `design.md` (Section 6. Testing Strategy - Unit Tests).

- [x] 4.2. **Write Integration Tests for Data Fetching and Section Rendering**
    - Develop integration tests to verify that components correctly render data fetched from mocked Strapi API responses (e.g., testing `HeroCarousel` with multiple slides, `ServicesGrid` with multiple service cards).
    - *References*: `design.md` (Section 6. Testing Strategy - Integration Tests).

- [x] 4.3. **Implement End-to-End Tests for Landing Page**
    - Develop E2E tests using Playwright to verify the overall layout, responsiveness, and content presence on the assembled landing page.
    - Test navigation links and CTA buttons.
    - *References*: `requirements.md` (Section 3.1 Responsiveness), `design.md` (Section 6. Testing Strategy - End-to-End Tests).
