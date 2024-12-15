import type { Config } from "jest";
import baseConfig from "@repo/jest-config/jest.config";

const config: Config = {
  ...baseConfig,
  moduleNameMapper: {
    ...(baseConfig.moduleNameMapper ?? {}),
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
