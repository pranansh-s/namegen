import Image from 'next/image';
import { testimonials } from '../data/random';
import { FC, useState } from 'react';
import axios from 'axios';

const x = require('../public/icons/xBlack.svg');
const pfp = require('../public/photos/pfp.webp');
const p1 = require('../public/photos/1.webp');
const p2 = require('../public/photos/2.webp');
const p3 = require('../public/photos/3.webp');
const p4 = require('../public/photos/4.webp');
const p5 = require('../public/photos/5.webp');

const Testimonials: FC<{ set: any }> = ({ set }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const addSubscriber = async () => {
    console.log(name, email);
    if (name.length == 0 || email.length == 0) {
      setError('Field cannot be empty');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    setError('');
    try {
      const res = await axios.post('https://hook.kntz.it/catch/QUl1g9LRjB-kz5879-NvQ59Xk7po', {
        name: name,
        email: email,
      });
      setSuccess(true);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="w-screen h-screen overflow-hidden fixed z-[100] bg-black/30" onClick={() => set(false)}>
      <div
        className="bg-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md sm:w-[38rem] w-[90%] h-max flex flex-col justify-center text-lg font-poppinsRegular"
        onClick={e => e.stopPropagation()}
      >
        <div
          onClick={() => set(false)}
          className="absolute top-5 right-5 bg-white p-2 cursor-pointer rounded-full z-10"
        >
          <Image src={x} alt="x" className="w-3 h-3" />
        </div>

        <div className="grid grid-cols-3 items-center relative bg-black px-3 py-8 rounded-t-md">
          <div className="bg-white text-darkSecondary font-poppinsSemiBold w-max p-3 text-base -rotate-[2deg]">
            <p className="rotate-[2deg]">Hey, I&apos;m Aashish</p>{' '}
          </div>
          <Image src={pfp} alt="1" className="w-20 object-cover h-20 rounded-full mx-auto" />
          <p className="text-white col-span-3 p-1 text-lg mt-5">
            Each week I share research backed name ideas oriented content in <strong>my newsletter.</strong> <br />{' '}
            There are business, startup, and product name ideas. <br /> <strong>14k</strong> entrepreneurs read it.
            I&apos;d love you to join.
          </p>
          {error && (
            <span className="text-left text-sm translate-y-5 text-red-500 font-poppinsRegularItalic">* {error}</span>
          )}
        </div>

        {success ? (
          <div className="p-2 text-center text-green-600 m-2 bg-white">You are now subscribed to our newsletter!</div>
        ) : (
          <div className="sm:p-3 flex sm:flex-row flex-col pt-2 sm:space-x-2 space-x-0 sm:space-y-0 space-y-3">
            <input
              name="name"
              type="text"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="p-2 sm:w-[35%] w-full outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-2 sm:w-[45%] w-full outline-none"
            />
            <button
              onClick={() => addSubscriber()}
              className="text-center sm:w-[20%] w-full text-base border-black border-b-2 bg-darkSecondary sm:h-12 h-16 hover:bg-black/30 transition-all duration-300 ease-out text-white font-poppinsRegular"
            >
              Subscribe
            </button>
          </div>
        )}

        <div className="flex-col sm:flex hidden w-full justify-between items-start space-y-3 text-white px-3 pb-3 pt-5 rounded-b-md bg-black">
          <div className="flex justify-between items-center space-x-3">
            <Image
              src={p1}
              onClick={() => setActiveIndex(0)}
              alt="1"
              className={`${
                activeIndex == 0 && 'outline-white outline-2 outline'
              } w-16 h-16 hover:outline-secondary outline rounded-full cursor-pointer`}
            />
            <Image
              src={p2}
              onClick={() => setActiveIndex(1)}
              alt="1"
              className={`${
                activeIndex == 1 && 'outline-white outline-2 outline'
              } w-16 h-16 hover:outline-secondary outline rounded-full cursor-pointer`}
            />
            <Image
              src={p3}
              onClick={() => setActiveIndex(2)}
              alt="1"
              className={`${
                activeIndex == 2 && 'outline-white outline-2 outline'
              } w-16 h-16 hover:outline-secondary outline rounded-full cursor-pointer`}
            />
            <Image
              src={p4}
              onClick={() => setActiveIndex(3)}
              alt="1"
              className={`${
                activeIndex == 3 && 'outline-white outline-2 outline'
              } w-16 h-16 hover:outline-secondary outline rounded-full cursor-pointer`}
            />
            <Image
              src={p5}
              onClick={() => setActiveIndex(4)}
              alt="1"
              className={`${
                activeIndex == 4 && 'outline-white outline-2 outline'
              } w-16 h-16 hover:outline-secondary outline rounded-full cursor-pointer`}
            />
          </div>
          <div className="bg-white text-black p-2 w-full">
            <svg className="w-5 h-5" viewBox="0 0 26 28" data-name="quote-left">
              <path d="M12 15v6c0 1.656-1.344 3-3 3h-6c-1.656 0-3-1.344-3-3v-11c0-4.406 3.594-8 8-8h1c0.547 0 1 0.453 1 1v2c0 0.547-0.453 1-1 1h-1c-2.203 0-4 1.797-4 4v0.5c0 0.828 0.672 1.5 1.5 1.5h3.5c1.656 0 3 1.344 3 3zM26 15v6c0 1.656-1.344 3-3 3h-6c-1.656 0-3-1.344-3-3v-11c0-4.406 3.594-8 8-8h1c0.547 0 1 0.453 1 1v2c0 0.547-0.453 1-1 1h-1c-2.203 0-4 1.797-4 4v0.5c0 0.828 0.672 1.5 1.5 1.5h3.5c1.656 0 3 1.344 3 3z"></path>
            </svg>
            <p className="p-2">{testimonials[activeIndex].split('-')[0]}</p>
            <div className="ml-auto w-max px-2">-{testimonials[activeIndex].split('-')[1]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
