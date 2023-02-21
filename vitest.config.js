/// <reference types="vitest" />
import { defineConfig } from "vite";

import glimmer from "./vite-plugin-glimmer";

export default defineConfig({
  plugins: [glimmer()],
  test: {
    environment: "happy-dom",
  },
});
