/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.code-nav.cn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pic.yupi.icu',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;