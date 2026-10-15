import type { NextConfig } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const isProd = process.env.NODE_ENV === "production";

const remotePatterns = baseUrl
  ? [
      (() => {
        const url = new URL(baseUrl);
        return {
          protocol: url.protocol.replace(":", "") as "http" | "https",
          hostname: url.hostname,
          port: url.port,
          pathname: "/storage/**",
        };
      })(),
    ]
  : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  compiler: {
    removeConsole: isProd ? { exclude: ["error"] } : false,
  },
  images: {
    unoptimized: true,
    qualities: [75, 85],
    remotePatterns,
  },
};

export default nextConfig;
