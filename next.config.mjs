/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  transpilePackages: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 yıl cache
    unoptimized: true, // R2 için optimizasyonu kapat
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Daha az boyut
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Daha az boyut
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  distDir: 'dist',
}

export default nextConfig
