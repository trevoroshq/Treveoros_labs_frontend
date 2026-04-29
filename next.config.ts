import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Fallback to production URL so the proxy works even when BACKEND_URL isn't set in the host
    const backendUrl = process.env.BACKEND_URL || 'https://api.labs.trevoros.com';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
