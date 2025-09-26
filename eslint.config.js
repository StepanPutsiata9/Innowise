import js from "@eslint/js";
import reactNative from "@react-native/eslint-config";
import typescript from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  ...reactNative,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
    },
  },
  {
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    rules: {
      "react-native/no-unused-styles": "error",
      "react-native/split-platform-components": "warn",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "warn",
      "react-native/no-raw-text": "error",
    },
  },
];
