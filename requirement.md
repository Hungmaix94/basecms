# System Requirements & Block Component Specifications

This document outlines the requirements and specifications for the CMS block components used in the Landing Page application. These blocks are managed in Strapi and rendered dynamically in the Next.js frontend via `BlockRenderer`.

## 1. Core Architecture
- **CMS**: Strapi (Headless CMS)
- **Frontend**: Next.js (React)
- **Rendering Strategy**: Dynamic Component Mapping via `BlockRenderer.tsx`
- **Styling**: Tailwind CSS + Shadcn UI

## 2. Block Component Specifications

The following blocks are available for page composition.

### 2.1 Hero Section (`blocks.hero`)
**Purpose**: Main introductory section of a page.
**React Component**: `HeroSection`
**Fields**:
- `title` (Text): Main headline. Defaults to "Welcome".
- `description` (Text/Rich Text): Subtitle or introductory text.
- `image` (Media): Hero image.
  - `url`: Image URL.
  - `alternativeText`: Alt text.
- `ctaPrimary` (Component): Primary Call-to-Action button.
- `ctaSecondary` (Component): Secondary Call-to-Action button.
- `variant` (Enumeration): Visual style. Defaults to "default".
- `imagePosition` (Enumeration): "left" or "right". Defaults to "right".

### 2.2 Benefits & Trust / Features (`blocks.benefits-trust`, `blocks.features`, `blocks.featured`)
**Purpose**: Displaying key benefits, features, or trust indicators (logos, icons).
**React Component**: `BenefitsTrust`
**Fields**:
- `sectionTitle` (Text): Section header.
- `sectionDescription` (Text): Description text.
- `items` or `benefits` (Repeater): List of items.
  - `icon` (String): Icon name (mapped to Lucide icons).
  - `title`: Item title.
  - `description`: Item description.
- `variant` (Enumeration): Layout style. Defaults to "icon-list".

### 2.3 Content Section (`blocks.content`)
**Purpose**: General purpose text content block.
**React Component**: `Content`
**Fields**:
- `title` (Text): Section title.
- `content` (Rich Text): Main body content.
- `variant` (Enumeration): Style variant. Defaults to "text-only".

### 2.4 Product List (`blocks.product-list`)
**Purpose**: Display a grid or list of products.
**React Component**: `ProductList`
**Fields**:
- `sectionTitle` (Text): Title for the product section.
- `products` (Relation/Repeater): List of products.
  - `name`: Product name.
  - `price`: Product price (string or number).
  - `category`: Product category.
  - `href`: Link to product page.
- `variant` (Enumeration): Grid style. Defaults to "grid-simple".

### 2.5 Testimonials (`blocks.testimonial`)
**Purpose**: Customer reviews and social proof.
**React Component**: `Testimonial`
**Fields**:
- `sectionTitle` (Text): Section header.
- `testimonials` (Repeater): List of testimonials.
  - `content` (Text): The quote/review text.
  - `authorName` (Text): Name of the reviewer.
  - `authorRole` (Text): Job title or role.
  - `rating` (Number): Star rating (1-5).
- `variant` (Enumeration): Layout style. Defaults to "grid".

### 2.6 Blog / Latest Updates (`blocks.blog`)
**Purpose**: Display latest blog posts or news.
**React Component**: `Blog`
**Fields**:
- `sectionTitle` (Text): Section header. Defaults to "Latest Updates".
- `posts` (Relation/Repeater): List of blog posts.
  - `imageUrl`: Featured image.
  - `href`: Link to post.
- `variant` (Enumeration): Layout style. Defaults to "grid".

### 2.7 Header (`blocks.header`)
**Purpose**: Site navigation and branding.
**React Component**: `Header`
**Fields**:
- `links` (Repeater): Navigation links.
  - `text`: Link label.
  - `href`: Link URL.
- `logo` (Component): Logo configuration.
  - `media`: Image file.
  - `width`: Display width.
  - `height`: Display height.
  - `variant`: Logo shape variant (e.g., "square", "circle").
- `variant`: Header style variant.

### 2.8 Instagram Feed (`blocks.instagram`)
**Purpose**: Display social media feed.
**React Component**: `Instagram`
**Fields**:
- `title` (Text): Section title.
- `variant` (Enumeration): Layout style. Defaults to "grid-simple".

### 2.9 Map (`blocks.map`)
**Purpose**: Display a map (e.g., Google Maps embed).
**React Component**: `MapComponent`
**Fields**:
- Direct prop mapping from Strapi data.

### 2.10 Other Available Blocks
The following blocks are registered but map directly to their respective components without complex transformation wrappers:
- `blocks.banner` -> `Banner`
- `blocks.bundles` -> `Bundles`
- `blocks.categories` -> `Categories`
- `blocks.cart` -> `Cart`
- `blocks.contact` -> `Contact`
- `blocks.faq` -> `Faq`
- `blocks.product-detail` -> `ProductDetail`
- `blocks.side-cart` -> `SideCart`
- `blocks.sticky-top-bar` -> `StickyTopBar`
- `blocks.subscribe-newsletter` -> `SubscribeNewsletter`

## 3. Shared Resources

### 3.1 Icon Mapping
The `BenefitsTrust` component supports the following icon strings (mapped to Lucide React icons):
- `shield`
- `award`
- `lightbulb`
- `trending`
- `zap`
- `bar-chart`
- `cpu`
- `layers`
- `check`

### 3.2 Global UI Components
The system utilizes a shared UI library (likely Shadcn UI) located in `src/components/ui`.
