export default ({ env }) => {
    const s3Endpoint = env('S3_ENDPOINT');
    const s3Bucket = env('S3_BUCKET');
    const s3AccessKey = env('S3_ACCESS_KEY_ID');
    const s3SecretKey = env('S3_ACCESS_SECRET');

    // Parse endpoint to get host and port if needed, or just pass it if the provider supports it.
    // The @avorati/strapi-provider-upload-minio documentation usually expects endPoint and port separately or a specific format.
    // Let's try to parse it safely.
    let endPoint = 'localhost';
    let port = 9000;
    let useSSL = false;

    if (s3Endpoint) {
        try {
            const url = new URL(s3Endpoint);
            endPoint = url.hostname;
            port = parseInt(url.port) || (url.protocol === 'https:' ? 443 : 80);
            useSSL = url.protocol === 'https:';
        } catch (e) {
            console.warn('Invalid S3_ENDPOINT, falling back to defaults', e);
        }
    }

    return {
        upload: {
            config: {
                provider: '@avorati/strapi-provider-upload-minio',
                providerOptions: {
                    accessKey: s3AccessKey,
                    secretKey: s3SecretKey,
                    bucket: s3Bucket,
                    endPoint: endPoint,
                    port: port,
                    useSSL: useSSL,
                    private: true, // Enable signed URLs for private buckets
                },
            },
        },
    };
};
