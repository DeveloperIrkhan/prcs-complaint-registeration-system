import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
    useLightningcss:false
  },
};

export default nextConfig;
