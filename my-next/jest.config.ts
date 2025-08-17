import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
const config: Config = {
  preset: 'ts-jest', 
  testEnvironment: 'jsdom',
   setupFiles: ['<rootDir>/testGlobalSetup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'], 
  transformIgnorePatterns: ['node_modules/(?!next-intl)/'],
extensionsToTreatAsEsm: ['.ts', '.tsx'],
transform: {
  '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
},
  moduleNameMapper: {
 
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
     ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },

};

export default config;
