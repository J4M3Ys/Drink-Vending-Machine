/** @type {import('next').NextConfig} */
require("dotenv").config();
const withImages = require("next-images");

const nextConfig = {
  withImages,
  reactStrictMode: true,
  env: {
    appName: process.env.NEXT_PUBLIC_BASE_URL,
    appUrl: process.env.NEXT_PUBLIC_BASE_URL_API,
  },
};

module.exports = nextConfig;
