import Image from 'next/image';
import { FC } from 'react';

const chevronIcon = require('../public/icons/chevronRight.svg');

const GenerateButton: FC<{ text?: string; set: any }> = ({ text, set }) => {
  return (
    <button
      onClick={set}
      className={`text-tertiary font-poppinsRegular bg-secondary shadow-md md:text-sm text-xs flex justify-center items-center group pl-4 pr-9 ${
        text ? 'lg:py-2 py-1' : 'py-5'
      } h-max w-max rounded-full -mr-4 relative`}
    >
      {text && <span className="my-1">{text}</span>}
      <Image
        src={chevronIcon}
        alt="chevronRight"
        className={`absolute ${
          text ? 'right-3 -translate-x-1/2 group-hover:right-2' : 'right-1/2 translate-x-1/2 group-hover:right-5'
        } transition-all duration-200 ease-out`}
      />
    </button>
  );
};

export default GenerateButton;
