/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/react-app-env.d.ts",
    "!src/setupTests.ts",
    "!src/server/index.ts",
    "!src/server/startServer.ts",
    "!src/loadEnvironments.ts",
    "!src/database/connectDatabase.ts",
    "!src/server/cors.ts",
  ],
  testEnvironmentVariables: {
    NODE_ENV: "test",
  },
};
