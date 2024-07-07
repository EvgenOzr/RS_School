import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
  },
  { 
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } 
  },
  {
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
        "semi": "error",
        "no-unused-vars": "error",
        "no-undef": "error",
        "react-compiler/react-compiler": "error",
    }
  },
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];