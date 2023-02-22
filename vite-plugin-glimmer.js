import { readFileSync } from "fs";
import { transform } from "@babel/core";
import { precompile } from "@glimmer/compiler";
import glimmerXPreset from "@glimmerx/babel-preset";

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

export default function glimmerPlugin() {
  return {
    name: "glimmer-plugin",
    enforce: "pre",
    load(id) {
      console.log(id, id.match(/\.(gjs|gts|js|ts)$/));
      if (id.match(/\.(gjs|gts|js|ts)$/)) {
        console.log("parsing", id);
        const source = readFileSync(id, "utf8");

        let { output: outputTemplate } = preprocessEmbeddedTemplates(
          source,
          Object.assign({ relativePath: id }, TEMPLATE_TAG_CONFIG)
        );

        let { output } = preprocessEmbeddedTemplates(
          outputTemplate,
          Object.assign({ relativePath: id }, TEMPLATE_LITERAL_CONFIG)
        );

        return transform(output, {
          filename: id,
          presets: [[glimmerXPreset, { __loadPlugins: true, precompile }]],
        });
      }
    },
  };
}
