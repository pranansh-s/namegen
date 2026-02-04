import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import GenerateButton from './GenerateButton';

import { tips } from '../data/options';
const chargedIcon = require('../public/icons/charged.svg');

const OptionsSearch = () => {
  const [tipsIndex, setTipsIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [once, setOnce] = useState<boolean>(false);
  const router = useRouter();

  const search = () => {
    if (searchTerm) {
      if (router.query.topic) {
        router.push({
          pathname: '/search',
          query: { q: searchTerm, industry: router.query.topic },
        });
      } else {
        router.push({
          pathname: '/search',
          query: { q: searchTerm },
        });
      }
    }
  };

  const updateTipsIndex = () => {
    setTipsIndex(prevIndex => (prevIndex < tips.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(updateTipsIndex, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="lg:w-2/3 w-[85%] h-fit opacity-100 flex flex-col items-center">
      {/* Search Bar */}
      <div className="lg:mb-8 sm:mb-3 mb-16 sm:space-y-0 space-y-8 rounded-full bg-tertiary md:px-8 px-6 xl:py-3 md:py-2 py-1 flex sm:flex-row flex-col items-center justify-between relative xl:h-16 md:h-14 h-11 sm:w-3/4 w-full">
        <div className="flex w-full sm:mt-0 mt-2">
          <input
            type="text"
            placeholder="Describe your business in a sentence..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !once) {
                search();
                setOnce(true);
              }
            }}
            className="font-poppinsRegular placeholder:text-primary placeholder:opacity-50 placeholder:font-poppinsLightItalic focus:outline-none w-full mt-0 mr-4 lg:text-base text-xs "
          />
          <div className="absolute w-[calc(100%-3rem)] sm:w-[calc(100%-5rem)] h-[1px] bg-primary opacity-50 bottom-1/3" />
        </div>
        <GenerateButton text="Generate" set={search} />
      </div>

      {/* Tooltips */}
      <span className="w-max px-5 md:text-sm text-[0.7rem] my-5 text-primary opacity-60 font-poppinsRegularItalic">
        Not sure what to use?
      </span>
      <div className="bg-tertiary rounded-md flex items items-center md:text-sm text-[0.65rem] text-center px-4 py-1 space-x-2">
        <Image src={chargedIcon} alt="charged" />
        <span
          className="text-primary font-poppinsLight animate-tips cursor-pointer"
          onClick={() => setSearchTerm(tips[tipsIndex])}
        >
          {tips[tipsIndex]}
        </span>
      </div>
    </div>
  );
};

export default OptionsSearch;
