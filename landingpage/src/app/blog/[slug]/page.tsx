import { fetchAPI } from "@/lib/strapi";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getBlogPost(slug: string) {
    try {
        const data = await fetchAPI("/blog-posts", {
            filters: {
                slug: slug,
            },
            populate: "*",
        });
        return data?.data?.[0];
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }
}

export async function generateStaticParams() {
    try {
        const posts = await fetchAPI("/blog-posts", { fields: ["slug"] });
        return posts?.data?.map((post: any) => ({
            slug: post.slug,
        })) || [];
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="prose lg:prose-xl">
                {/* Render Rich Text here - you might need a markdown renderer or blocks renderer depending on Strapi config */}
                {/* For now, just dumping content if it's text, or warning if it's blocks */}
                {typeof post.content === 'string' ? (
                    <p>{post.content}</p>
                ) : (
                    <pre>{JSON.stringify(post.content, null, 2)}</pre>
                )}
            </div>
        </article>
    );
}
