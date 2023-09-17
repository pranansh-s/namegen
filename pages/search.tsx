import { useEffect } from 'react';
import { NextPage } from 'next';

import Navbar from '../components/Navbar';
import Body from '../components/Body';

import { useDispatch, useSelector } from 'react-redux';
import {
	industrySet,
	pageSet,
	resetState,
	resultsSetAsync,
	searchTermSet,
} from '../redux/features/startupNameGeneratorSlice';
import { useRouter } from 'next/router';
import NameModal from '../components/NameModal';
import { NextSeo, WebPageJsonLd } from 'next-seo';
import Head from 'next/head';

const StartupNameGenerator: NextPage = () => {
	const page = useSelector((state: any) => state.startupNameGenerator.page);
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (page == 2) {
			dispatch<any>(resultsSetAsync());
		}
	}, [page, dispatch]);

	useEffect(() => {
		dispatch(resetState());

		if (!router.isReady) return;
		if (router.query.industry) {
			dispatch(industrySet(router.query.industry));
			dispatch(pageSet(1));
		}
		if (router.query.q && router.query.q.length > 0) {
			dispatch(searchTermSet(router.query.q));
		} else {
			router.push('/');
		}
	}, [router, dispatch]);
	return (
		<>
			<NextSeo
				title="Namegen: AI Business Name Generator"
				description="Use our AI-powered business name generator for free to generate your next perfect business name idea."
				canonical="https://www.namegen.io/search"
				openGraph={{
					title: 'Namegen: AI Business Name Generator',
					description:
						'Use our AI-powered business name generator for free to generate your next perfect business name idea.',
					url: 'https://www.namegen.io/search',
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
			<WebPageJsonLd
				description="Namegen search for your specific names"
				id="https://namegen.io/search"
			/>
			<Navbar />
			<div className="min-h-screen h-full flex items-center justify-center">
				<NameModal />
				<Body />
			</div>
		</>
	);
};

export default StartupNameGenerator;
