import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import speakText from '../hooks/speakText';
import handleLinkClick from '../hooks/handleLinkClick';
import {
	domainSet,
	selectedNameSet,
} from '../redux/features/startupNameGeneratorSlice';
import { motion } from 'framer-motion';
import axios from 'axios';

const linkW = require('../public/icons/Link.svg');
const linkG = require('../public/icons/LinkGreen.svg');
const purpleSound = require('../public/icons/purpleSound.svg');
const shoppingCart = require('../public/icons/ShoppingCart.svg');
const globe = require('../public/icons/Globe.svg');
const trademark = require('../public/icons/Trademark.svg');
const line = require('../public/icons/Line.svg');
const close = require('../public/icons/x.svg');
const syllables = require('../public/icons/syllables.svg');

const NameModal = () => {
	const domains = useSelector(
		(state: any) => state.startupNameGenerator.domains
	);
	const selectedName = useSelector(
		(state: any) => state.startupNameGenerator.selectedName
	);

	const [link, setLink] = useState<string>('/');
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!selectedName) return;
		async function fetchLink() {
			try {
				const response = await axios.post('/api/impact', {
					name: selectedName.name.toLowerCase().replace(/\s/g, ''),
				});
				setLink(response.data.link);
			} catch (error) {
				console.error('Error:', error);
			}
		}

		fetchLink();
	}, [selectedName]);

	const countSyllables = (word: string) => {
		word = word.toLowerCase();
		if (word.length <= 3) return 1;
		word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
		word = word.replace(/^y/, '');
		return word.match(/(?=[aeiouy]{1,2})/g).length + 1;
	}

	const breakIntoSyllables = (word: string) => {
		word = word.toLowerCase();
		word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
		word = word.replace(/^y/, '');
		word = word.split(/(?=[aeiou]{1,2})/g).join('•');
		return word;
	}

	const scoreScale = (name: string) => {
		let score = evaluateBrandName(name);
		if(score < 0.2) return "Poor";
		else if(score < 0.4) return "Average";
		else if(score < 0.6) return "Excellent";
		else if(score < 0.8) return "Outstanding";
		else return "Premium";
	}

	const evaluateBrandName = (name: string) => {
		//Syllable Score
		const syllables = countSyllables(name);
		let syllableTestScore = 0;

		if (syllables >= 2 && syllables <= 3) {
			syllableTestScore = 3.33;
		} else if (syllables === 1 || syllables === 4) {
			syllableTestScore = 1.67;
		} else {
			syllableTestScore = 0;
		}

		//Radio Score
		const problematicPatterns = ['0-9', '-', '_', ' '];
		const confusingPairs = [
			['bass', 'base'],
			['here', 'hear'],
			['bee', 'be'],
			['pin', 'pen'],
		];
		const consonants = 'bcdfghjklmnpqrstvwxyz';
		let radioScore = 3.33;

		for (const pattern of problematicPatterns) {
			if (name.includes(pattern)) {
				radioScore = 0;
				break;
			}
		}

		for (const [word1, word2] of confusingPairs) {
			if (
				name.toLowerCase().includes(word1) ||
				name.toLowerCase().includes(word2)
			) {
				radioScore = 0;
				break;
			}
		}

		const regex = /(.)\1{2,}/;
		if (regex.test(name)) {
			radioScore = 0;
		}

		let consonantStreak = 0;
		for (const char of name.toLowerCase()) {
			if (consonants.includes(char)) {
				consonantStreak++;
				if (consonantStreak >= 3) {
					radioScore = 0;
					break;
				}
			} else {
				consonantStreak = 0;
			}
		}

		//Length Score
		let lengthScore = 0;
		const length = name.length;
		if (length <= 6) lengthScore = 3.33;
		else if (length <= 10) lengthScore = 2.22;
		else if (length <= 15) lengthScore = 1.11;
		else lengthScore = 0;

		//Total Score
		const radioTestScore = radioScore;
		const lengthTestScore = lengthScore;
		const overallScore = Number(((radioTestScore + lengthTestScore + syllableTestScore) / 10).toFixed(1));
	
		return overallScore;
	}

	return (
		<>
			{selectedName && (
				<div className="h-screen w-screen fixed z-[100] top-0">
					<div className="bg-[#F9F9FA] sm:w-[50rem] w-full sm:h-[38rem] h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:rounded-3xl sm:overflow-y-hidden overflow-y-scroll p-8 space-y-5">
						<Image
							src={close}
							alt="close"
							className="bg-primary rounded-full w-5 p-1 absolute right-4 top-4 cursor-pointer sm:hidden block"
							onClick={() => {
								dispatch(selectedNameSet(null));
								dispatch(
									domainSet({
										com: null,
										net: null,
										org: null,
										me: null,
										xyz: null,
										co: null,
										trademark: null,
										loading: true,
									})
								);
							}}
						/>
						<div className="flex sm:flex-row flex-col sm:h-[45%] h-[28rem] space-x-5 -translate-y-5">
							<div
								className="sm:w-[55%] w-full h-full rounded-2xl flex items-center justify-center px-7 leading-10 overflow-hidden"
								style={{
									backgroundColor: selectedName.bgColor,
									color: selectedName.textColor,
								}}>
								<h3
									style={{
										fontSize: `${
											selectedName.font == 'OverThere'
												? 1
												: Math.min(2.3, 80 / (selectedName.name.length / 1.5))
										}rem`,
										fontFamily: selectedName.font,
									}}
									className="text-center">
									{selectedName.name}
								</h3>
							</div>
							<div className="py-3 sm:text-3xl text-4xl flex flex-col sm:items-start items-center">
								<h4 className="font-poppinsRegular">{selectedName.name} </h4>
								<span className="font-poppinsLightItalic text-[#7A7A7A] text-base">
									({breakIntoSyllables(selectedName.name)})
								</span>
								<span
									className={`flex text-[0.8rem] text-secondary w-max ${
										isSpeaking
											? 'cursor-default opacity-60'
											: 'cursor-pointer opacity-100'
									}`}
									onClick={() => speakText(selectedName.name, setIsSpeaking)}>
									<Image src={purpleSound} alt="sound" className="w-5" />
									&nbsp;{' '}
									<span className="underline select-none">click to listen</span>
								</span>
								<div className="mt-6 flex flex-col text-sm space-y-4 font-poppinsRegular items-center">
									<div className="relative sm:w-full w-1/2">
										<Image
											src={syllables}
											alt="syllables"
											className="w-full absolute"
										/>
										<svg
											width="100%"
											height="100%"
											viewBox="0 0 217 44"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="relative">
											<motion.path
												initial={{ pathLength: 0 }}
												animate={{
													pathLength: evaluateBrandName(selectedName.name),
												}}
												transition={{ duration: 1 }}
												d="M8 8.00594L8.50376 8.02568L9.00752 8.05922L9.51128 8.10651L10.015 8.16752L10.5188 8.24218L11.0226 8.33041L11.5263 8.43213L12.0301 8.54725L12.5338 8.67564L13.0376 8.81718L13.5414 8.97173L14.0451 9.13914L14.5489 9.31924L15.0526 9.51185L15.5564 9.71679L16.0602 9.93385L16.5639 10.1628L17.0677 10.4035L17.5714 10.6556L18.0752 10.9188L18.5789 11.1931L19.0827 11.478L19.5865 11.7732L20.0902 12.0786L20.594 12.3938L21.0977 12.7184L21.6015 13.0522L22.1053 13.3948L22.609 13.746L23.1128 14.1052L23.6165 14.4723L24.1203 14.8468L24.6241 15.2283L25.1278 15.6165L25.6316 16.0111L26.1353 16.4115L26.6391 16.8175L27.1429 17.2285L27.6466 17.6443L28.1504 18.0644L28.6541 18.4883L29.1579 18.9158L29.6617 19.3462L30.1654 19.7793L30.6692 20.2146L31.1729 20.6517L31.6767 21.09L32.1805 21.5293L32.6842 21.969L33.188 22.4088L33.6917 22.8482L34.1955 23.2867L34.6992 23.7239L35.203 24.1595L35.7068 24.5929L36.2105 25.0238L36.7143 25.4517L37.218 25.8761L37.7218 26.2968L38.2256 26.7132L38.7293 27.1249L39.2331 27.5316L39.7368 27.9329L40.2406 28.3283L40.7444 28.7174L41.2481 29.0999L41.7519 29.4754L42.2556 29.8436L42.7594 30.2039L43.2632 30.5562L43.7669 30.9001L44.2707 31.2351L44.7744 31.5611L45.2782 31.8776L45.782 32.1844L46.2857 32.4811L46.7895 32.7674L47.2932 33.0432L47.797 33.308L48.3008 33.5617L48.8045 33.804L49.3083 34.0346L49.812 34.2534L50.3158 34.46L50.8195 34.6544L51.3233 34.8363L51.8271 35.0055L52.3308 35.1618L52.8346 35.3052L53.3383 35.4355L53.8421 35.5525L54.3459 35.6561L54.8496 35.7462L55.3534 35.8228L55.8571 35.8857L56.3609 35.935L56.8647 35.9704L57.3684 35.9921L57.8722 36L58.3759 35.9941L58.8797 35.9743L59.3835 35.9408L59.8872 35.8935L60.391 35.8325L60.8947 35.7578L61.3985 35.6696L61.9023 35.5679L62.406 35.4528L62.9098 35.3244L63.4135 35.1828L63.9173 35.0283L64.4211 34.8609L64.9248 34.6808L65.4286 34.4882L65.9323 34.2832L66.4361 34.0662L66.9398 33.8372L67.4436 33.5965L67.9474 33.3444L68.4511 33.0812L68.9549 32.8069L69.4586 32.522L69.9624 32.2268L70.4662 31.9214L70.9699 31.6062L71.4737 31.2816L71.9774 30.9478L72.4812 30.6052L72.985 30.2541L73.4887 29.8948L73.9925 29.5277L74.4962 29.1532L75 28.7717L75.5038 28.3835L76.0075 27.9889L76.5113 27.5885L77.015 27.1825L77.5188 26.7715L78.0226 26.3557L78.5263 25.9356L79.0301 25.5117L79.5338 25.0842L80.0376 24.6538L80.5414 24.2207L81.0451 23.7854L81.5489 23.3484L82.0526 22.91L82.5564 22.4707L83.0601 22.031L83.5639 21.5912L84.0677 21.1518L84.5714 20.7133L85.0752 20.2761L85.5789 19.8405L86.0827 19.4071L86.5865 18.9762L87.0902 18.5483L87.594 18.1239L88.0977 17.7032L88.6015 17.2868L89.1053 16.8751L89.609 16.4684L90.1128 16.0671L90.6165 15.6717L91.1203 15.2826L91.6241 14.9001L92.1278 14.5246L92.6316 14.1565L93.1353 13.7961L93.6391 13.4438L94.1429 13.0999L94.6466 12.7649L95.1504 12.4389L95.6541 12.1224L96.1579 11.8156L96.6617 11.5189L97.1654 11.2326L97.6692 10.9568L98.1729 10.692L98.6767 10.4383L99.1804 10.196L99.6842 9.96538L100.188 9.74663L100.692 9.53997L101.195 9.34561L101.699 9.16374L102.203 8.99453L102.707 8.83816L103.211 8.69478L103.714 8.56453L104.218 8.44754L104.722 8.34392L105.226 8.25378L105.729 8.17721L106.233 8.11428L106.737 8.06505L107.241 8.02957L107.744 8.00788L108.248 8L108.752 8.00594L109.256 8.02568L109.759 8.05922L110.263 8.10651L110.767 8.16752L111.271 8.24218L111.774 8.33041L112.278 8.43213L112.782 8.54725L113.286 8.67564L113.789 8.81718L114.293 8.97173L114.797 9.13914L115.301 9.31924L115.805 9.51185L116.308 9.71679L116.812 9.93385L117.316 10.1628L117.82 10.4035L118.323 10.6556L118.827 10.9188L119.331 11.1931L119.835 11.478L120.338 11.7732L120.842 12.0786L121.346 12.3938L121.85 12.7184L122.353 13.0522L122.857 13.3948L123.361 13.746L123.865 14.1052L124.368 14.4723L124.872 14.8468L125.376 15.2283L125.88 15.6165L126.383 16.0111L126.887 16.4115L127.391 16.8175L127.895 17.2285L128.398 17.6443L128.902 18.0644L129.406 18.4883L129.91 18.9158L130.414 19.3462L130.917 19.7793L131.421 20.2146L131.925 20.6517L132.429 21.09L132.932 21.5293L133.436 21.969L133.94 22.4088L134.444 22.8482L134.947 23.2867L135.451 23.7239L135.955 24.1595L136.459 24.5929L136.962 25.0238L137.466 25.4517L137.97 25.8761L138.474 26.2968L138.977 26.7132L139.481 27.1249L139.985 27.5316L140.489 27.9329L140.992 28.3283L141.496 28.7174L142 29.0999L142.504 29.4754L143.008 29.8436L143.511 30.2039L144.015 30.5562L144.519 30.9001L145.023 31.2351L145.526 31.5611L146.03 31.8776L146.534 32.1844L147.038 32.4811L147.541 32.7674L148.045 33.0432L148.549 33.308L149.053 33.5617L149.556 33.804L150.06 34.0346L150.564 34.2534L151.068 34.46L151.571 34.6544L152.075 34.8363L152.579 35.0055L153.083 35.1618L153.586 35.3052L154.09 35.4355L154.594 35.5525L155.098 35.6561L155.601 35.7462L156.105 35.8228L156.609 35.8857L157.113 35.935L157.617 35.9704L158.12 35.9921L158.624 36L159.128 35.9941L159.632 35.9743L160.135 35.9408L160.639 35.8935L161.143 35.8325L161.647 35.7578L162.15 35.6696L162.654 35.5679L163.158 35.4528L163.662 35.3244L164.165 35.1828L164.669 35.0283L165.173 34.8609L165.677 34.6808L166.18 34.4882L166.684 34.2832L167.188 34.0662L167.692 33.8372L168.195 33.5965L168.699 33.3444L169.203 33.0812L169.707 32.8069L170.211 32.522L170.714 32.2268L171.218 31.9214L171.722 31.6062L172.226 31.2816L172.729 30.9478L173.233 30.6052L173.737 30.2541L174.241 29.8948L174.744 29.5277L175.248 29.1532L175.752 28.7717L176.256 28.3835L176.759 27.9889L177.263 27.5885L177.767 27.1825L178.271 26.7715L178.774 26.3557L179.278 25.9356L179.782 25.5117L180.286 25.0842L180.789 24.6538L181.293 24.2207L181.797 23.7854L182.301 23.3484L182.805 22.91L183.308 22.4707L183.812 22.031L184.316 21.5912L184.82 21.1518L185.323 20.7133L185.827 20.2761L186.331 19.8405L186.835 19.4071L187.338 18.9762L187.842 18.5483L188.346 18.1239L188.85 17.7032L189.353 17.2868L189.857 16.8751L190.361 16.4684L190.865 16.0671L191.368 15.6717L191.872 15.2826L192.376 14.9001L192.88 14.5246L193.383 14.1565L193.887 13.7961L194.391 13.4438L194.895 13.0999L195.398 12.7649L195.902 12.4389L196.406 12.1224L196.91 11.8156L197.414 11.5189L197.917 11.2326L198.421 10.9568L198.925 10.692L199.429 10.4383L199.932 10.196L200.436 9.96538L200.94 9.74663L201.444 9.53997L201.947 9.34561L202.451 9.16374L202.955 8.99453L203.459 8.83816L203.962 8.69478L204.466 8.56453L204.97 8.44754L205.474 8.34392L205.977 8.25378L206.481 8.17721L206.985 8.11428L207.489 8.06505L207.992 8.02957L208.496 8.00788L209 8"
												stroke={
													evaluateBrandName(selectedName.name) < 0.2
														? '#E84E4E'
														: evaluateBrandName(selectedName.name) < 0.4
														? '#E88F4E'
														: evaluateBrandName(selectedName.name) < 0.6
														? '#E8D84E'
														: evaluateBrandName(selectedName.name) < 0.8
														? '#C0E84E'
														: '#76E84E'
												}
												strokeWidth="15"
												strokeMiterlimit="10"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<span className="flex justify-start">
										{countSyllables(selectedName.name)} syllables &nbsp;&nbsp;{' '}
										<span className="text-secondary">•</span> &nbsp;&nbsp;{' '}
										{scoreScale(selectedName.name)}
									</span>
								</div>
							</div>
						</div>
						<Image src={line} alt="line" />
						<div>
							<h5 className="text-secondary font-poppinsSemiBold  flex items-center">
								<Image src={globe} className="w-5 mr-1" alt="globe" /> Domain
								Availability
							</h5>
							<ul className="grid sm:grid-cols-2 grid-cols-1 gap-3 mt-3">
								{['com', 'net', 'org', 'me', 'xyz', 'co'].map((domain, idx) => (
									<li key={idx} className="flex items-center justify-center">
										{selectedName.name.toLowerCase().replace(/\s/g, '')}.
										<span
											className={`font-poppinsSemiBold flex justify-center translate-y-[0.5px] ${
												!domains[domain]
													? 'text-gray-600 animate-domains'
													: domains[domain].includes('undelegated')
													? 'text-green-500'
													: domains[domain].includes(
															'premium' || 'marketed' || 'priced'
													  )
													? 'text-yellow-500'
													: 'text-red-500'
											}`}>
											{domain}
										</span>
										<button
											className="ml-auto flex items-center text-white bg-secondary px-3 font-poppinsLight text-sm py-1 rounded-full"
											onClick={() => handleLinkClick(link)}>
											<Image src={shoppingCart} alt="cart" />
											&nbsp;Buy
										</button>
									</li>
								))}
							</ul>
							<span
								className="cursor-pointer text-secondary font-poppinsLight items-center flex mt-5 mx-auto w-max"
								onClick={() => handleLinkClick(link)}>
								<span className="underline text-sm">Show More</span> &nbsp;{' '}
								<Image src={linkW} alt="link" />
							</span>
						</div>
						<div className="text-secondary font-poppinsSemiBold flex items-center">
							<Image src={trademark} className="w-5 mr-1" alt="trademark" />
							Trademark Availability&nbsp;&nbsp;
							<span
								className={`font-poppinsLight flex ${
									domains.trademark == null
										? 'animate-domains text-gray-600'
										: domains.trademark == true
										? 'text-green-500 cursor-pointer underline'
										: 'text-red-500 underline'
								}`}
								onClick={() =>
									domains.trademark == true &&
									handleLinkClick(`register-trademark`)
								}>
								{domains.trademark == null
									? 'loading'
									: domains.trademark == true
									? 'available'
									: 'not available'}
								{domains.trademark && (
									<Image src={linkG} alt="link" className="p-1 w-6" />
								)}
							</span>
						</div>
					</div>
					<div
						onClick={() => {
							dispatch(selectedNameSet(null));
							dispatch(
								domainSet({
									com: null,
									net: null,
									org: null,
									me: null,
									xyz: null,
									co: null,
									trademark: null,
									loading: true,
								})
							);
						}}
						className="bg-primary/80 w-screen h-screen"
					/>
				</div>
			)}
		</>
	);
};

export default NameModal;
