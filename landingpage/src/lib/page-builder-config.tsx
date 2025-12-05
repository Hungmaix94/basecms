import { DropZone } from "@wecre8websites/strapi-page-builder-react";
import { getStrapiMedia } from "@/lib/strapi";
import HeroSection from "@/components/hero-section";
import Banner from "@/components/banner";
import Content from "@/components/content";
import Testimonial from "@/components/testimonial";
import BenefitsTrust from "@/components/benefits-trust";
import Blog from "@/components/blog";
import Bundles from "@/components/bundles";
import Categories from "@/components/categories";
import Cart from "@/components/cart";
import Contact from "@/components/contact";
import Faq from "@/components/faq";
import Header from "@/components/header";
import Instagram from "@/components/instagram";
import MapComponent from "@/components/map";
import ProductDetail from "@/components/product-detail";
import ProductList from "@/components/product-list";
import SideCart from "@/components/side-cart";
import StickyTopBar from "@/components/sticky-top-bar";
import SubscribeNewsletter from "@/components/subscribe-newsletter";
import Text from "@/components/text";
import ContainerComponent from "@/components/container";
const processImage = (image: any) => {
    const url = typeof image === 'object' ? image?.url : image;
    return getStrapiMedia(url) || undefined;
};

// Define the configuration for the Page Builder
// This maps your React components to the builder's UI
export const config: Config = {
    components: {
        // Layout
        Container: {
            label: "Container",
            defaultProps: {
                layout: "grid",
                columns: 2,
                gap: "1rem",
                align: "stretch",
                justify: "start",
                overflow: "hidden",
                styles: {
                    backgroundColor: "",
                    padding: "2rem",
                    margin: "0",
                    maxWidth: "1200px",
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                layout: {
                    type: "select",
                    options: [
                        { label: "Stack (Vertical)", value: "stack" },
                        { label: "Grid", value: "grid" },
                        { label: "Flex (Horizontal)", value: "flex" },
                    ]
                },
                columns: {
                    type: "select",
                    options: [
                        { label: "1 Column", value: 1 },
                        { label: "2 Columns", value: 2 },
                        { label: "3 Columns", value: 3 },
                        { label: "4 Columns", value: 4 },
                    ]
                },
                gap: {
                    type: "select",
                    options: [
                        { label: "None", value: "0" },
                        { label: "Small (0.5rem)", value: "0.5rem" },
                        { label: "Medium (1rem)", value: "1rem" },
                        { label: "Large (2rem)", value: "2rem" },
                        { label: "XLarge (3rem)", value: "3rem" },
                    ]
                },
                align: {
                    type: "select",
                    options: [
                        { label: "Start", value: "start" },
                        { label: "Center", value: "center" },
                        { label: "End", value: "end" },
                        { label: "Stretch", value: "stretch" },
                    ]
                },
                justify: {
                    type: "select",
                    options: [
                        { label: "Start", value: "start" },
                        { label: "Center", value: "center" },
                        { label: "End", value: "end" },
                        { label: "Space Between", value: "between" },
                        { label: "Space Around", value: "around" },
                        { label: "Space Evenly", value: "evenly" },
                    ]
                },
                overflow: {
                    type: "select",
                    options: [
                        { label: "Visible", value: "visible" },
                        { label: "Hidden", value: "hidden" },
                        { label: "Scroll", value: "scroll" },
                        { label: "Auto", value: "auto" },
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        backgroundColor: { type: "text" },
                        padding: { type: "text" },
                        margin: { type: "text" },
                        maxWidth: { type: "text" },
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => {
                return (
                    <ContainerComponent {...props}>
                        <DropZone zone="content" />
                    </ContainerComponent>
                );
            }
        },
        Text: {
            label: "Text",
            defaultProps: {
                text: "Enter your text here...",
                variant: "p",
                align: "left",
                styles: {
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                text: { type: "textarea" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Paragraph", value: "p" },
                        { label: "Heading 1", value: "h1" },
                        { label: "Heading 2", value: "h2" },
                        { label: "Heading 3", value: "h3" },
                        { label: "Heading 4", value: "h4" },
                        { label: "Heading 5", value: "h5" },
                        { label: "Heading 6", value: "h6" },
                        { label: "Blockquote", value: "blockquote" },
                    ]
                },
                align: {
                    type: "select",
                    options: [
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" },
                        { label: "Justify", value: "justify" },
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <Text {...props} />
        },

        // Navigation
        Header: {
            label: "Header",
            defaultProps: {
                links: [
                    { text: "Home", href: "/" },
                    { text: "About", href: "/about" }
                ],
                logo: {
                    media: null,
                    width: 100,
                    height: 40,
                    variant: "square"
                },
                variant: "default",
                styles: { elementId: "", className: "" }
            },
            fields: {
                links: {
                    type: "array",
                    arrayFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                logo: {
                    type: "object",
                    objectFields: {
                        media: { type: "media", mediaType: "image" },
                        width: { type: "number" },
                        height: { type: "number" },
                        variant: {
                            type: "select",
                            options: [
                                { label: "Square", value: "square" },
                                { label: "Circle", value: "circle" },
                            ]
                        }
                    }
                },
                variant: {
                    type: "select",
                    options: [
                        { label: "Default", value: "default" },
                        { label: "Centered", value: "centered" },
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => {
                const navLinks = props.links?.map((link: any) => ({
                    label: link.text,
                    href: link.href
                })) || [];
                const logoData = props?.logo;
                const logoMedia = logoData?.media;
                const logoProps = logoMedia?.url ? {
                    logo: {
                        url: processImage(logoMedia),
                        alternativeText: "Logo",
                        width: logoData?.width,
                        height: logoData?.height,
                    },
                    logoVariant: logoData?.variant || "square"
                } : {};

                return (
                    <Header
                        {...props}
                        {...logoProps}
                        navLinks={navLinks}
                        variant={props.variant}
                    />
                );
            }
        },
        StickyTopBar: {
            label: "Sticky Top Bar",
            defaultProps: {
                text: "Free shipping on orders over $50!",
                cta: { text: "Shop Now", href: "/shop" },
                styles: { elementId: "", className: "" }
            },
            fields: {
                text: { type: "text" },
                cta: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <StickyTopBar {...props} />
        },
        SideCart: {
            label: "Side Cart",
            defaultProps: {
                styles: { elementId: "", className: "" }
            },
            fields: {
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <SideCart {...props} />
        },

        // Hero & Banners
        HeroSection: {
            label: "Hero Section",
            defaultProps: {
                title: "Welcome to Our Platform",
                description: "Build amazing experiences with our powerful tools and features.",
                variant: "default",
                imagePosition: "right",
                imageUrl: "",
                ctaPrimary: {
                    text: "Get Started",
                    href: "#"
                },
                ctaSecondary: {
                    text: "Learn More",
                    href: "#"
                },
                styles: {
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                title: { type: "text" },
                description: { type: "textarea" },
                imageUrl: { type: "media", mediaType: "image" }, // Using text for URL for simplicity in demo
                variant: {
                    type: "select",
                    options: [
                        { label: "Default", value: "default" },
                        { label: "Centered Image", value: "centered-image" },
                        { label: "Hero Banner", value: "hero-banner" },
                    ],
                },
                imagePosition: {
                    type: "select",
                    options: [
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" },
                    ],
                },
                ctaPrimary: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                ctaSecondary: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => {
                return (
                    <HeroSection
                        title={props.title || "Default Title"}
                        description={props.description || "Default Description"}
                        imageUrl={processImage(props.imageUrl)}
                        variant={props.variant as any}
                        imagePosition={props.imagePosition as any}
                        ctaPrimary={props.ctaPrimary}
                        ctaSecondary={props.ctaSecondary}
                        styles={props.styles}
                    />
                );
            },
        },
        Banner: {
            label: "Banner",
            defaultProps: {
                title: "Special Offer",
                description: "Get 50% off on all premium plans for a limited time.",
                variant: "default",
                imageUrl: "",
                cta: {
                    text: "Claim Offer",
                    href: "#"
                },
                styles: {
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                title: { type: "text" },
                description: { type: "textarea" },
                imageUrl: { type: "media", mediaType: "image" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Default", value: "default" },
                        { label: "Compact", value: "compact" },
                        { label: "Full Width", value: "full-width" },
                    ],
                },
                cta: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => (
                <Banner
                    title={props.title || "Banner Title"}
                    description={props.description}
                    imageUrl={processImage(props.imageUrl)}
                    variant={props.variant as any}
                    cta={props.cta}
                    styles={props.styles}
                />
            ),
        },

        // Content
        Content: {
            label: "Content Section",
            defaultProps: {
                title: "About Us",
                body: "We are a team of passionate developers building the future of web.",
                variant: "text-only",
                imagePosition: "right",
                imageUrl: "",
                cta: {
                    text: "Read More",
                    href: "#"
                },
                styles: {
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                title: { type: "text" },
                body: { type: "textarea" },
                imageUrl: { type: "media", mediaType: "image" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Text Only", value: "text-only" },
                        { label: "Text with Image", value: "text-with-image" },
                        { label: "Multi Column", value: "multi-column" },
                    ],
                },
                imagePosition: {
                    type: "select",
                    options: [
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" },
                    ],
                },
                cta: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => (
                <Content
                    title={props.title}
                    body={props.body || ""}
                    imageUrl={processImage(props.imageUrl)}
                    variant={props.variant as any}
                    imagePosition={props.imagePosition as any}
                    cta={props.cta}
                    styles={props.styles}
                />
            ),
        },
        Faq: {
            label: "FAQ",
            defaultProps: {
                sectionTitle: "Frequently Asked Questions",
                sectionDescription: "Find answers to common questions",
                faqItems: [
                    { question: "Question 1?", answer: "Answer 1." },
                    { question: "Question 2?", answer: "Answer 2." }
                ],
                variant: "accordion",
                styles: { elementId: "", className: "" }
            },
            fields: {
                sectionTitle: { type: "text" },
                sectionDescription: { type: "textarea" },
                faqItems: {
                    type: "array",
                    arrayFields: {
                        question: { type: "text" },
                        answer: { type: "textarea" }
                    }
                },
                variant: {
                    type: "select",
                    options: [
                        { label: "List", value: "list" },
                        { label: "Accordion", value: "accordion" },
                        { label: "Categorized", value: "categorized" }
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <Faq {...props} />
        },
        BenefitsTrust: {
            label: "Features & Trust",
            defaultProps: {
                sectionTitle: "Why Choose Us",
                sectionDescription: "We provide the best tools for your success.",
                variant: "icon-list",
                items: [
                    {
                        title: "Secure",
                        description: "Enterprise-grade security for your data.",
                        iconName: "shield"
                    },
                    {
                        title: "Fast",
                        description: "Lightning fast performance globally.",
                        iconName: "zap"
                    },
                    {
                        title: "Reliable",
                        description: "99.99% uptime guarantee.",
                        iconName: "check"
                    }
                ],
                styles: {
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                sectionTitle: { type: "text" },
                sectionDescription: { type: "textarea" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Icon List", value: "icon-list" },
                        { label: "Trust Badges", value: "trust-badges" },
                        { label: "Detailed Benefit", value: "detailed-benefit" },
                    ],
                },
                items: {
                    type: "array",
                    arrayFields: {
                        title: { type: "text" },
                        description: { type: "textarea" },
                        iconName: {
                            type: "select",
                            options: [
                                { label: "Shield", value: "shield" },
                                { label: "Zap", value: "zap" },
                                { label: "Check", value: "check" },
                                { label: "Award", value: "award" },
                                { label: "Lightbulb", value: "lightbulb" },
                                { label: "Trending", value: "trending" },
                                { label: "Bar Chart", value: "bar-chart" },
                                { label: "CPU", value: "cpu" },
                                { label: "Layers", value: "layers" },
                            ]
                        },
                        imageUrl: { type: "media", mediaType: "image" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => {
                const items = (props.items || []).map((item: any) => ({
                    ...item,
                    imageUrl: processImage(item.imageUrl)
                }));
                return (
                    <BenefitsTrust
                        sectionTitle={props.sectionTitle}
                        sectionDescription={props.sectionDescription}
                        items={items}
                        variant={props.variant as any}
                        styles={props.styles}
                    />
                );
            },
        },
        Testimonial: {
            label: "Testimonials",
            defaultProps: {
                sectionTitle: "What our users say",
                sectionDescription: "Trusted by thousands of developers worldwide.",
                variant: "grid",
                testimonials: [
                    {
                        quote: "This platform changed the way I build websites.",
                        author: "Jane Doe",
                        role: "Frontend Developer",
                        authorAvatar: "https://i.pravatar.cc/150?u=jane",
                        rating: 5
                    },
                    {
                        quote: "Incredible performance and ease of use.",
                        author: "John Smith",
                        role: "CTO",
                        authorAvatar: "https://i.pravatar.cc/150?u=john",
                        rating: 5
                    }
                ],
                styles: {
                    elementId: "",
                    className: "",
                }
            },
            fields: {
                sectionTitle: { type: "text" },
                sectionDescription: { type: "textarea" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Grid", value: "grid" },
                        { label: "Single", value: "single" },
                        { label: "Carousel", value: "carousel" },
                    ],
                },
                testimonials: {
                    type: "array",
                    arrayFields: {
                        quote: { type: "textarea" },
                        author: { type: "text" },
                        role: { type: "text" },
                        authorAvatar: { type: "media", mediaType: "image" },
                        rating: { type: "number" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => {
                const testimonials = (props.testimonials || []).map((t: any) => ({
                    ...t,
                    avatarUrl: processImage(t.authorAvatar)
                }));
                return (
                    <Testimonial
                        sectionTitle={props.sectionTitle}
                        sectionDescription={props.sectionDescription}
                        testimonials={testimonials}
                        variant={props.variant as any}
                        styles={props.styles}
                    />
                );
            },
        },
        Map: {
            label: "Map",
            defaultProps: {
                latitude: 37.7749,
                longitude: -122.4194,
                zoom: 13,
                styles: { elementId: "", className: "" }
            },
            fields: {
                latitude: { type: "number" },
                longitude: { type: "number" },
                zoom: { type: "number" },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <MapComponent {...props} />
        },

        // Commerce
        ProductList: {
            label: "Product List",
            defaultProps: {
                sectionTitle: "Featured Products",
                products: [],
                variant: "grid-simple",
                styles: { elementId: "", className: "" }
            },
            fields: {
                sectionTitle: { type: "text" },
                products: {
                    type: "array",
                    arrayFields: {
                        name: { type: "text" },
                        price: { type: "text" },
                        category: { type: "text" },
                        href: { type: "text" }
                    }
                },
                variant: {
                    type: "select",
                    options: [
                        { label: "Grid Simple", value: "grid-simple" },
                        { label: "Carousel", value: "carousel" },
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => {
                const products = (props.products || []).map((product: any, index: number) => ({
                    id: `product-${index}`,
                    name: product.name,
                    price: parseFloat(product.price?.replace('$', '')) || 0,
                    category: product.category,
                    href: product.href,
                    imageUrl: "/placeholder.svg",
                    ...product
                }));
                return (
                    <ProductList
                        sectionTitle={props.sectionTitle}
                        products={products}
                        variant={props.variant}
                        styles={props.styles}
                    />
                );
            }
        },
        ProductDetail: {
            label: "Product Detail",
            defaultProps: {
                productId: "1",
                styles: { elementId: "", className: "" }
            },
            fields: {
                productId: { type: "text" },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <ProductDetail {...props} />
        },
        Categories: {
            label: "Categories",
            defaultProps: {
                title: "Shop by Category",
                styles: { elementId: "", className: "" }
            },
            fields: {
                title: { type: "text" },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <Categories {...props} />
        },
        Bundles: {
            label: "Bundles",
            defaultProps: {
                title: "Our Bundles",
                description: "Check out our exclusive bundles.",
                styles: { elementId: "", className: "" }
            },
            fields: {
                title: { type: "text" },
                description: { type: "textarea" },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <Bundles {...props} />
        },
        Cart: {
            label: "Cart",
            defaultProps: {
                styles: { elementId: "", className: "" }
            },
            fields: {
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <Cart {...props} />
        },

        // Marketing & Social
        Blog: {
            label: "Blog / Latest Updates",
            defaultProps: {
                sectionTitle: "Latest Updates",
                variant: "grid",
                posts: [],
                styles: { elementId: "", className: "" }
            },
            fields: {
                sectionTitle: { type: "text" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Grid", value: "grid" },
                        { label: "List", value: "list" },
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => (
                <Blog
                    sectionTitle={props.sectionTitle}
                    posts={props.posts || []}
                    variant={props.variant as any}
                    styles={props.styles}
                />
            )
        },
        Instagram: {
            label: "Instagram Feed",
            defaultProps: {
                title: "Follow Us",
                variant: "grid-simple",
                styles: { elementId: "", className: "" }
            },
            fields: {
                title: { type: "text" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Grid Simple", value: "grid-simple" },
                        { label: "Carousel", value: "carousel" },
                    ]
                },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => (
                <Instagram
                    sectionTitle={props.title}
                    posts={[]}
                    variant={props.variant}
                    styles={props.styles}
                />
            )
        },
        SubscribeNewsletter: {
            label: "Newsletter",
            defaultProps: {
                title: "Subscribe to our newsletter",
                description: "Stay updated with our latest news.",
                styles: { elementId: "", className: "" }
            },
            fields: {
                title: { type: "text" },
                description: { type: "textarea" },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <SubscribeNewsletter {...props} />
        },
        Contact: {
            label: "Contact Form",
            defaultProps: {
                title: "Get in Touch",
                description: "We'd love to hear from you.",
                email: "support@example.com",
                phone: "+1234567890",
                styles: { elementId: "", className: "" }
            },
            fields: {
                title: { type: "text" },
                description: { type: "textarea" },
                email: { type: "text" },
                phone: { type: "text" },
                styles: {
                    type: "object",
                    objectFields: {
                        elementId: { type: "text" },
                        className: { type: "text" }
                    }
                }
            },
            render: (props: any) => <Contact {...props} />
        },
    },
    categories: {
        layout: {
            title: "Layout",
            components: ["Container"]
        },
        navigation: {
            title: "Navigation",
            components: ["Header", "StickyTopBar", "SideCart"]
        },
        hero: {
            title: "Hero & Banners",
            components: ["HeroSection", "Banner"]
        },
        content: {
            title: "Content",
            components: ["Content", "Faq", "BenefitsTrust", "Testimonial", "Map"]
        },
        commerce: {
            title: "Commerce",
            components: ["ProductList", "ProductDetail", "Categories", "Bundles", "Cart"]
        },
        marketing: {
            title: "Marketing & Social",
            components: ["Blog", "Instagram", "SubscribeNewsletter", "Contact"]
        }
    }
};
