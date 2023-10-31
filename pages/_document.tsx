import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<link rel="manifest" href="/manifest.json" />
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
						__html: `
							(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
							})(window, document, "clarity", "script", "j6ar6kzae2");
						`,
						}}
					/>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-QX9VX4NHZM"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-QX9VX4NHZM', {
								page_path: window.location.pathname,
							});
							`,
						}}
					/>
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
