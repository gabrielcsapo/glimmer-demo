import OtherComponent from "../src/OtherComponent.gjs";
import { render } from "./util";

import { it, expect } from "vitest";

it("should work", async () => {
  const element = await render(OtherComponent);

  expect(element.innerHTML).toMatchInlineSnapshot(`
  "
      <b>Counter Val: </b>
    "
`);
});

it("should work with args", async () => {
  const element = await render(OtherComponent, {
    args: {
      count: 10,
    },
  });

  expect(element.innerHTML).toMatchInlineSnapshot(`
        "
            <b>Counter Val: 10</b>
          "
      `);
});
