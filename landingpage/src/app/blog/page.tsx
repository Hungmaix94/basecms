import { fetchAPI, getStrapiMedia } from "@/lib/strapi";
import Blog from "@/components/blog";

export const revalidate = 60;

async function getBlogPosts() {
    try {
        const data = await fetchAPI("/blog-posts", {
            populate: "*",
        });
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getBlogPosts();

    // Transform Strapi data to match Blog component props
    const transformedPosts = posts.map((post: any) => ({
        title: post.title,
        description: post.content ? post.content.substring(0, 150) + "..." : "No description",
        imageUrl: post.cover ? getStrapiMedia(post.cover.url) || "/placeholder.jpg" : "/placeholder.jpg",
        category: post.category?.name || "Uncategorized",
        date: new Date(post.publishedAt || post.createdAt).toLocaleDateString(),
        author: post.authors?.[0]?.name || "Anonymous",
        href: `/blog/${post.slug}`,
    }));

    return (
        <Blog
            sectionTitle="Latest Blog Posts"
            posts={transformedPosts}
            variant="grid"
        />
    );
}
