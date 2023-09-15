import '../styles/globals.css';

import {
	ArticleJsonLd,
	DefaultSeo,
	OrganizationJsonLd,
	SiteLinksSearchBoxJsonLd,
} from 'next-seo';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Head from 'next/head';

const defaultSeoConfig = {
	title: 'Namegen: AI Business Name Generator',
	description:
		'Use our AI-powered business name generator for free to generate your next perfect business name idea.',
	openGraph: {
		type: 'website',
		locale: 'en_IND',
		url: 'https://namegen.io',
		site_name: 'Namegen',
	},
};

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<OrganizationJsonLd
				type="Corporation"
				id="https://namegen.io/"
				logo="https://namegen.io/favicon-32x32.png"
				name="Namegen"
				address={{
					streetAddress: 'B-19, Shalimar Garden, Sahibabad',
					addressLocality: 'Ghaziabad',
					addressRegion: 'Uttar Pradesh',
					postalCode: '201005',
					addressCountry: 'IN',
				}}
				contactPoint={[
					{
						telephone: '+91-9999436109',
						contactType: 'customer service',
						email: 'feedoughassets@gmail.com',
						areaServed: 'IN',
						availableLanguage: ['English'],
					},
				]}
				sameAs={['https://www.feedough.com']}
				url="https://namegen.io/"
			/>
			<SiteLinksSearchBoxJsonLd
				url="https://namegen.io"
				potentialActions={[
					{
						target: 'https://namegen.io/search?q',
						queryInput: 'search_term_string',
					},
				]}
			/>
			<ArticleJsonLd
				type="BlogPosting"
				url="https://namegen.io/blog"
				title="Namegen Blogs"
				images={[
					'https://namegen.io/favicon-32x32.png',
					'https://namegen.io/favicon-16x16.png',
					'https://namegen.io/logo.svg',
				]}
				datePublished="2023-02-05T08:00:00+08:00"
				dateModified="2023-02-05T09:00:00+08:00"
				authorName={[
					{
						name: 'Aashish Pahwa',
						url: 'https://namegen.io',
					},
				]}
				description="Namegen Blogs provides articles on how to grow as a startup/business owner"
			/>
			<DefaultSeo {...defaultSeoConfig} />
			<Component {...pageProps} />
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
		</Provider>
	);
}

export default MyApp;
