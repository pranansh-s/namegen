const CompressionPlugin = require('compression-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

require('dotenv').config();

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|svg|woff|woff2|eot|ttf|otf)$/,
          filename: '[path][base].gz',
        })
      );
    }

    return config;
  },
});
