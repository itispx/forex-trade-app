/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  collectCoverage: true,
  coverageReporters: ["text"],
  setupFiles: ["./setupTests.ts"],
};
