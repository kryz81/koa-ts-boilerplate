module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  setupFiles: ['./jest.setup.js'],
  collectCoverageFrom: ['src/**/*.{ts,js}'],
};
