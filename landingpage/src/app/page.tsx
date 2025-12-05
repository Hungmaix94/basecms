import { fetchAPI } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import PageBuilderRenderer from "@/components/PageBuilderRenderer";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

async function getLandingPageData() {
  try {
    const data = await fetchAPI("/landing-page", {
      populate: {
        template: true,
        blocks: {
          on: {
            'blocks.header': {
              populate: {
                logo: {
                  populate: {
                    media: {
                      fields: ['url', 'alternativeText', 'width', 'height']
                    }
                  }
                },
                links: {
                  populate: '*'
                }
              }
            },
            // Fallback for other blocks to ensure they are populated
            'blocks.hero': { populate: '*' },
            'blocks.benefits-trust': { populate: '*' },
            'blocks.featured': { populate: '*' },
            'blocks.content': { populate: '*' },
            'blocks.categories': { populate: '*' },
            'blocks.product-list': { populate: '*' },
            'blocks.bundles': { populate: '*' },
            'blocks.testimonial': { populate: '*' },
            'blocks.pricing': { populate: '*' },
            'blocks.faq': { populate: '*' },
            'blocks.banner': { populate: '*' },
            'blocks.blog': { populate: '*' },
            'blocks.map': { populate: '*' },
            'blocks.subscribe-newsletter': { populate: '*' },
            'blocks.contact': { populate: '*' },
            'blocks.instagram': { populate: '*' },
            'blocks.sticky-top-bar': { populate: '*' }
          }
        },
        seo: {
          populate: '*'
        }
      }
    });
    console.log(data, '>>>>>>>>>>>>>>>>>>>>>')
    // For Single Types, Strapi returns { data: { id, attributes: {...} } }
    return data?.data;
  } catch (error: any) {
    console.error("Error fetching landing page data:", error);
    if (error?.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    return null;
  }
}

export default async function Home() {
  const pageData = await getLandingPageData();

  if (!pageData) {
    return <div suppressHydrationWarning>Loading... or Error (Make sure Strapi is running and Landing Page is published)</div>;
  }

  console.log(pageData, '..................................')

  return (
    <main>
      {/* If template exists, use Page Builder. Otherwise, use traditional blocks */}
      {pageData?.template?.json ? (
        <PageBuilderRenderer data={{ templateJson: pageData.template.json }} />
      ) : (
        <BlockRenderer blocks={pageData?.blocks} />
      )}
    </main>
  );
}
