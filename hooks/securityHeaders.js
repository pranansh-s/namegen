const helmet = require('helmet');

const applySecurityHeaders = (req, res, next) => {
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          'https://api.groq.com',
          'https://domainstatus.p.rapidapi.com',
          'https://assignment-api.uspto.gov',
          'https://hook.kntz.it',
          'https://*.clarity.ms',
          'https://www.google-analytics.com',
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
