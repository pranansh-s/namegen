import React from 'react';

import Navbar from '../components/Navbar';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import LandingBody from '../components/LandingBody';
import FAQPageSchema from '../components/FAQPageSchema';

import Head from 'next/head';
import { faqSchema } from '../data/faqs';
import { NextSeo, WebPageJsonLd } from 'next-seo';
import OtherCategories from '../components/OtherCategories';
import axios from 'axios';

const index = ({ allNames }) => {
	return (
		<>
		<Head>
			<link
				rel="preload"
				href="/fonts/Poppins-Regular.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
			<link
				rel="preload"
				href="/fonts/Poppins-Light.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
			<link
				rel="preload"
				href="/fonts/Poppins-LightItalic.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
			<link
				rel="preload"
				href="/fonts/Poppins-Italic.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
			<link
				rel="preload"
				href="/fonts/Poppins-Bold.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
			<link
				rel="preload"
				href="/fonts/Poppins-SemiBold.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
			<link
				rel="preload"
				href="/fonts/Overpass.ttf"
				as="font"
				type="font/ttf"
				crossOrigin=""
			/>
		</Head>
			<NextSeo
				title="Namegen: AI Business Name Generator"
				description="Use our AI-powered business name generator for free to generate your next perfect business name idea."
				canonical="https://namegen.io/"
				openGraph={{
					title: 'Namegen: AI Business Name Generator',
					description:
						'Use our AI-powered business name generator for free to generate your next perfect business name idea.',
					url: 'https://namegen.io/',
					images: [
						{
							url: '/favicon-32x32.png',
							alt: 'Logo',
						},
					],
					site_name: 'Namegen',
					type: 'website',
				}}
			/>
			<div className="bg-options h-full min-h-screen">
				<FAQPageSchema faqQuestion={faqSchema} />
				<WebPageJsonLd
					description="Use our AI-powered business name generator for free to generate your next perfect business name idea."
					id="https://namegen.io/"
				/>
				<Navbar />
				<LandingHeader />
				<LandingBody />
				<OtherCategories allNames={allNames} />
				<LandingFooter />
			</div>
		</>
	);
};

export async function getStaticProps() {
	const pageSize = 1000;
	let offset = null;
	let allNames = [];

	try {
		do {
			const res = await axios.get(
				`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASEID}/namegen`,
				{
					params: {
						offset: offset,
						maxRecords: pageSize,
					},
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
					},
				}
			);

			allNames.push(...res.data.records.map((x: any) => x.fields.Niche));

			offset = res.data.offset;
		} while (offset);

		return {
			props: { allNames },
			revalidate: 86400,
		};
	} catch (err) {
		return {
			notFound: true,
		};
	}
}

export default index;
