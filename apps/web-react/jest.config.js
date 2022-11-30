module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};
