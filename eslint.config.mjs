import { FlatCompat } from "@eslint/eslintrc";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["commitlint.config.js", "commitlint.config.mjs"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.config({
    extends: ["prettier"],
    plugins: ["prettier"], // Removido "@typescript-eslint" porque ya está incluido
    // Removido parser y parserOptions porque Next.js ya los configura

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
    },
  }),
];

export default eslintConfig;
