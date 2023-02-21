import { defineConfig } from "vite";
import glimmer from "./vite-plugin-glimmer";
import babel from "vite-plugin-babel";
import Inspect from "vite-plugin-inspect";

export default defineConfig({
  plugins: [
    glimmer(),
    babel({
      filter: /.*\.(js|ts|jsx|tsx|gjs)$/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          "@babel/plugin-proposal-class-properties",
        ],
      },
    }),
    Inspect({
      build: true,
      outputDir: ".vite-inspect",
    }),
  ],
});
