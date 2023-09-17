import axios from 'axios';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import LandingFooter from '../components/LandingFooter';
import LandingHeader from '../components/LandingHeader';
import FAQ from '../components/FAQ';
import StandOut from '../components/StandOut';
import InstantNames from '../components/InstantNames';
import OtherCategories from '../components/OtherCategories';
import Steps from '../components/Steps';
import FAQPageSchema from '../components/FAQPageSchema';

const Topic = ({ data, allNames }) => {
	const [fa, setFa] = useState<any>();
	const convertToObjects = (arr: string[]) => {
		const result = [];
		let pattern = /(Q|A)\d*: |(?:\d+\.\s?)/g;

		arr.forEach((string) => {
			let qu = string.split('\n');
			let questionAnswer = [
				qu[0].replace(pattern, ''),
				qu[1].replace(pattern, ''),
			];

			const obj = { [questionAnswer[0]]: questionAnswer[1] };
			result.push(obj);
		});

		return result;
	};

	useEffect(() => {
		setFa(convertToObjects(data.FAQs.split('\n\n')));
	}, [data.FAQs]);
	return (
		<>
			<NextSeo
				title={data.MetaTitle.replace(/\b\w/g, (match) => match.toUpperCase())}
				description={data.MetaDescription}
				canonical={`https://namegen.io/${
					data.Niche.replace(/\s/g, '-').toLowerCase() + '-brand-name-generator'
				}`}
				openGraph={{
					title: data.MetaTitle,
					description: data.MetaDescription,
					url: `https://namegen.io/${
						data.Niche.replace(/\s/g, '-').toLowerCase() +
						'-brand-name-generator'
					}`,
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
			<FAQPageSchema
				faqQuestion={convertToObjects(data.FAQs.split('\n\n')).map((entry) => ({
					questionName: Object.keys(entry)[0],
					acceptedAnswerText: entry[Object.keys(entry)[0]],
				}))}
			/>
			<div className="bg-options h-full">
				<Navbar />
				<LandingHeader type={data.Niche} />
				<Steps intro={data.Introduction} steps={data.HowTo} name={data.Niche} />
				<InstantNames names={data.Names} />
				<StandOut />
				<FAQ question={fa} />
				<OtherCategories allNames={allNames} />
				<LandingFooter />
			</div>
		</>
	);
};

export async function getStaticPaths() {
	const pageSize = 1000;
	let offset = null;
	let paths = [];

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

		paths = paths.concat(
			res.data.records.map((x: any) => ({
				params: {
					topic:
						x.fields.Niche.replace(/\s/g, '-').toLowerCase() +
						'-brand-name-generator',
				},
			}))
		);

		offset = res.data.offset;
	} while (offset);

	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params }) {
	const pageSize = 1000;
	let offset = null;
	let allNames = [];

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

	let res;
	try {
		res = await axios.get(
			`https://api.airtable.com/v0/${
				process.env.NEXT_PUBLIC_AIRTABLE_BASEID
			}/namegen?filterByFormula=${encodeURIComponent(
				`{Niche} = "${params.topic
					.replace(/-/g, ' ')
					.replace(/\b\w/g, (match) => match.toUpperCase())
					.slice(0, -21)}"`
			)}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
				},
			}
		);

		const data = res.data.records[0].fields;

		return {
			props: { data, allNames },
			revalidate: 86400,
		};
	} catch (err) {
		return {
			notFound: true,
		};
	}
}

export default Topic;
