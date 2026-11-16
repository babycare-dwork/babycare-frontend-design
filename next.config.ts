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

const apiOrigin = baseUrl ? new URL(baseUrl).origin : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"} https://accounts.google.com`,
  "style-src 'self' 'unsafe-inline' https://accounts.google.com",
  "font-src 'self' data:",
  `img-src 'self' data: blob: ${apiOrigin} https://*.tile.openstreetmap.org https://unpkg.com https://lh3.googleusercontent.com`,
  `connect-src 'self' ${apiOrigin} https://overpass-api.de https://accounts.google.com ${isProd ? "" : "ws: wss:"}`,
  "frame-src https://accounts.google.com",
  "form-action 'self' https://*.esewa.com.np",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: { compilationMode: "annotation" },
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  compiler: {
    removeConsole: isProd ? { exclude: ["error"] } : false,
  },
  images: {
    unoptimized: true, // Backend converts uploads to WebP; Vercel optimization quota reached
    qualities: [75, 85],
    remotePatterns,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
