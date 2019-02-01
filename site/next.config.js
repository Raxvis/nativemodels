const {
	env: { NODE_ENV },
} = process;

module.exports = {
	assetPrefix: NODE_ENV === 'production' ? '/' : '',
	exportPathMap: () => ({
		'/': { page: '/' },
		'/404.html': { page: '/_error' },
		'/docs': { page: '/docs' },
		'/getting-started': { page: '/getting-started' },
	}),
};
