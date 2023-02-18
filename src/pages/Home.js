import {
  precompileTemplate,
  setComponentTemplate,
  templateOnlyComponent,
} from "@glimmer/core";

const Home = setComponentTemplate(
  precompileTemplate(
    `
  <h1>Home Page</h1>
  `,
    { strictMode: true }
  ),
  templateOnlyComponent()
);

export default Home;
