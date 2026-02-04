import React, { FC, useEffect, useState } from 'react';

const InstantNames: FC<{ names: string }> = ({ names }) => {
  const [nm, setNm] = useState<string[]>([]);
  useEffect(() => {
    if (!names) return;
    if (names.split(/\d+\.\s+/).length <= 25) {
      if (names.split(',').length <= 25) {
        setNm(names.split(/\s/g));
      } else {
        setNm(names.split(','));
      }
    } else {
      setNm(names.split(/\d+\.\s+/));
    }
  }, [names]);

  return (
    <div className="flex flex-col items-center justify-center text-center lg:px-[15%] px-[10%] bg-[#F8F8F8]/80 py-16 mb-16">
      <h3 className="font-poppinsSemiBold text-[#0D0D0D] flex flex-col-reverse lg:text-4xl text-3xl mb-5 relative will-change-transform">
        Instant cleaning brand name ideas with Namegen&apos;s name-generator
      </h3>
      <ul className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3 w-full gap-y-5 font-overpass font-light lg:text-base text-sm mt-16 px-10">
        {nm
          .filter(word => word.trim() !== '')
          .map((name: string, idx: number) => (
            <li key={idx}>{name}</li>
          ))}
      </ul>
    </div>
  );
};

export default InstantNames;
