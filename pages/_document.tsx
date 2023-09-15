import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
					<meta
						name="viewport"
						content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=5.0"
					/>
					<meta name="theme-color" content="#8B79CF" />
					<meta name="apple-mobile-web-app-status-bar" content="#8B79CF" />
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
					<link rel="manifest" href="/manifest.json"/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
