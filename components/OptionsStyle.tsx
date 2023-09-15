import React, { useEffect, useState } from 'react';

import GenerateButton from './GenerateButton';
import StyleChip from './StyleChip';

import { useDispatch, useSelector } from 'react-redux';
import {
	pageSet,
	stylesSet,
} from '../redux/features/startupNameGeneratorSlice';

import { styles } from '../data/options';

const OptionsStyle = () => {
	const page = useSelector((state: any) => state.startupNameGenerator.page);
	const stylesActive = useSelector(
		(state: any) => state.startupNameGenerator.styles
	);
	const dispatch = useDispatch();

	return (
		<div
			className={`w-full ${
				page == 1 ? 'h-fit opacity-100' : 'h-0 opacity-0'
			}  flex flex-col justify-center items-center transition-all mt-8 duration-1000`}>
			{/* Style Chips */}
			<div
				className={`overflow-hidden mb-10 h-max transition-all duration-300 w-full lg:px-5 px-2`}>
				<ul className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center md:gap-3 gap-2 w-full">
					{styles.map((item: any, idx: number) => (
						<StyleChip
							key={idx}
							name={item.name}
							styles={item.type}
							on={stylesActive.includes(idx)}
							setOn={() => dispatch(stylesSet(idx))}
						/>
					))}
				</ul>
			</div>
			<GenerateButton text="Next" set={() => dispatch(pageSet(2))} />
		</div>
	);
};

export default OptionsStyle;
