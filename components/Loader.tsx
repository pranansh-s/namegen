import Image from 'next/image';

const loading = require('../public/loading.gif');

const Loader = () => {
	return (
		<div className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<Image src={loading} alt="Loading..." className="w-[8rem] h-[8rem]" />
		</div>
	);
};

export default Loader;
