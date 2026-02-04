import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const rightA = require('../public/icons/arrowRight.svg');

const OtherCategories: FC<{ allNames: any }> = ({ allNames }) => {
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(27);
  const [responsive, setResponsive] = useState<string>('xl');

  const letters = [];
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    letters.push(letter);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    if (width >= 1280) setResponsive('xl');
    else if (width >= 1024) setResponsive('lg');
    else setResponsive('sm');
  };

  useEffect(() => {
    setMaxPage(letters.map((alp: string) => allNames.filter((x: string) => x[0].toUpperCase() == alp)).length);
  }, [maxPage, allNames]);

  return (
    <div className="flex flex-col items-center justify-center text-center lg:px-[15%] px-[7%] py-16 mb-10">
      <h3 className="font-poppinsSemiBold text-[#0D0D0D] flex flex-col-reverse lg:text-4xl text-3xl mb-5 relative will-change-transform">
        Browse business name generator by industry
      </h3>
      <span className="font-poppinsRegular lg:text-base text-sm leading-6 text-[#393939] will-change-transform lg:px-[7%] px-[2%]">
        Get business name ideas for services, skills, and other industries
      </span>
      <div className="w-full overflow-hidden mt-10">
        <div className="flex ml-auto md:mr-0 mr-auto w-max space-x-10">
          <Image
            src={rightA}
            alt="left arrow"
            className={`-scale-100 sm:w-8 w-6 cursor-pointer ${
              page == 0 ? 'opacity-40' : ' opacity-100'
            } transition-all duration-300`}
            onClick={() => page > 0 && setPage(page - 1)}
          />
          <Image
            src={rightA}
            alt="right arrow"
            className={`sm:w-8 w-6 cursor-pointer ${
              page == 21 ? 'opacity-40' : ' opacity-100'
            } transition-all duration-300`}
            onClick={() => page < 21 && setPage(page + 1)}
          />
        </div>
        <ul
          className="flex mt-10 w-max xl:space-x-[3.5vw] space-x-[5vw] overflow-hidden font-poppinsRegular transition-all duration-500 ease-out"
          style={{
            marginLeft: `-${page * (responsive == 'xl' ? 24.5 : responsive == 'lg' ? 37.5 : 91)}vw`,
          }}
        >
          {letters.map(
            (alphabet: string, idx: number) =>
              allNames.filter((x: string) => x[0].toUpperCase() == alphabet).length > 0 && (
                <li
                  key={idx}
                  className={`grid lg:grid-cols-2 grid-cols-3 xl:w-[21vw] lg:w-[32.5vw] w-[86vw] rounded-xl text-left p-5 bg-[#F8F3F3] h-max ${
                    allNames.filter((x: string) => x[0].toUpperCase() == alphabet).length < 10 && 'pb-28'
                  }`}
                >
                  <h4 className="font-poppinsSemiBold h-max lg:col-span-2 col-span-3 lg:text-2xl text-xl mb-5">
                    {alphabet}
                  </h4>
                  {allNames
                    .filter((x: string) => x[0].toUpperCase() == alphabet)
                    .map((x: string, index: number) => (
                      <Link
                        prefetch={false}
                        className="p-2 sm:p-1 underline w-max h-max max-w-full"
                        key={index}
                        href={x.replace(/\s/g, '-').toLowerCase() + '-brand-name-generator'}
                      >
                        {x}
                      </Link>
                    ))}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default OtherCategories;
