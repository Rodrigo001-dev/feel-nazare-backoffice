/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-728a35345bde4c09ad5859d0a864f5d3.r2.dev',
      },
      {
        hostname:
          'feel-nazare-bucket.1494f9250cf4eb32af6a991fd413fdb5.r2.cloudflarestorage.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
