module.exports = {
  rootDir: __dirname,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  setupFiles: ['<rootDir>/config/jest/setupTests.js'],
  globalSetup: '<rootDir>/config/jest/globalSetup.js',
  globalTeardown: '<rootDir>/config/jest/globalTeardown.js',
  collectCoverageFrom: ['src/**/*.{ts,js}'],
};
