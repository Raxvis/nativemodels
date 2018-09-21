module.exports = (api) => {
	api.cache(false);

	return {
		plugins: ['@babel/plugin-proposal-object-rest-spread'],
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						browsers: '> 0.25%, not dead',
						node: '8',
					},
				},
			],
		],
	};
};
