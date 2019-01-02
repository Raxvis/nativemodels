module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**.{js,jsx}', '!**/node_modules/**'],
	coverageDirectory: './coverage/',
	coverageReporters: ['lcov'],
	testPathIgnorePatterns: ['/node_modules/', '/site/'],
};
