import { fetchAPI } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

async function getLandingPageData() {
  try {
    const data = await fetchAPI("/landing-page", {
      populate: {
        blocks: {
          populate: "*",
        },
        seo: {
          populate: "*",
        },
      },
    });
    console.log(data, '>>>>>>>>>>>>>>>>>>>>>')
    // For Single Types, Strapi returns { data: { id, attributes: {...} } }
    return data?.data;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return null;
  }
}

export default async function Home() {
  const pageData = await getLandingPageData();

  if (!pageData) {
    return <div suppressHydrationWarning>Loading... or Error (Make sure Strapi is running and Landing Page is published)</div>;
  }
  console.log(pageData,'..................................')
  return (
    <main>
      <BlockRenderer blocks={pageData?.blocks} />
    </main>
  );
}
