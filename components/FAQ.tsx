import Image from 'next/image';
import { FC, useState } from 'react';

const arrowDown = require('../public/icons/arrowDown.svg');

const FAQ: FC<{ question: any[] }> = ({ question }) => {
	const [activeIndex, setActiveIndex] = useState<number>(-1);

	return (
		<div className="flex flex-col items-center justify-center text-center lg:px-[15%] px-[7%] w-full bg-[#F8F8F8]/80 py-16">
			<h3 className="font-poppinsSemiBold flex items-center justify-center text-[#0D0D0D] w-full lg:text-4xl text-3xl mb-5 relative will-change-transform">
				Frequently Asked Questions
			</h3>
			<ul className="text-left w-full space-y-3 mt-10">
				{question?.map((qa: any, idx: number) => (
					<li
						onClick={() =>
							activeIndex == idx ? setActiveIndex(-1) : setActiveIndex(idx)
						}
						key={idx}
						className={`w-full cursor-pointer bg-[#E9E9F0] rounded-2xl lg:p-8 p-5 space-y-4 overflow-hidden ${
							activeIndex == idx ? 'h-max' : 'lg:h-[5.5rem] h-[3.4rem]'
						} transition-transform duration-300 ease-out`}>
						<div className="flex justify-between">
							<span
								className={`font-poppinsSemiBold lg:text-base text-sm max-w-[90%] overflow-hidden ${
									activeIndex != idx && 'text-ellipsis whitespace-nowrap'
								}`}>
								{Object.keys(qa)[0]}
							</span>{' '}
							<Image
								alt="arrow"
								src={arrowDown}
								className={`lg:w-6 w-5 lg:h-6 h-5 ${
									activeIndex == idx ? 'rotate-180' : 'rotate-0'
								} transition-all duration-300`}
							/>
						</div>
						<p
							className={`font-poppinsRegular whitespace-pre-line lg:text-base text-sm ${
								activeIndex == idx ? 'opacity-100' : 'opacity-0'
							}`}>
							{qa[Object.keys(qa)[0]]}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FAQ;
