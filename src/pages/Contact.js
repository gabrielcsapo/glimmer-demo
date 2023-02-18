import {
  precompileTemplate,
  setComponentTemplate,
  templateOnlyComponent,
} from "@glimmer/core";

const Contact = setComponentTemplate(
  precompileTemplate(
    `

  <h1>Contact Page</h1>

  `,
    { strictMode: true }
  ),
  templateOnlyComponent()
);

export default Contact;
