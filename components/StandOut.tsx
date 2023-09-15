import Image from 'next/image';
import { useEffect, useState } from 'react';

const cloud = require('../public/icons/clouds.svg');
const connectorLine = require('../public/icons/Connector line 6.svg');
const connectorLine2 = require('../public/icons/Connector line 5.svg');
const connectorLine3 = require('../public/icons/Connector line 4.svg');
const connectorLine4 = require('../public/icons/Connector line 3.svg');
const connectorLine5 = require('../public/icons/Connector line 2.svg');
const connectorLine6 = require('../public/icons/Connector line.svg');
const scribble = require('../public/icons/scribbleLoop.svg');

const StandOut = () => {
	const [lg, setLg] = useState<boolean>(false);

	const updateDimensions = () => {
		const width = window.innerWidth;
		if (width <= 1024) setLg(false);
		else setLg(true);
	};

	useEffect(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center text-center lg:px-[15%] px-[7%] pb-10">
			<h3 className="font-poppinsSemiBold text-[#0D0D0D] flex flex-col-reverse lg:text-4xl text-3xl mb-5 relative will-change-transform">
				How to Generate a Business Name That Stands Out
				<Image
					src={cloud}
					alt="cloud"
					className="sm:w-24 w-20 lg:-mt-12 -mt-20 -mr-8 sm:relative absolute lg:-left-8 left-0 top-5"
				/>
			</h3>
			<p className="font-poppinsRegular lg:text-base text-sm leading-6 text-[#393939] will-change-transform lg:px-[7%] px-[2%]">
				Crafting standout names is at the heart of Feedough&apos;s Namegen. We
				go beyond the ordinary, delivering names that echo Twitter, Binance, or
				Pepsi in uniqueness and potential. Here, you find not just a name, but
				your brand&apos;s unforgettable identity.
			</p>
			<div className="flex lg:flex-row flex-col w-full h-max lg:my-24 my-12 justify-center lg:space-x-[3.75rem] space-x-0 lg:space-y-14 space-y-0 will-change-transform">
				<div className="flex flex-col items-center">
					<p className="bg-white lg:text-lg text-base text-secondary font-poppinsSemiBold px-5 py-2 rounded-full outline outline-2 outline-secondary w-[80%]">
						Define Your Business
					</p>
					<Image src={connectorLine} alt="|" className="-mt-1" />
					<p className="bg-white lg:text-lg text-base text-secondary font-poppinsSemiBold px-5 py-2 rounded-full w-[80%]">
						Identify Keywords
					</p>
					<Image src={connectorLine2} alt="|" />
					<p className="bg-white lg:text-lg text-base text-secondary font-poppinsSemiBold px-5 py-2 rounded-full w-[80%]">
						Specify Industry
					</p>
					<Image src={connectorLine3} alt="|" />
					<p className="bg-white lg:text-lg text-base text-secondary font-poppinsSemiBold px-5 py-2 rounded-full w-[80%]">
						Choose Style
					</p>
					<Image
						src={lg ? connectorLine5 : connectorLine2}
						alt="|"
						className="translate-x-1/2"
					/>
				</div>
				<div className="flex lg:flex-col flex-col-reverse items-center">
					<p className="bg-secondary lg:text-lg text-base text-white font-poppinsSemiBold px-5 py-2 rounded-full relative lg:w-full w-[80%]">
						Select Favorite{' '}
						<Image
							src={scribble}
							alt="scribble"
							className="absolute -top-36 left-0 h-[20rem] w-full"
						/>
					</p>
					<Image
						src={connectorLine4}
						alt="|"
						className="-mt-1 lg:rotate-0 rotate-180"
					/>
					<p className="bg-white lg:text-lg text-base text-secondary font-poppinsSemiBold px-5 py-2 rounded-full lg:w-full w-[80%]">
						Find the perfect one
					</p>
					<Image
						src={lg ? connectorLine6 : connectorLine3}
						alt="|"
						className="-mt-1"
					/>
					<p className="bg-white lg:text-lg text-base text-secondary font-poppinsSemiBold px-5 py-2 rounded-full lg:w-full w-[80%]">
						Generate Names
					</p>
				</div>
			</div>
		</div>
	);
};

export default StandOut;
