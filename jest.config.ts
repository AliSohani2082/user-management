import nextJest from "next/jest"

import type { Config } from "jest"

const createJestConfig = nextJest({ dir: "./" })

const customJestConfig: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!next-intl)/", // 👈 allow next-intl to be transformed
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/src/**/*.{test,spec}.{js,ts,jsx,tsx}",
    "<rootDir>/__tests__/**/*.{js,ts,jsx,tsx}",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
}

export default createJestConfig(customJestConfig)
