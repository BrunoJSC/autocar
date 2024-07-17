/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  experimental: {
    taint: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/studio/:path*",
        destination: "/studio/index.html",
      },
    ];
  },
};

export default nextConfig;
