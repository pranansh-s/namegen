const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

require('dotenv').config();

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	swcMinify: false,
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		NEXT_PUBLIC_ENV: 'PRODUCTION', // Your environment variables go here
	},
});
