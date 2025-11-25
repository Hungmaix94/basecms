# Landing Page Clone Requirements

## 1. Introduction

This document outlines the requirements for creating a visually faithful landing page clone of http://polyvac.com.vn/. The project will be built using Next.js (App Router), TypeScript, and TailwindCSS, with content managed by a Strapi CMS, as specified in the project's `requirement.md`. The landing page must be fully responsive and optimized for performance (SSG).

## 2. Functional Requirements

### 2.1. Header Component

*   **User Story:** As a site visitor, I want a clear and consistent header so that I can easily navigate the website, identify the brand, and access key functions like search and language selection.

*   **Acceptance Criteria:**
    1.  **While** viewing any part of the page, **the system shall** display a fixed header at the top of the viewport.
    2.  **When** the header is displayed, **it shall** contain the company logo on the left.
    3.  **When** the header is displayed, **it shall** show the primary navigation links: "Giới thiệu", "Sản phẩm", "Dịch vụ", "Tin tức & Sự kiện", "Liên hệ".
    4.  **When** the header is displayed, **it shall** include a language switcher (VN/EN).
    5.  **When** the user clicks the search icon, **the system shall** reveal a search input field.
    6.  **The system shall** fetch all header content (logo, navigation links) from the Strapi CMS.

### 2.2. Hero Section Carousel

*   **User Story:** As a site visitor, I want to see a compelling hero section with rotating banners so that I can quickly understand the company's key messages and offerings.

*   **Acceptance Criteria:**
    1.  **When** the landing page loads, **the system shall** display a full-width hero section below the header.
    2.  **The system shall** render a carousel/slider that automatically cycles through a series of slides.
    3.  **For each** slide, **the system shall** display a background image, a title, a subtitle, and a "Tìm hiểu thêm" (Learn More) button.
    4.  **When** a user clicks the "Learn More" button, **the system shall** navigate them to the corresponding URL.
    5.  **The system shall** provide carousel navigation controls (e.g., arrows, dots) for manual slide transition.
    6.  **The system shall** fetch all slide content (images, texts, button links) from the Strapi CMS.

### 2.3. About Us Section

*   **User Story:** As a site visitor, I want to see a brief introduction to the company on the homepage so that I can quickly understand its purpose and values.

*   **Acceptance Criteria:**
    1.  **While** scrolling the landing page, **the system shall** display an "About Us" section.
    2.  **The** "About Us" section **shall** contain a title, an image, a block of introductory text, and a "Xem thêm" (Read More) button.
    3.  **When** a user clicks the "Read More" button, **the system shall** navigate them to the main "About Us" page.
    4.  **The system shall** fetch all section content (image, texts, button link) from the Strapi CMS.

### 2.4. Products Section

*   **User Story:** As a site visitor, I want to see a preview of the company's products on the homepage so that I can get an overview of what they offer.

*   **Acceptance Criteria:**
    1.  **While** scrolling the landing page, **the system shall** display a "Products" section.
    2.  **The** "Products" section **shall** display a collection of products in a horizontally scrollable carousel.
    3.  **For each** product, **the system shall** display an image and its name.
    4.  **The system shall** fetch all product data (image, name, link) from the Strapi CMS.

### 2.5. Services Section

*   **User Story:** As a site visitor, I want to learn about the services the company provides so that I can understand how they can help me.

*   **Acceptance Criteria:**
    1.  **While** scrolling the landing page, **the system shall** display a "Services" section.
    2.  **The** "Services" section **shall** display a grid of services.
    3.  **For each** service, **the system shall** display an icon, a title, and a short description.
    4.  **The system shall** fetch all service data (icon, title, description) from the Strapi CMS.

### 2.6. News & Events Section

*   **User Story:** As a site visitor, I want to see the latest news and events on the homepage so that I can stay informed about the company's activities.

*   **Acceptance Criteria:**
    1.  **While** scrolling the landing page, **the system shall** display a "News & Events" section.
    2.  **The** "News & Events" section **shall** display a grid of the most recent articles.
    3.  **For each** article, **the system shall** display a featured image, title, and a brief excerpt.
    4.  **When** a user clicks on an article, **the system shall** navigate them to the full blog post page.
    5.  **The system shall** include a "Xem tất cả" (View All) button that links to the main blog page.
    6.  **The system shall** fetch all article data from the Strapi CMS.

### 2.7. Partners Section

*   **User Story:** As a potential customer or partner, I want to see the company's existing partners so that I can gauge their credibility and network.

*   **Acceptance Criteria:**
    1.  **While** scrolling the landing page, **the system shall** display a "Partners" section.
    2.  **The** "Partners" section **shall** display a carousel of partner logos.
    3.  **The system shall** fetch all partner logos and their corresponding links from the Strapi CMS.

### 2.8. Footer Component

*   **User Story:** As a site visitor, I want a comprehensive footer so that I can find contact information, site links, and other important details.

*   **Acceptance Criteria:**
    1.  **While** at the bottom of any page, **the system shall** display a footer.
    2.  **The** footer **shall** be divided into multiple columns containing:
        *   Company contact information (address, phone, email).
        *   Navigational links ("About Polyvac", "Customer Support").
        *   A social media integration (e.g., Facebook page embed).
    3.  **The** footer **shall** include a bottom bar with the copyright notice.
    4.  **The system shall** fetch all footer content (contact details, links) from the Strapi CMS.

## 3. Non-Functional Requirements

### 3.1. Responsiveness

*   **User Story:** As a user on any device, I want the landing page to be displayed correctly so that I have a good viewing experience.
*   **Acceptance Criteria:**
    1.  **The system shall** be fully responsive and adapt its layout for desktop, tablet, and mobile screen sizes.

### 3.2. Performance

*   **User Story:** As a user, I want the landing page to load quickly so that I don't have to wait.
*   **Acceptance Criteria:**
    1.  **The system shall** use Static Site Generation (SSG) for the landing page to ensure fast initial load times.
    2.  **The system shall** optimize all images to reduce their file size without significant loss of quality.

### 3.3. Content Management

*   **User Story:** As a content editor, I want to manage all landing page content in a CMS so that I can make updates easily without needing a developer.
*   **Acceptance Criteria:**
    1.  **All** text, images, and links on the landing page **shall** be editable in the Strapi CMS.
