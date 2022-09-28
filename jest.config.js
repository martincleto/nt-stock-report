module.exports = {
  preset: 'ts-jest',
  runner: 'jest-electron/runner',
  setupFiles: ['./dist/bundle.js'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testEnvironment: 'jest-electron/environment',
};