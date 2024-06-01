const jestConfig = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '$coverage',
  coverageProvider: 'v8',
};
export default jestConfig;
