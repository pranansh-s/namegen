const helmet = require('helmet');

const applySecurityHeaders = (req, res, next) => {
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
					'https://www.googletagmanager.com',
				],
			},
		},
	})(req, res, next);
};

module.exports = applySecurityHeaders;
