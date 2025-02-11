/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // except for webpack, other parts are left as generated
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram-store-image.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig