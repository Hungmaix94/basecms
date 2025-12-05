"use client";

import { Editor } from "@wecre8websites/strapi-page-builder-react";
import "@wecre8websites/strapi-page-builder-react/editor.css";
import { config } from "@/lib/page-builder-config";

export default function BuilderPage() {
    return (
        <div className="h-screen w-full">
            <Editor
                config={config}
                apiKey="fc4dacec126c20331e78862f6164622f" // You need to get this from https://pagebuilder.wc8.io
                strapi={{
                    url: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
                    imageUrl: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
                    authToken: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
                }}
            />
        </div>
    );
}
