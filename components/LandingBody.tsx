import Image from 'next/image';
import { useState } from 'react';

import { donts, dos } from '../data/random';
import FAQ from './FAQ';
import StandOut from './StandOut';
import { faqs } from '../data/faqs';

const cloud = require('../public/icons/clouds.svg');
const cloud2 = require('../public/icons/cloud2.svg');
const arrowDown = require('../public/icons/arrowDown.svg');
const circle = require('../public/icons/circle.svg');
const connectLeft = require('../public/icons/connectLeft.svg');
const connectRight = require('../public/icons/connectRight.svg');
const x = require('../public/icons/cross.svg');
const checkCircle = require('../public/icons/CheckCircleGreen.svg');
const xCircle = require('../public/icons/XCircle.svg');
const swigglyGreen = require('../public/icons/greenWave.svg');
const swigglyRed = require('../public/icons/redWave.svg');

const LandingBody = () => {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<main className="w-full h-max lg:space-y-24 space-y-16 flex items-center flex-col -mt-44">
			{/* Facilities */}
			<div className="flex flex-col items-center justify-center text-center lg:px-[15%] px-[7%] pb-10">
				<h3 className="font-poppinsSemiBold text-[#0D0D0D] flex flex-col-reverse lg:text-4xl text-3xl mb-5 relative will-change-transform">
					Why go for a Brandable Name?
					<Image
						src={cloud2}
						alt="cloud"
						className="w-40 mx-auto translate-y-14 lg:translate-x-10 translate-x-24"
					/>
				</h3>
				<p className="font-poppinsRegular lg:text-base text-sm leading-6 text-[#393939] will-change-transform lg:px-[7%] px-[2%]">
					Imagine being at a party filled with people you&apos;ve never met.
					Amidst the murmur of introductions, one name rings clear and stays
					with you even after the party is over. That&apos;s what a brandable
					name does for your business.
				</p>
				<p
					className={`text-[#393939] lg:text-base text-sm font-poppinsRegular transition-all duration-300 flex space-x-3 mt-6 will-change-transform ${
						hover ? 'opacity-0' : 'opacity-60'
					}`}>
					<Image src={arrowDown} alt="arrow" />
					<span>try hovering over each for more information</span>
					<Image src={arrowDown} alt="arrow" />
				</p>
				<div className="flex lg:flex-row flex-col w-full h-max lg:my-24 my-12 justify-center lg:space-x-3 space-x-0 lg:space-y-0 space-y-16 will-change-transform">
					<div
						className="group relative h-full translate-y-full"
						onMouseEnter={() => setHover(true)}>
						<span className="bg-white lg:text-base text-sm whitespace-nowrap group-hover:bg-secondary group-hover:text-white border-[#CDCDCD] px-8 text-[#0D0D0D] py-4 font-poppinsRegular rounded-full border-[1px] transition-all duration-300 cursor-pointer ease-out">
							Memorability
						</span>
						<p className="p-5 lg:text-left text-center pointer-events-none group-hover:opacity-100 opacity-0 bg-white font-poppinsRegular absolute w-64 group-hover:bottom-16 bottom-12 lg:translate-x-1/3 -translate-x-1/2 lg:left-0 left-1/2 shadow-lg rounded-[25px] text-sm lg:rounded-bl-none transition-all duration-300 ease-out">
							A brandable name is short, catchy, and easy to remember. This
							helps customers recall and recognize your brand more easily.
						</p>
					</div>
					<Image
						src={connectLeft}
						alt="-"
						className="w-48 lg:block hidden translate-y-1/2"
					/>
					<div
						className="group relative translate-y-full"
						onMouseEnter={() => setHover(true)}>
						<span className="bg-white lg:text-base text-sm whitespace-nowrap group-hover:bg-secondary group-hover:text-white border-[#CDCDCD] px-8 text-[#0D0D0D] py-4 font-poppinsRegular rounded-full border-[1px] transition-all duration-300 cursor-pointer ease-out">
							Distinctiveness
						</span>
						<p className="p-5 text-center pointer-events-none group-hover:opacity-100 opacity-0 bg-white font-poppinsRegular absolute w-64 lg:group-hover:bottom-24 group-hover:bottom-16 lg:bottom-16 bottom-12 -translate-x-1/2 left-1/2 shadow-lg rounded-[25px] text-sm transition-all duration-300 ease-out">
							An invented, brandable name stands out from competitors. It
							doesn&apos;t get lost in a sea of similar sounding names and
							allows you to own the name legally.
						</p>
					</div>
					<Image
						src={connectRight}
						alt="-"
						className="w-48 lg:block hidden translate-y-1/2"
					/>
					<div
						className="group relative h-full translate-y-full"
						onMouseEnter={() => setHover(true)}>
						<span className="bg-white text-base whitespace-nowrap group-hover:bg-secondary group-hover:text-white border-[#CDCDCD] px-8 text-[#0D0D0D] py-4 font-poppinsRegular rounded-full border-[1px] transition-all duration-300 cursor-pointer ease-out">
							Flexibility
						</span>
						<p className="p-5 lg:text-right text-center pointer-events-none group-hover:opacity-100 opacity-0 bg-white font-poppinsRegular absolute w-64 group-hover:bottom-16 bottom-12 -translate-x-1/2 lg:left-0 left-1/2 shadow-lg rounded-[25px] text-sm lg:rounded-br-none transition-all duration-300 ease-out">
							A brandable name gives you flexibility to expand your offerings
							over time under one brand umbrella.
						</p>
					</div>
				</div>
			</div>

			<StandOut />
			{/* Dos donts */}
			<div className="flex flex-col items-center justify-center text-center lg:px-[15%] px-[7%]">
				<h3 className="font-poppinsSemiBold flex items-center justify-center text-[#0D0D0D] w-full lg:text-4xl text-3xl mb-5 relative will-change-transform">
					<Image
						src={cloud}
						alt="cloud"
						className="sm:w-24 w-20 lg:-mt-12 -mt-20 -mr-8 sm:relative absolute -left-8"
					/>
					How to Choose a Business Name?
				</h3>
				<p className="font-poppinsRegular lg:text-base text-sm leading-6 text-[#393939] will-change-transform lg:px-[7%] px-[2%]">
					Learn how to choose your business name with our Care or Don&apos;t
					checklist. Crafting standout names is at the heart of Feedough&apos;s
					Namegen. Discover what it means to Care about your brand. And what it
					might look like if you Don&apos;t! Only select a name for your
					business after completing this checklist.
				</p>
				<ul className="mt-20 flex md:flex-row flex-col w-full justify-center md:space-x-10 space-x-0 whitespace-nowrap will-change-transform md:space-y-0 space-y-20">
					<li className="bg-[#F3FDF5] rounded-[25px] lg:w-[30rem] w-full lg:h-[35rem] h-[30rem] relative">
						<Image
							src={circle}
							alt="correct"
							className="h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full p-16 absolute"
						/>
						<div className="bg-[#006600] lg:text-lg text-md absolute h-12 w-1/4 font-poppinsSemiBold text-white rounded-tl-[25px] rounded-br-[25px] flex items-center justify-center">
							Do&apos;s
						</div>
						<ul className="flex flex-col items-start justify-center h-full lg:mx-11 mx-6 lg:space-y-5 space-y-4 font-poppinsRegular lg:text-base text-sm">
							{dos.map((item: string, idx: number) => (
								<li key={idx} className="flex space-x-3">
									<Image src={checkCircle} alt="tick" className="w-5" />
									<span>{item}</span>
								</li>
							))}
						</ul>
						<Image src={swigglyGreen} alt="swiggly" className="mx-auto mt-5" />
					</li>

					<li className="bg-[#FFF8F8] rounded-[25px] lg:w-[30rem] w-full lg:h-[35rem] h-[30rem] relative">
						<Image
							src={x}
							alt="wrong"
							className="h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full p-16 absolute"
						/>
						<div className="bg-[#B30000] lg:text-lg text-base absolute h-12 w-1/4 font-poppinsSemiBold text-white rounded-tl-[25px] rounded-br-[25px] flex items-center justify-center">
							Dont&apos;s
						</div>
						<ul className="flex flex-col items-start justify-center h-full lg:mx-11 mx-6 lg:space-y-5 space-y-4 font-poppinsRegular lg:text-base text-sm">
							{donts.map((item: string, idx: number) => (
								<li key={idx} className="flex space-x-3">
									<Image src={xCircle} alt="x" className="w-5" />
									<span>{item}</span>
								</li>
							))}
						</ul>
						<Image src={swigglyRed} alt="swiggly" className="mx-auto mt-5" />
					</li>
				</ul>
			</div>
			<FAQ question={faqs} />
		</main>
	);
};

export default LandingBody;
