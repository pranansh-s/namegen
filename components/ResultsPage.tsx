import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';

import GenerateButton from './GenerateButton';
import Results from './Results';
import Loader from './Loader';
import Select from './Select';

import { useDispatch, useSelector } from 'react-redux';
import { industries, styles } from '../data/options';

import animationData from '../public/loading.json';
import {
  clearResults,
  industrySet,
  isSavedOnSet,
  resultsSetAsync,
  searchTermSet,
  stylesSet,
} from '../redux/features/startupNameGeneratorSlice';
import Saved from './Saved';
import { useRouter } from 'next/router';

const heart = require('../public/icons/heart.svg');
const chevronUp = require('../public/icons/chevronUp.svg');
const chevronDown = require('../public/icons/chevronDown.svg');

const ResultsPage: FC = () => {
  const router = useRouter();
  const { searchTerm, results, selectedName, isSavedOn } = useSelector((state: any) => state.startupNameGenerator);
  const industryIndex = useSelector((state: any) => state.startupNameGenerator.industry);
  const stylesIndex = useSelector((state: any) => state.startupNameGenerator.styles);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [lg, setLg] = useState<boolean>(false);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const changePath = () => {
    const newQuery = `q=${searchTerm}`;
    const newURL = window.location.pathname + '?' + newQuery;
    window.history.replaceState({}, '', newURL);
  };

  const updateDimensions = () => {
    const width = window.innerWidth;
    if (width <= 1024) setLg(false);
    else setLg(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [results]);

  // useEffect(() => {
  // 	const savedData = localStorage.getItem('saved');
  // 	console.log(savedData);
  // 	if (savedData) {
  // 	  const savedArray = JSON.parse(savedData);
  // 	  dispatch(savedArraySet(savedArray));
  // 	} else {
  // 	  dispatch(savedArraySet([]));
  // 	}
  // }, [dispatch]);

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'visible';
    };

    if (selectedName) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [selectedName]);

  return (
    <div className="w-full h-full xl:px-36 lg:px-20 px-6 py-16 text-sm">
      <div
        className={`${
          results.length != 0 ? 'opacity-0' : 'opacity-100 pointer-events-none w-screen h-screen top-0 left-0 fixed'
        } transition-all duration-500 ease-out`}
      >
        <Loader />
      </div>
      <div
        className={`${
          results.length ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-all duration-500 ease-out relative w-full`}
      >
        <div className="fixed z-50 lg:-mt-64 -mt-[17rem] w-full h-max left-0">
          <div className="imagee bg-results bg-center lg:block hidden h-full absolute w-screen bg-cover" />
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between lg:bg-transparent bg-white rounded-md shadow-sm lg:px-0 px-5 lg:space-x-3 pb-3 space-x-0 pt-36 xl:w-[calc(100%-18rem)] lg:w-[calc(100%-10rem)] w-[calc(100%-3rem)] mx-auto">
            {/* I want to name */}
            <div className="w-full flex items-center justify-between z-10 px-2 sm:translate-x-2 -translate-x-2">
              <div className="flex flex-col w-full mb-5">
                <label htmlFor="Name" className="text-xs mr-auto opacity-60 mb-2">
                  I want to name
                </label>
                <input
                  type="text"
                  defaultValue={searchTerm}
                  onChange={e => dispatch(searchTermSet(e.target.value.trim()))}
                  className="bg-white rounded-full outline outline-1 focus:outline-2 focus:outline-secondary px-3 py-2 sm:text-base text-sm"
                />
              </div>
              <div className="lg:hidden flex w-max sm:ml-7 ml-10 justify-end">
                <GenerateButton
                  set={async () => {
                    changePath();
                    dispatch(clearResults());
                    dispatch<any>(resultsSetAsync());
                  }}
                />
                <Image
                  src={heart}
                  onClick={() => dispatch(isSavedOnSet(!isSavedOn))}
                  alt="Liked"
                  className="cursor-pointer ml-6"
                />
                <Saved />
              </div>
            </div>

            {(menu || lg) && (
              <>
                <div className="flex w-full justify-between items-center mb-5 space-x-3">
                  {/* Industry */}
                  {!router.query.industry && (
                    <div className="flex flex-col w-full">
                      <label htmlFor="Industry" className="text-xs mr-auto opacity-60 mb-2">
                        Industry
                      </label>
                      <Select
                        defaultIndex={[industries[industryIndex]]}
                        callback={industrySet}
                        multiple={false}
                        options={industries}
                      />
                    </div>
                  )}

                  {/* Style */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="Style" className="text-xs mr-auto opacity-60 mb-2">
                      Style
                    </label>
                    <Select
                      defaultIndex={stylesIndex.map((index: number) => styles[index]).map(item => item.name)}
                      callback={stylesSet}
                      multiple
                      options={styles.map(item => item.name)}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="lg:flex hidden justify-between w-max xl:space-x-8 space-x-6 pr-10 relative">
              <GenerateButton
                text="Generate"
                set={() => {
                  changePath();
                  dispatch(clearResults());
                  dispatch<any>(resultsSetAsync());
                }}
              />
              <Image
                src={heart}
                onClick={() => dispatch(isSavedOnSet(!isSavedOn))}
                alt="Liked"
                className="cursor-pointer w-8 h-8 mt-1"
              />
              <Saved />
            </div>
            <div
              onClick={() => setMenu(!menu)}
              className="text-xs font-poppinsLightItalic cursor-pointer lg:hidden flex underline w-full space-x-1 justify-center"
            >
              <span>{menu ? 'Hide Filters' : 'Show Filters'}</span>
              <Image alt="^" src={menu ? chevronUp : chevronDown} />
            </div>
          </div>
        </div>
        <Results />
        {isLoading ? (
          <div className="w-24 mx-auto opacity-40">
            <Lottie loop={true} animationData={animationData} />
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch<any>(resultsSetAsync());
              setIsLoading(true);
            }}
            className="text-tertiary mx-auto hover:shadow-lg transition-all duration-300 font-overpass bg-secondary shadow-md md:text-base text-sm flex justify-center items-center px-5 py-2 rounded-full"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
