import axios from "axios";
import qs from "qs";

export function getStrapiURL(path = "") {
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}

export async function fetchAPI(
    path: string,
    urlParamsObject = {},
    options = {}
) {
    try {
        // Merge default and user options
        const mergedOptions = {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(
            `/api${path}${queryString ? `?${queryString}` : ""}`
        )}`;

        // Trigger API call
        const response = await axios.get(requestUrl, mergedOptions);
        return response.data;
    } catch (error: any) {
        console.error('Strapi API Error:', error);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        }
        console.error('Request URL:', error.config?.url);
        throw error;
    }
}
