module.exports = {
  moduleNameMapper: {
    '@apptypes': '<rootDir>/src/types.ts',
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    '@ui/(.*)': '<rootDir>/src/ui/$1',
  },
  preset: 'ts-jest',
  restoreMocks: true,
  runner: 'jest-electron/runner',
  setupFiles: ['<rootDir>/dist/bundle.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jest-electron/environment',
  verbose: true,
};