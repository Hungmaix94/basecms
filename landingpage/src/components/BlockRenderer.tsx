import React from "react";
import HeroSection from "@/components/hero-section";
import MapComponent from "@/components/map";
// import ListComponent from "@/components/List"; // Commented out as file is missing
import { getStrapiMedia } from "@/lib/strapi";

import Banner from "@/components/banner";
import Blog from "@/components/blog";
import Bundles from "@/components/bundles";
import Categories from "@/components/categories";
import Cart from "@/components/cart";
import Contact from "@/components/contact";
import Content from "@/components/content";
import Faq from "@/components/faq";
import Featured from "@/components/featured";
import Header from "@/components/header";
import Instagram from "@/components/instagram";
import ProductDetail from "@/components/product-detail";
import ProductList from "@/components/product-list";
import SideCart from "@/components/side-cart";
import StickyTopBar from "@/components/sticky-top-bar";
import SubscribeNewsletter from "@/components/subscribe-newsletter";
import Testimonial from "@/components/testimonial";
import BenefitsTrust from "@/components/benefits-trust";

// Helper to map icon strings to Lucide components
import { ShieldCheck, Award, Lightbulb, TrendingUp, Zap, BarChart, Cpu, Layers, Check } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
    shield: ShieldCheck,
    award: Award,
    lightbulb: Lightbulb,
    trending: TrendingUp,
    zap: Zap,
    "bar-chart": BarChart,
    cpu: Cpu,
    layers: Layers,
    check: Check,
};

// Map Strapi data to HeroSection props
const HeroWrapper = (props: any) => {
    return (
        <HeroSection
            title={props.title || "Welcome"}
            description={props.description || ""}
            imageUrl={props.image ? getStrapiMedia(props.image.url) || undefined : undefined}
            imageAlt={props.image?.alternativeText || "Hero image"}
            ctaPrimary={props.ctaPrimary}
            ctaSecondary={props.ctaSecondary}
            variant={props.variant || "default"}
            imagePosition={props.imagePosition || "right"}
            {...props}
        />
    );
};

const BenefitsTrustWrapper = (props: any) => {
    const items = (props.benefits || props.items || []).map((item: any) => ({
        ...item,
        iconName: item.icon, // Pass the string name, not the component
    }));

    return (
        <BenefitsTrust
            sectionTitle={props.sectionTitle}
            sectionDescription={props.sectionDescription}
            items={items}
            variant={props.variant || "icon-list"}
            {...props}
        />
    );
};

const ContentWrapper = (props: any) => {
    return (
        <Content
            title={props.title}
            body={props.content || ""}
            variant={props.variant || "text-only"}
            {...props}
        />
    );
};

const ProductListWrapper = (props: any) => {
    const products = (props.products || []).map((product: any, index: number) => ({
        id: `product-${index}`,
        name: product.name,
        price: parseFloat(product.price.replace('$', '')) || 0,
        category: product.category,
        href: product.href,
        imageUrl: "/placeholder.svg", // Placeholder
        ...product
    }));

    return (
        <ProductList
            sectionTitle={props.sectionTitle}
            products={products}
            variant={props.variant || "grid-simple"}
            {...props}
        />
    );
};

const TestimonialWrapper = (props: any) => {
    const testimonials = (props.testimonials || []).map((t: any) => ({
        quote: t.content,
        author: t.authorName,
        role: t.authorRole,
        rating: t.rating,
        ...t
    }));

    return (
        <Testimonial
            sectionTitle={props.sectionTitle}
            testimonials={testimonials}
            variant={props.variant || "grid"}
            {...props}
        />
    );
};

const InstagramWrapper = (props: any) => {
    return (
        <Instagram
            sectionTitle={props.title}
            posts={[]} // Placeholder as Strapi doesn't provide posts yet
            variant={props.variant || "grid-simple"}
            {...props}
        />
    );
};

const BlogWrapper = (props: any) => {
    // Strapi block doesn't have posts, so we default to empty or need to fetch
    // For now, prevent crash with empty array
    const posts = (props.posts || []).map((post: any) => ({
        ...post,
        imageUrl: post.imageUrl || "/placeholder.svg",
        href: post.href || "#",
    }));

    return (
        <Blog
            sectionTitle={props.sectionTitle || "Latest Updates"}
            posts={posts}
            variant={props.variant || "grid"}
            {...props}
        />
    );
};

const HeaderWrapper = (props: any) => {
    const navLinks = props.links?.map((link: any) => ({
        label: link.text,
        href: link.href
    })) || [];

    const variant = props.variant === 'default' ? 'simple' : props.variant;

    return (
        <Header
            logoText={props.logoText || "Brand"}
            logoHref={props.logoHref || "/"}
            navLinks={navLinks}
            variant={variant}
            {...props}
        />
    );
};

// Map Strapi data to ListComponent props
// const List = ({ data }: { data: any }) => {
//     return (
//         <ListComponent
//             title={data.title}
//             items={data.items}
//         />
//     );
// };

// Map Strapi component names to React components
const blockComponents: { [key: string]: React.FC<any> } = {
    "blocks.hero": HeroWrapper,
    "blocks.features": BenefitsTrustWrapper, // Use BenefitsTrust for features list
    "blocks.map": MapComponent, // Direct map since Strapi data now matches

    // New components
    "blocks.banner": Banner,
    "blocks.blog": BlogWrapper,
    "blocks.bundles": Bundles,
    "blocks.categories": Categories,
    "blocks.cart": Cart,
    "blocks.contact": Contact,
    "blocks.content": ContentWrapper,
    "blocks.faq": Faq,
    "blocks.featured": BenefitsTrustWrapper, // Use BenefitsTrust for featured items with icons
    "blocks.header": HeaderWrapper,
    "blocks.instagram": InstagramWrapper,
    "blocks.product-detail": ProductDetail,
    "blocks.product-list": ProductListWrapper,
    "blocks.side-cart": SideCart,
    "blocks.sticky-top-bar": StickyTopBar,
    "blocks.subscribe-newsletter": SubscribeNewsletter,
    "blocks.testimonial": TestimonialWrapper,
    "blocks.benefits-trust": BenefitsTrustWrapper,
};

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
    if (!blocks) return null;

    return (
        <>
            {blocks.map((block: any, index: number) => {
                const Component = blockComponents[block.__component];
                if (!Component) {
                    console.warn(`Missing component for: ${block.__component}`);
                    return null;
                }
                // Use a combination of component type and index for stable keys
                return <Component key={`${block.__component}-${index}`} {...block} />;
            })}
        </>
    );
}
