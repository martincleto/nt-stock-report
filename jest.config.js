module.exports = {
  moduleNameMapper: {
    '@apptypes': '<rootDir>/src/types.ts',
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    '@test/(.*)': '<rootDir>/test/$1',
    '@ui/(.*)': '<rootDir>/src/ui/$1',
  },
  preset: 'ts-jest',
  restoreMocks: true,
  runner: 'jest-electron/runner',
  setupFiles: ['<rootDir>/public/bundle.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  testEnvironment: 'jest-electron/environment',
};