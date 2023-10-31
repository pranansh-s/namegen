const helmet = require('helmet');

const applySecurityHeaders = (req, res, next) => {
	const nonce = Math.random().toString(36).substring(7);
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				connectSrc: [
					"'self'",
					'https://api.openai.com',
					'https://domainr.p.rapidapi.com',
					'https://assignment-api.uspto.gov',
					'https://hook.kntz.it',
					'https://y.clarity.ms',
					'https://www.google-analytics.com'
				],
				scriptSrc: [
					"'self'",
					"'unsafe-eval'",
					"'unsafe-inline'",
					'https://www.googletagmanager.com',
					'https://www.clarity.ms',
				],
			},
		},
	})(req, res, next);
};

module.exports = applySecurityHeaders;
