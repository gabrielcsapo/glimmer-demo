import { readFileSync } from "fs";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { transform } from "@babel/core";
import { precompile } from "@glimmer/compiler";
import glimmerXPreset from "@glimmerx/babel-preset";
import Inspect from "vite-plugin-inspect";

const {
  preprocessEmbeddedTemplates,
} = require("babel-plugin-htmlbars-inline-precompile");
const getTemplateLocalsRequirePath = require.resolve("@glimmer/syntax");

const TEMPLATE_TAG_CONFIG = {
  getTemplateLocalsRequirePath,
  getTemplateLocalsExportPath: "getTemplateLocals",

  templateTag: "template",
  templateTagReplacement: "GLIMMER_TEMPLATE",

  includeSourceMaps: true,
  includeTemplateTokens: true,
};

const TEMPLATE_LITERAL_CONFIG = {
  getTemplateLocalsRequirePath,
  getTemplateLocalsExportPath: "getTemplateLocals",

  importIdentifier: "hbs",
  importPath: "@glimmerx/component",

  includeSourceMaps: true,
  includeTemplateTokens: true,
};

const fileRegex = /\.(gjs)$/;

function glimmerPlugin() {
  return {
    name: "glimmer-plugin",
    load(id) {
      if (id.match(/\.(js|ts)$/)) {
        const source = readFileSync(id, "utf8");

        let { output } = preprocessEmbeddedTemplates(
          source,
          Object.assign({ relativePath: id }, TEMPLATE_LITERAL_CONFIG)
        );

        return transform(output, {
          filename: id,
          presets: [[glimmerXPreset, { __loadPlugins: true, precompile }]],
        });
      } else if (id.match(/\.(gjs|gts)$/)) {
        const source = readFileSync(id, "utf8");

        let { output } = preprocessEmbeddedTemplates(
          source,
          Object.assign({ relativePath: id }, TEMPLATE_TAG_CONFIG)
        );

        return transform(output, {
          filename: id,
          presets: [[glimmerXPreset, { __loadPlugins: true, precompile }]],
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    glimmerPlugin(),
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
