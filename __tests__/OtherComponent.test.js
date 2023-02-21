import OtherComponent from "../src/OtherComponent.gjs";
import { renderComponent } from "./util";

import { it, expect } from "vitest";

it("should work", async () => {
  const element = await renderComponent(OtherComponent);

  expect(element.innerHTML).toMatchInlineSnapshot(`
  "
      <b>Counter Val: </b>
    "
`);
});
