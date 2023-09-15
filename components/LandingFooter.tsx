import Image from 'next/image';
import Link from 'next/link';
import GenerateButton from './GenerateButton';
import { useState } from 'react';
import { useRouter } from 'next/router';
import handleLinkClick from '../hooks/handleLinkClick';

const rightArrow = require('../public/icons/arrowRight.svg');
const Facebook = require('../public/icons/Facebook.svg');
const Twitter = require('../public/icons/Twitter.svg');
const Instagram = require('../public/icons/Instagram.svg');
const LinkedIn = require('../public/icons/LinkedIn.svg');
const loop = require('../public/icons/loop.svg');
const zigzag = require('../public/icons/zigzag.svg');
const magnifyingGlass = require('../public/icons/MagnifyingGlass.svg');

const LandingFooter = () => {
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState<string>();
	const [once, setOnce] = useState<boolean>(false);

	const search = () => {
		if (searchTerm) {
			router.push({
				pathname: '/search',
				query: { q: searchTerm },
			});
		}
	};
	return (
		<footer className="bg-lightSecondary mt-24 lg:p-14 p-10 flex items-center justify-center flex-col lg:w-3/4 w-[92%] relative left-1/2 -translate-x-1/2 rounded-t-[25px] text-[#0D0D0D] space-y-10">
			<h2 className="lg:text-3xl text-2xl font-poppinsSemiBold relative text-center leading-10">
				<Image
					src={zigzag}
					alt="zigzag"
					className="absolute top-8 left-28 lg:w-32 w-24"
				/>
				<Image
					src={loop}
					alt="loop"
					className="absolute lg:-right-16 sm:-right-10 -right-0 top-2 lg:w-28 w-20 sm:block hidden"
				/>
				Find The Perfect Brand Name Today!
			</h2>
			<div className="bg-white lg:px-5 px-3 lg:py-3 py-1 xl:w-2/3 sm:w-3/4 w-full text-base rounded-full flex items-center space-x-3">
				<Image
					src={magnifyingGlass}
					alt="maginifying glass"
					className="lg:h-7 h-5"
				/>
				<input
					onChange={(e) => setSearchTerm(e.target.value)}
					type="text"
					className="focus:outline-none text-base font-poppinsRegular w-full"
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !once) {
							search();
							setOnce(true);
						}
					}}
					placeholder="Search for names using AI"
				/>
				<GenerateButton set={search} />
			</div>
			<div className="flex space-x-12">
				<span
					className="cursor-pointer"
					onClick={() => handleLinkClick('https://www.facebook.com/Feedough/')}>
					<Image src={Facebook} alt="Facebook" />
				</span>
				<span
					className="cursor-pointer"
					onClick={() => handleLinkClick('https://twitter.com/feedoughcom')}>
					<Image src={Twitter} alt="Twitter" />
				</span>
				<span
					className="cursor-pointer"
					onClick={() =>
						handleLinkClick('https://www.instagram.com/feedoughcom')
					}>
					<Image src={Instagram} alt="Instagram" />
				</span>
				<span
					className="cursor-pointer"
					onClick={() =>
						handleLinkClick('https://in.linkedin.com/company/feedough')
					}>
					<Image src={LinkedIn} alt="Linkedin" />
				</span>
			</div>
			<div className="font-poppinsLight underline text-xs space-x-10">
				<Link prefetch={false} href="/terms-and-conditions">
					Terms and Services
				</Link>
				<Link prefetch={false} href="/privacy-policy">
					Privacy Policy
				</Link>
			</div>
			<div className="w-full flex justify-between lg:flex-row flex-col items-center lg:space-y-0 space-y-10">
				<span className="font-poppinsLight opacity-60 text-xs">
					Copyright © 2023 Feedough
				</span>
				<Link
					prefetch={false}
					href="https://www.feedough.com"
					className="font-poppinsRegular flex lg:text-sm text-xs items-center">
					Go To Feedough <Image src={rightArrow} alt="arrow" className="ml-2" />
				</Link>
			</div>
		</footer>
	);
};

export default LandingFooter;
