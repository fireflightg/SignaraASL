/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.aceternity.com",
      "images.unsplash.com",
      "images.pexels.com",
      "signasl.wordpress.com",
    ],
  },
  webpack: (config, { isServer }) => {
    // Add a new rule to handle .task files as assets
    config.module.rules.push({
      test: /\.task$/,
      type: "asset/resource",
      generator: {
        filename: "static/assets/[hash][ext][query]", // This places .task files in the 'static/assets' folder within the '.next' output directory
      },
    });

    // Return the modified config
    return config;
  },
};

module.exports = nextConfig;
