"use client";

import { Render } from "@wecre8websites/strapi-page-builder-react";
import { config } from "@/lib/page-builder-config";

// This component renders the page content built with the Page Builder
// It takes the template JSON data from Strapi and renders it using your components
export default function PageBuilderRenderer({ data }: { data: any }) {
    if (!data) return null;

    return (
        <Render
            config={config}
            data={data}
            strapi={{
                url: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
                imageUrl: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
            }}
        />
    );
}
