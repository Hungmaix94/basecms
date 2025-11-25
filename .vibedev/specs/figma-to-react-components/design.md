# Figma to React Components Design Document

## 1. Overview

This document details the technical design for implementing dynamic, pixel-perfect, and animated React components based on the provided Figma design for the "Business Executive Network" landing page. The design aims to translate the visual specifications into modular, reusable, and responsive React components, incorporating smooth animations and efficient data handling.

## 2. Architecture

The new components will be developed within the existing `apps/next` Next.js application, leveraging its App Router, TypeScript, and TailwindCSS setup.

*   **Component Structure**: Components will be organized logically, with smaller, reusable components composing larger sections.
*   **Styling**: TailwindCSS will be the primary styling framework, ensuring responsiveness and consistency with the Figma design. Custom CSS might be used for fine-tuning "pixel-perfect" details if necessary.
*   **Animations**: For sophisticated animations, GSAP (GreenSock Animation Platform) will be integrated. For carousel transitions, Embla Carousel (already used in the project) will be utilized.
*   **Data Flow**: Components will receive data via props. Initial development will use dummy data, with future integration planned for a headless CMS (e.g., Strapi, as per previous project context).
*   **Responsiveness**: TailwindCSS's responsive utilities will be extensively used to ensure components adapt across desktop, tablet, and mobile breakpoints.

## 3. Components and Interfaces

Each major section from the Figma design will correspond to a primary React component, which may compose several smaller, more granular components.

### 3.1. General Components

*   **`FigmaButton`**: A reusable button component that can be configured for primary/secondary styles, sizes, and with/without icons, matching the Figma button variants (e.g., `Size=Large, Property=Primary, State=Default`). This will likely extend or wrap the existing ShadCN `Button` component to inject Figma-specific styles and variants.

### 3.2. Section-Specific Components

*   **`HeroSection`**:
    *   **Description**: Displays the main hero content with a title, subtitle, CTA button, and a dynamic background image with overlay.
    *   **Props**: `title: string`, `subtitle: string`, `ctaText: string`, `ctaLink: string`, `backgroundImage: string`.
    *   **Animations**: Subtle entrance animations for text and button using GSAP. Parallax effect for the background image on scroll.

*   **`UpcomingEventsSection`**:
    *   **Description**: Displays a list/grid of upcoming events with individual event cards and a "See All Events" button.
    *   **Props**: `events: EventCardProps[]`, `seeAllEventsLink: string`.
    *   **Sub-components**:
        *   **`EventCard`**: Displays event date, title, time, location, and a "register" button.
            *   **Props**: `date: { day: string; month: string }`, `title: string`, `timeLocation: string`, `registerLink: string`.
    *   **Animations**: Fade-in or slide-up animations for event cards as they enter the viewport.

*   **`SocialSection`**:
    *   **Description**: Displays social media links and a "Connect With Us" section with contact options.
    *   **Props**: `socialLinks: SocialLinkProps[]`, `contactInfo: ContactInfoProps`.
    *   **Sub-components**:
        *   **`SocialLink`**: Icon and text for a social media platform.
            *   **Props**: `icon: React.ReactNode`, `label: string`, `href: string`.
        *   **`ContactMethod`**: Icon and text for direct contact (Zalo, WhatsApp, Email).
            *   **Props**: `icon: React.ReactNode`, `label: string`, `href: string`.
    *   **Animations**: Hover effects on social icons.

*   **`LearnMoreVideosSection`**:
    *   **Description**: Displays video thumbnails/cards related to the network, with a "See All Videos" button.
    *   **Props**: `videos: VideoCardProps[]`, `seeAllVideosLink: string`.
    *   **Sub-components**:
        *   **`VideoCard`**: Displays video thumbnail, title, and a play button overlay.
            *   **Props**: `thumbnail: string`, `title: string`, `videoLink: string`.
    *   **Animations**: Play button hover animation.

*   **`AdvisoryBoardSection`**:
    *   **Description**: Carousel displaying advisory board members.
    *   **Props**: `members: AdvisoryMemberCardProps[]`.
    *   **Sub-components**:
        *   **`AdvisoryMemberCard`**: Displays member image, name, and title/position.
            *   **Props**: `image: string`, `name: string`, `title: string`.
    *   **Animations**: Smooth carousel transitions using Embla Carousel. Card flip or subtle zoom on hover.

*   **`TestimonialsSection`**:
    *   **Description**: Carousel displaying member testimonials.
    *   **Props**: `testimonials: TestimonialCardProps[]`, `seeAllTestimonialsLink: string`.
    *   **Sub-components**:
        *   **`TestimonialCard`**: Displays a quote, member name, and title/position.
            *   **Props**: `quote: string`, `name: string`, `title: string`.
    *   **Animations**: Smooth carousel transitions. Quote text animation on slide change.

*   **`MemberBenefitsSection`**:
    *   **Description**: Grid or list of benefits for members.
    *   **Props**: `benefits: BenefitCardProps[]`, `seeAllBenefitsLink: string`.
    *   **Sub-components**:
        *   **`BenefitCard`**: Displays an icon and a descriptive title.
            *   **Props**: `icon: React.ReactNode`, `title: string`.
    *   **Animations**: Icon hover effects, card entrance animations.

*   **`IndustryBreakdownSection`**:
    *   **Description**: Visual representation of member industries with percentages.
    *   **Props**: `industries: IndustryData[]`, `moreAboutUsLink: string`.
    *   **Animations**: Dynamic chart rendering animation (e.g., pie chart slices animating in).

*   **`CallToActionSection`**:
    *   **Description**: A prominent call-to-action area at the bottom of the page.
    *   **Props**: `title: string`, `subtitle: string`, `exploreCvietnamLink: string`, `subscribeNowLink: string`, `backgroundImage: string`.
    *   **Animations**: Background parallax, button hover animations.

## 4. Data Models

The data for these components will initially be hardcoded (dummy data) for rapid development and testing. Eventually, this data will be fetched from a headless CMS, such as Strapi, aligning with the project's existing backend setup. The interfaces for component props will reflect the expected data structure, facilitating a smooth transition to dynamic data fetching.

## 5. Error Handling

*   **Loading States**: For components that fetch data (e.g., carousels, grids), loading skeletons or spinners will be displayed while data is being retrieved.
*   **Error States**: In case of data fetching failures, a fallback UI will be rendered, displaying a user-friendly error message or a default empty state.
*   **Image Fallbacks**: `next/image` component will be configured with error handling for broken image URLs.

## 6. Testing Strategy

*   **Unit Tests**:
    *   **Framework**: Jest and React Testing Library.
    *   **Scope**: Individual components (`FigmaButton`, `HeroSection`, `EventCard`, `SocialLink`, `VideoCard`, `AdvisoryMemberCard`, `TestimonialCard`, `BenefitCard`, `IndustryBreakdownChart`).
    *   **Focus**: Prop rendering, conditional rendering, basic user interactions, and utility logic.
*   **Integration Tests**:
    *   **Framework**: Jest and React Testing Library.
    *   **Scope**: Combinations of components forming a section (e.g., `UpcomingEventsSection` with `EventCard`s).
    *   **Focus**: Interaction between components, correct data flow and rendering based on mocked data.
*   **End-to-End (E2E) Tests**:
    *   **Framework**: Playwright.
    *   **Scope**: Full page rendering, responsiveness, navigation, content presence, and animations.
    *   **Focus**: Verifying the application behaves as expected in a browser environment. This will involve checking visual elements and interactions, possibly using visual regression testing for pixel-perfect validation.

## Research & Decisions:

### GSAP Integration with React
*   GSAP is highly performant and flexible for complex animations. It can be integrated using `useEffect` hooks to control animations on component mount/unmount or state changes. React refs will be used to target DOM elements for animation.
*   **Reference**: [GSAP with React](https://greensock.com/react/)

### Figma to TailwindCSS Conversion
*   **Colors**: Define a custom color palette in `tailwind.config.js` to match Figma's color styles (e.g., Primary/Charade: #242833, Primary/Teak 300: #B59863, Neutral/500: #344054).
*   **Typography**: Map Figma text styles (H1, H2 upper, Body, Caption 2) to TailwindCSS font sizes, weights, and line heights. Custom font families (e.g., MTT Milano) will be configured in `tailwind.config.js` and loaded.
*   **Spacing**: Translate Figma auto-layout and spacing values directly into TailwindCSS padding, margin, and gap utilities.
*   **Border Radius**: Use TailwindCSS `rounded-*` classes for consistent border radii.

### Responsive Design Patterns
*   TailwindCSS's mobile-first approach will be followed, defining styles for smaller screens first and then applying larger screen styles using prefixes (`md:`, `lg:`).
*   Flexible layouts (flexbox and grid) will be used to ensure content reflows naturally.
*   `next/image` component will be used for optimized image delivery and responsive scaling.

### Carousel Implementation
*   Embla Carousel (already integrated in the project) will be used for carousels in `UpcomingEventsSection`, `AdvisoryBoardSection`, `TestimonialsSection`, and `PartnersCarousel`. It provides a lean, performant, and customizable base. Animations specific to slide content can be layered with GSAP.
