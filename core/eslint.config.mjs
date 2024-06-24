import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.cjs"],
    ignores: ["./babel.config.cjs"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.node,
        module: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "no-console": "warn",
      "prefer-const": "error",
    },
  },
  {
    files: ["test/**/*"],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
