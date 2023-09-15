const RegisterTrademark = () => {
	return <div></div>;
};

export async function getServerSideProps(context) {
	const router = context.res;

	router.writeHead(307, {
		Location:
			'https://shareasale.com/r.cfm?b=2222896&u=2077681&m=53954&urllink=&afftrack=',
	});
	router.end();

	return {
		props: {},
	};
}

export default RegisterTrademark;
