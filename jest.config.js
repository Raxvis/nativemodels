module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: './coverage/',
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: ['/node_modules/', '/site/'],
};
