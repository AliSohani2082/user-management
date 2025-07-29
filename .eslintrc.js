/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["tailwindcss", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.js",
    },
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@next/next/no-html-link-for-pages": "off",
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-custom-classname": "off",
  },
  overrides: [
    {
      files: ["*.config.js", "*.config.cjs"],
      parserOptions: {
        project: null,
      },
    },
  ],
}
