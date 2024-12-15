import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@repo/jest-config/jest-setup.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less)$": "@fusion/jest-config/__mocks__/styleMock.js",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["node_modules\\/(?!(.*@dfds-ui\\/icons))"],
};

export default config;
