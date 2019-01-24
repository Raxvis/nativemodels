module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**.{js,jsx}', '!**/node_modules/**'],
	coverageDirectory: './coverage/',
	coverageReporters: ['lcov'],
	reporters: ['default', 'jest-junit'],
	testPathIgnorePatterns: ['/node_modules/', '/site/'],
};
