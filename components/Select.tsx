import Image from 'next/image';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

const checkMark = require('../public/icons/checkMark.svg');
const x = require('../public/icons/x.svg');
const chevronDown = require('../public/icons/chevronDown.svg');
const chevronUp = require('../public/icons/chevronUp.svg');

const Select: FC<{
	options: string[];
	multiple: boolean;
	callback: any;
	defaultIndex: any[];
}> = ({ options, multiple, callback, defaultIndex }) => {
	const [values, setValues] = useState([...defaultIndex]);
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const onClick = () => {
		setIsOpen(() => !isOpen);
	};

	const onDeleteOption = (e: any) => {
		const { value } = e.currentTarget.dataset;
		if (values.length === 1) return;

		const updatedValues = values.filter((val) => val !== value);
		setValues(updatedValues);
	};

	const onClickOption = (e: any) => {
		const { value } = e.currentTarget.dataset;

		if (!multiple) {
			setValues([value]);
			setIsOpen(false);
			dispatch(callback(options.indexOf(value)));
		} else {
			let index = options.indexOf(value);
			if (index == 0) {
				if (!values.includes(value)) setValues([value]);
				else if (values.length > 1) {
					let updatedValues = values;
					updatedValues = updatedValues.filter((val: string) => val !== value);
					console.log(updatedValues);
					setValues(updatedValues);
				}
			} else {
				index = values.indexOf(value);
				let updatedValues = [];

				if (index === -1) {
					updatedValues = [...values, value];
					if (updatedValues.length > 3) updatedValues.shift();
					if (value !== 'Auto')
						updatedValues = updatedValues.filter((val) => val !== 'Auto');
				} else {
					if (values.length === 1) return;
					updatedValues = values.filter((val) => val !== value);
					if (index == 0) updatedValues = ['Auto'];
				}
				let indices = updatedValues.map((value) => options.indexOf(value));
				for (var i = 0; i < indices.length; i++) {
					dispatch(callback(indices[i]));
				}
				setValues(updatedValues);
			}
		}
	};

	const stopPropagation = (e: any) => {
		e.stopPropagation();
	};

	const renderValues = () => {
		if (multiple) {
			return values.map((value) => (
				<div
					key={value}
					onClick={stopPropagation}
					className="flex bg-secondary font-poppinsLight hover:bg-darkSecondary transition-colors duraiton-300 ease-out rounded-md text-sm px-2 py-1 translate-y-0 text-tertiary justify-center items-center ml-1 mr-3 snap-center">
					<span className='pt-[1px]'>{value}</span>
					<Image
						data-value={value}
						alt="x"
						src={x}
						className="h-4 w-4 ml-2 p-1 cursor-pointer"
						onClick={onDeleteOption}
					/>
				</div>
			));
		}

		return <div className="md:text-base text-sm">{values[0]}</div>;
	};

	const renderOption = (option: any, index: number) => {
		const name = option;
		const selected = values.includes(name);

		return (
			<div
				key={index}
				data-value={name}
				className="flex items-center justify-start font-poppinsRegular space-x-3 px-2 py-1 hover:bg-gray-100 overflow-hidden md:text-base text-sm whitespace-nowrap"
				onClick={onClickOption}>
				{multiple && (
					<span
						className={`w-3 h-3 rounded-sm outline outline-1 outline-gray-700 ${
							!selected ? 'bg-transparent' : 'bg-secondary'
						}`}>
						{selected && (
							<Image alt="O" src={checkMark} className="h-3 p-[2px]" />
						)}
					</span>
				)}
				<span
					className={`font-overpass ${
						selected ? 'font-extrabold' : 'font-normal'
					}`}>
					{name}
				</span>
			</div>
		);
	};

	return (
		<div
			tabIndex={0}
			className="relative cursor-pointer select-none"
			onFocus={() => setIsOpen(true)}
			onBlur={() => setIsOpen(false)}>
			<div
				className={`relative flex items-center justify-between bg-white md:px-4 px-3 py-[0.45rem] outline ${
					isOpen ? 'outline-secondary outline-2' : 'outline-black outline-1'
				} rounded-full`}
				onClick={onClick}>
				<div
					className={`flex flex-wrap h-7 items-center overflow-y-scroll [&::-webkit-scrollbar]:bg-transparent md:text-base text-sm xl:pt-0 ${
						multiple ? 'pt-0' : 'pt-1'
					}`}>
					{renderValues()}
				</div>
				<span className="absolute right-4">
					{isOpen ? (
						<Image alt="up" src={chevronUp} className="h-3 w-3" />
					) : (
						<Image alt="down" src={chevronDown} className="h-3 w-3" />
					)}
				</span>
			</div>
			{isOpen && (
				<div className="absolute top-[calc(100%+0.5rem)] right-0 left-0 bg-white border-[1px] border-gray-800 rounded-lg z-30 max-h-[19rem] overflow-x-hidden overflow-scroll">
					{options.map((option, index) => renderOption(option, index))}
				</div>
			)}
		</div>
	);
};

export default Select;
