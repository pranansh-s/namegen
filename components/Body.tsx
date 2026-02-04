import { FC } from 'react';

import OptionsStyle from './OptionsStyle';
import OptionsIndustryKeywords from './OptionsIndustryKeywords';
import ResultsPage from './ResultsPage';

import { useSelector } from 'react-redux';

const Body: FC = () => {
  const page = useSelector((state: any) => state.startupNameGenerator.page);
  return (
    <>
      {/* Options Background */}
      {page <= 1 && <div className="w-full h-[calc(100%+1rem)] fixed bg-options bg-center bg-cover -z-10" />}
      {/* Body */}
      <div
        className={`${
          page <= 1
            ? `${page == 0 ? 'xl:w-[50rem]' : 'xl:w-[60rem]'} ${
                page == 0 ? 'md:w-[40rem]' : 'md:w-[45rem]'
              } sm:w-[40rem] xs:w-[35rem] w-[95%] h-full bg-[#F3F3F3] xl:p-16 md:p-12 sm:p-8 p-5 py-12 rounded-[25px] shadow-xl justify-center sm:translate-y-0 ${
                page == 1 ? 'translate-y-24' : 'translate-y-0'
              }`
            : 'w-full h-full min-h-screen bg-results bg-center bg-cover bg-fixed p-0 rounded-none shadow-none justify-start'
        } transition-all duration-1000 ease-out flex flex-col text-center items-center font-poppinsRegular overflow-hidden`}
      >
        {/* Results Page */}
        {page == 2 ? (
          <ResultsPage />
        ) : (
          <>
            {/* Options */}
            {/* Options Heading */}
            <h1 className="xl:text-5xl md:text-4xl text-3xl font-overpass font-bold text-secondary">
              {page == 0 ? 'About your startup' : 'Select your type'}
            </h1>
            <span className="my-5 font-poppinsRegular xl:text-base md:text-sm text-xs">
              {page == 0
                ? 'Choose Your Industry and Add Relevant Keywords for Naming Assistance'
                : 'Select Your Preferred Naming Style for the App to Generate Tailored and Unique Startup Names'}
            </span>

            {/* Options Pages */}
            <div className="w-full h-max">
              <div
                className={`flex w-[200%] h-max items-center ${
                  page == 0 ? 'ml-0%' : '-ml-[100%]'
                } transition-all duration-500 ease-out`}
              >
                <OptionsIndustryKeywords />
                <OptionsStyle />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Body;
