import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { darkColors, fonts, lightColors } from '../data/generativeData';
import speakText from '../hooks/speakText';
import handleLinkClick from '../hooks/handleLinkClick';
import {
	domainSetAsync,
	isSavedOnSet,
	savedSetAsync,
	selectedNameSet,
} from '../redux/features/startupNameGeneratorSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const heart = require('../public/icons/heart.svg');
const heartWhite = require('../public/icons/heartWhite.svg');
const heartFill = require('../public/icons/heartFill.svg');
const heartFillWhite = require('../public/icons/heartFillWhite.svg');
const sound = require('../public/icons/sound.svg');
const soundWhite = require('../public/icons/soundWhite.svg');

const NameCard: FC<{ name: string }> = ({ name }) => {
	const saved = useSelector((state: any) => state.startupNameGenerator.saved);

	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const [textColor, setTextColor] = useState<string>();
	const [bgColor, setBgColor] = useState<string>();
	const [light, setLight] = useState<boolean>(false);
	const [font, setFont] = useState<string>();
	const [link, setLink] = useState<string>('');

	const [fontSize, setFontSize] = useState<number>(1);

	const dispatch = useDispatch();

	useEffect(() => {
		const randomFontIndex = Math.floor(Math.random() * fonts.length) + 1;
		setFont(fonts[randomFontIndex]);

		setFontSize(Math.min(2.3, 80 / (name.length / 1.5)));
		if (randomFontIndex == 3) setFontSize(1.2);

		let value1, value2;
		const randomListIndex = Math.floor(Math.random() * 2);
		if (randomListIndex == 0) {
			const randomIndex1 = Math.floor(Math.random() * lightColors.length);
			value1 = lightColors[randomIndex1];

			const randomIndex2 = Math.floor(Math.random() * darkColors.length);
			value2 = darkColors[randomIndex2];
			setLight(false);
		} else {
			const randomIndex1 = Math.floor(Math.random() * darkColors.length);
			value1 = darkColors[randomIndex1];

			const randomIndex2 = Math.floor(Math.random() * lightColors.length);
			value2 = lightColors[randomIndex2];
			setLight(true);
		}
		setTextColor(value1);
		setBgColor(value2);
	}, [name]);

	useEffect(() => {
		async function fetchLink() {
			try {
				const response = await axios.post('/api/impact', {
					name: name.toLowerCase().replace(/\s/g, ''),
				});
				setLink(response.data.link);
			} catch (error) {
				console.error('Error:', error);
			}
		}

		fetchLink();
	}, [name]);

	return (
		<div
			className="w-full h-60 sm:hover:scale-[1.05] cursor-pointer overflow-hidden font-poppinsRegular rounded-2xl flex items-center justify-center relative group transition-all duration-300 ease-out px-7 leading-10 shadow-sm"
			style={{ backgroundColor: bgColor }}
			onClick={() => handleLinkClick(link)}>
			<Image
				onClick={(e) => {
					e.stopPropagation();
					speakText(name, setIsSpeaking);
				}}
				alt="Sound"
				src={light ? sound : soundWhite}
				className={`h-6 w-6 cursor-pointer absolute top-4 right-14 ${
					isSpeaking && 'opacity-40 pointer-events-none'
				} transition-all duration-300`}
			/>
			<Image
				src={
					saved.some((item) => item.name == name)
						? light
							? heartFill
							: heartFillWhite
						: light
						? heart
						: heartWhite
				}
				alt="Like"
				className={`h-6 w-6 ${
					saved.some((item) => item.name == name) && 'animate-heart'
				} cursor-pointer absolute top-4 right-5`}
				onClick={(e) => {
					e.stopPropagation();
					dispatch<any>(savedSetAsync(name));
				}}
			/>
			<h2
				className={`text-tertiary`}
				style={{
					color: textColor,
					fontFamily: font,
					fontSize: `${fontSize}rem`,
				}}>
				{name}
			</h2>
			<span
				onClick={(e) => {
					e.stopPropagation();
					dispatch(
						selectedNameSet({
							name: name,
							font: font,
							textColor: textColor,
							bgColor: bgColor,
						})
					);
					dispatch(isSavedOnSet(false));
					dispatch<any>(domainSetAsync(name));
				}}
				className="absolute bottom-5 text-primary group-hover:bg-secondary group-hover:shadow-sm group-hover:shadow-white group-hover:text-white font-poppinsRegular bg-white px-3 py-1 pt-[6px] rounded-full text-xs cursor-pointer transition-all duration-300 ease-out">
				check availability
			</span>
		</div>
	);
};

export default NameCard;
