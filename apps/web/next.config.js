/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [{ source: "/", destination: "/Dashboard", permanent: true }];
  },
  i18n,
  pageExtensions: ["page.tsx"],
};

module.exports = nextConfig;
