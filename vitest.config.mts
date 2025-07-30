import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    deps: {
      inline: ["next-intl"],
    },
    globals: true,
    environment: "jsdom",
    alias: {
      "^@/(.*)$": "/src/$1",
    },
    setupFiles: "./setupTests.ts",
  },
});
