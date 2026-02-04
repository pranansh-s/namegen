import Image from 'next/image';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savedArraySet, savedSet } from '../redux/features/startupNameGeneratorSlice';

const trashIcon = require('../public/icons/trash.svg');
const checkCircle = require('../public/icons/CheckCircleGreen.svg');
const cross = require('../public/icons/XCircle.svg');

const Saved: FC = () => {
  const saved = useSelector((state: any) => state.startupNameGenerator.saved);
  const isSavedOn = useSelector((state: any) => state.startupNameGenerator.isSavedOn);

  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`flex flex-col absolute lg:top-16 top-20 right-0 text-left lg:w-[30rem] w-full min-h-[13rem] h-max p-6 rounded-xl rounded-tr-none bg-white border-t-[2px] border-secondary z-[50] font-poppinsRegular shadow-lg ${
          isSavedOn ? 'block' : 'hidden'
        }`}
      >
        <div className="text-primary/60 mb-3 md:text-sm text-xs font-overpass justify-between w-full flex">
          <span>Liked Names</span>
          <span className="underline cursor-pointer" onClick={() => dispatch(savedArraySet([]))}>
            Clear
          </span>
        </div>
        {saved.length == 0 ? (
          <span className="font-poppinsLightItalic md:text-base text-sm text-primary/40 mt-2">
            Keep the ones you like in here
          </span>
        ) : (
          <ul className="text-primary flex flex-col md:text-base text-sm font-overpass h-full mt-2">
            {saved.map((item: any, idx: number) => (
              <li key={idx} className="flex items-center group border-b-2 border-black/20 mb-2 space-x-10">
                <span className="group-hover:font-overpass font-bold cursor-default w-1/2 overflow-hidden text-ellipsis">
                  {item.name}
                </span>
                <span className="flex items-center">
                  {' '}
                  <Image
                    className="h-5 w-5 -translate-y-[1px] -translate-x-1"
                    src={item.domain ? checkCircle : cross}
                    alt="check"
                  />
                  Domains
                </span>
                <span className="flex items-center">
                  {' '}
                  <Image
                    className="h-5 w-5 -translate-y-[1px] -translate-x-1"
                    src={item.trademark ? checkCircle : cross}
                    alt="check"
                  />
                  Trademark
                </span>
                <Image
                  alt="-"
                  src={trashIcon}
                  className="h-4 group-hover:opacity-100 opacity-0 transition-all duration-500 ease-out cursor-pointer -translate-y-[1px]"
                  onClick={() => dispatch(savedSet(item))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Saved;
