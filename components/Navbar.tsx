import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Testimonials from './Testimonials';

const rightArrow = require('../public/icons/arrowRight.svg');
const logo = require('../public/logo.svg');

const Navbar: FC = () => {
	const [testimonials, setTestimonials] = useState<boolean>(false);
	useEffect(() => {
		if (testimonials) document.body.classList.add('no-scroll');
		else document.body.classList.remove('no-scroll');
	}, [testimonials]);
	const router = useRouter();
	return (
		<>
			{testimonials && <Testimonials set={setTestimonials} />}
			<nav className="h-16 fixed lg:w-3/4 w-[92%] left-1/2 -translate-x-1/2 lg:py-10 py-7 lg:px-14 px-12 text-xl rounded-b-[25px] z-[80] bg-lightSecondary flex items-center justify-between">
				<Image
					src={logo}
					alt="logo"
					className="lg:w-36 w-24 cursor-pointer"
					onClick={() => router.push('/')}
				/>
				<span
					className="sm:block hidden bg-secondary px-3 py-2 rounded-xl font-poppinsRegular text-white text-sm ml-auto mr-5 cursor-pointer hover:bg-darkSecondary transition-all duration-300 ease-out"
					onClick={() => setTestimonials(true)}>
					Subscribe
				</span>
				<Link
					prefetch={false}
					href="https://www.feedough.com"
					className="font-poppinsRegular flex lg:text-base text-sm group">
					By Feedough{' '}
					<Image
						src={rightArrow}
						alt="arrow"
						className="group-hover:translate-x-4 translate-x-2 transition-all duration-300 ease-out"
					/>
				</Link>
			</nav>
		</>
	);
};

export default Navbar;
