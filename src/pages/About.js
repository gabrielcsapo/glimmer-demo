import {
  precompileTemplate,
  setComponentTemplate,
  templateOnlyComponent,
} from "@glimmer/core";

const About = setComponentTemplate(
  precompileTemplate(
    `
  <h1>About Page</h1>
  `,
    { strictMode: true }
  ),
  templateOnlyComponent()
);

export default About;
