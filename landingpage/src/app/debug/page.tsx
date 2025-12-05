import { fetchAPI } from "@/lib/strapi";

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    const data = await fetchAPI("/landing-page", {
        populate: {
            template: {
                populate: '*'
            }
        }
    });

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Debug: Landing Page Data</h1>
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="font-bold mb-2">Full Response:</h2>
                <pre className="text-xs overflow-auto max-h-96">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>

            <div className="mt-4 bg-blue-100 p-4 rounded">
                <h2 className="font-bold mb-2">Template Data:</h2>
                <pre className="text-xs overflow-auto max-h-96">
                    {JSON.stringify(data?.data?.template, null, 2)}
                </pre>
            </div>

            <div className="mt-4 bg-green-100 p-4 rounded">
                <h2 className="font-bold mb-2">Template JSON:</h2>
                <pre className="text-xs overflow-auto max-h-96">
                    {JSON.stringify(data?.data?.template?.json, null, 2)}
                </pre>
            </div>
        </div>
    );
}
