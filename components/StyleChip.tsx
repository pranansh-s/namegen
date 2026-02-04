import Image from 'next/image';
import { FC } from 'react';

const checkMark = require('../public/icons/checkCircle.svg');
const checkMarkNon = require('../public/icons/checkCircleNon.svg');

const StyleChip: FC<{
  name: string;
  styles: string;
  on: boolean;
  setOn: any;
}> = ({ name, styles, on, setOn }) => {
  return (
    <div
      className={`w-full md:h-14 h-10 md:py-0 py-6 flex items-center rounded-full transition-all duraiton-300 ease-out border border-black/20 cursor-pointer ${
        on ? 'bg-secondary text-tertiary' : 'bg-tertiary text-primary'
      }`}
      onClick={setOn}
    >
      <Image src={!on ? checkMarkNon : checkMark} alt="checkMark" className="md:w-11 w-10 md:h-11 h-10 p-1 m-1" />
      <div className="flex text-left whitespace-nowrap pr-5 -space-y-1 pt-1 overflow-hidden flex-col justify-center items-start font-poppinsRegular md:text-base text-sm w-full">
        <h4 className="overflow-hidden text-ellipsis w-[95%]">{name}</h4>
        <span className="text-[0.7rem] overflow-hidden text-ellipsis w-[95%] opacity-70 font-poppinsLight">
          {styles}
        </span>
      </div>
    </div>
  );
};

export default StyleChip;
