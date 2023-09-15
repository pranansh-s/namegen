import { FC, useEffect, useState } from 'react';

const Steps: FC<{ intro: string; steps: string; name: string }> = ({
	intro,
	steps,
	name,
}) => {
	const [st, setSt] = useState<string[]>([]);

	useEffect(() => {
		setSt(steps.replace('Section: ', '').split(/\n|:/));
	}, [steps]);
	return (
		<div className="flex flex-col items-center justify-center lg:px-[15%] px-[7%] pb-16 space-y-8">
			<h3 className="font-poppinsSemiBold flex items-center justify-center text-[#0D0D0D] w-full lg:text-4xl text-3xl mb-5 relative will-change-transform text-center">
				Getting Started with Your {name} Business Name
			</h3>
			<p className="lg:text-xl text-lg font-poppinsLight text-center !leading-[2rem]">
				{intro}
			</p>{' '}
			<br />
			<br />
			<br />
			<h3 className="font-poppinsSemiBold flex items-center justify-center text-[#0D0D0D] w-full lg:text-4xl text-3xl mb-5 relative will-change-transform text-center">
				{st[0]}
			</h3>
			<ul className="lg:text-lg text-[#393939] text-base -space-y-4">
				{st.map((line: string, index: number) => {
					const isBold =
						/\d+\.\s+/.test(line) ||
						(/Step \d/.test(line) && line.length <= 10);
					return (
						index !== 0 && (
							<li key={index}>
								<p
									className={`${
										isBold ? 'font-poppinsSemiBold' : 'font-poppinsLight'
									} ${index == st.length - 1 ? 'text-center' : 'text-left'}`}>
									{line}
								</p>{' '}
								<br />{' '}
							</li>
						)
					);
				})}
			</ul>
		</div>
	);
};

export default Steps;
