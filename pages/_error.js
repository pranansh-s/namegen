import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Image from 'next/image';

const NotFound = require('../public/icons/404.svg');
const chevronIcon = require('../public/icons/chevronRight.svg');

const Custom404 = () => {
	const router = useRouter();
	return (
		<div>
			<Navbar />
			<div className="bg-options h-full min-h-screen items-center flex flex-col space-y-10 justify-center px-10 text-center">
				<h1 className="font-poppinsSemiBold lg:text-3xl text-2xl tracking-widest text-secondary">
					Page Not Found
				</h1>
				<Image
					src={NotFound}
					alt="404 Not Found"
					className="lg:w-[35rem] w-[25rem]"
				/>
				<h2 className="font-poppinsLight lg:text-lg text-sm">
					You didn&apos;t break the internet, but we can&apos;t find what you
					are looking for.
				</h2>
				<button
					onClick={() => router.push('/')}
					className="text-tertiary font-poppinsRegular bg-secondary shadow-md md:text-base text-sm py-3 flex justify-center items-center group pl-6 md:pr-14 pr-12 h-max w-max rounded-full relative">
					Go Home
					<Image
						src={chevronIcon}
						alt="chevronRight"
						className="absolute rotate-180 right-6 -translate-x-1/2 group-hover:right-8 transition-all duration-200 ease-out"
					/>
				</button>
			</div>
		</div>
	);
};

export const getInitialProps = ({ res, err }) => {
	if (res) {
		res.statusCode = 404;
	}
	return { statusCode: res ? res.statusCode : err ? err.statusCode : 404 };
};

export default Custom404;
