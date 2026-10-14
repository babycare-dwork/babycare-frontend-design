import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.71", "192.168.1.69", "192.168.1.76"],
  compiler: {
    removeConsole: { exclude: ["error"] },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.100.23",
        port: "8008",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.71",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.67",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.69",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "marketplace.thebabycareapp.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
