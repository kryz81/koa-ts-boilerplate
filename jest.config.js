module.exports = {
  rootDir: __dirname,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  setupFiles: ['<rootDir>/config/jest/setupTests.ts'],
  globalSetup: '<rootDir>/config/jest/globalSetup.js',
  globalTeardown: '<rootDir>/config/jest/globalTeardown.js',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
};
