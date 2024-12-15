import nextJest from "next/jest";
import baseConfig from "./jest.config.js";

const createJestConfig = nextJest({
  dir: "./",
});

export default createJestConfig({
  ...baseConfig,
  testEnvironment: "jsdom",
});
