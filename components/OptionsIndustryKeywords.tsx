import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GenerateButton from './GenerateButton';
import Select from './Select';

import { industrySet, keywordsSet, pageSet } from '../redux/features/startupNameGeneratorSlice';
import { industries } from '../data/options';
import Image from 'next/image';

const x = require('../public/icons/x.svg');

const OptionsIndustryKeywords = () => {
  const page = useSelector((state: any) => state.startupNameGenerator.page);
  const keywords = useSelector((state: any) => state.startupNameGenerator.keywords);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim() !== '' && !keywords.includes(inputValue.trim()) && keywords.join('').length <= 80) {
        let newKeywords = [...keywords, inputValue.trim()];
        dispatch(keywordsSet(newKeywords));
        setInputValue('');
      }
    }
  };

  const handleChipDelete = (index: number) => {
    let newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    dispatch(keywordsSet(newKeywords));
  };

  return (
    <div
      className={`w-full ${
        page == 0 ? 'h-fit opacity-100' : 'h-0 opacity-0'
      }  flex flex-col justify-center items-center transition-all duration-1000 ease-out relative space-y-5`}
    >
      <div className="sm:w-2/3 w-full px-5 mt-5">
        <Select defaultIndex={[industries[0]]} callback={industrySet} multiple={false} options={industries} />
      </div>
      <label htmlFor="Optional" className="text-sm opacity-60 text-center w-full">
        -------------------- Optional --------------------
      </label>
      <div className="border rounded p-2 sm:w-2/3 w-full px-3 text-sm">
        <div className="flex flex-wrap">
          {keywords.map((tag: string, idx: number) => (
            <div
              key={idx}
              className="border rounded-full px-2 py-1 mr-2 mt-1 bg-secondary text-white cursor-pointer hover:bg-darkSecondary flex max-w-[10rem]"
              onClick={() => handleChipDelete(idx)}
            >
              <span key={tag} className="w-[90%] text-ellipsis overflow-hidden">
                {tag}
              </span>
              <Image alt="x" src={x} className="w-2 ml-2" />
            </div>
          ))}
        </div>
        <textarea
          className={`w-full resize-none rounded-lg p-2 border focus:outline-none mt-2`}
          rows={3}
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyDown}
          onKeyDown={handleInputKeyDown}
          placeholder="Enter keywords related to your search..."
        />
        <p
          className={`text-left text-black/70 w-full text-xs font-poppinsLightItalic ${
            inputValue ? 'opacity-70' : 'opacity-0'
          }`}
        >
          * Press Enter To Add Keyword
        </p>
      </div>

      <GenerateButton text="Next" set={() => dispatch(pageSet(1))} />
    </div>
  );
};

export default OptionsIndustryKeywords;
