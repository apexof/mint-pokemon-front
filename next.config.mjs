/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return {
      ...config,
      externals: [...config.externals, "pino-pretty", "lokijs", "encoding"],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/apexof/pokemons/main/images/**",
      },
    ],
  },
};

export default nextConfig;
