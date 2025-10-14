import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.api.pikakasino.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join( import.meta.url, 'styles')],
  },
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 3000, // Check for changes every 3 second
  //     aggregateTimeout: 300, // Delay before rebuilding
  //   };
  //   // Solve for error: WebpackDevMiddleware is not a function
  //   return config;
  // }
};

export default nextConfig;
