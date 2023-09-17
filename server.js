const next = require('next');
const express = require('express');
const compression = require('compression');
const applySecurityHeaders = require('./hooks/securityHeaders');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(applySecurityHeaders);
	server.use(compression());

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
