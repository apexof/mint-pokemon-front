/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
        pathname: '/apexof/pokemons/main/images/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  webpack: (config) => {
    return {
      ...config,
      externals: [...config.externals, 'pino-pretty', 'lokijs', 'encoding'],
    }
  },
}

export default nextConfig
