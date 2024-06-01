import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '$coverage',
  coverageProvider: 'v8',
};

export default jestConfig;
