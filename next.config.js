require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 10000,
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    PROVINCES_URL: process.env.PROVINCES_URL,
  }
}

module.exports = nextConfig;
