import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
import base from "./base.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...pluginNext.configs.recommended.rules,
    },
  },
];
