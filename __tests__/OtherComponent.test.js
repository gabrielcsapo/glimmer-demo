import OtherComponent from "../src/OtherComponent.gjs";
import { render, didRender } from "./util";

import { hbs } from "@glimmerx/component";
import { it, expect } from "vitest";

it("should work", async () => {
  const element = await render(OtherComponent);

  expect(element.innerHTML).toMatchSnapshot();
  expect(didRender()).toBeTruthy();
});

it("should work with args", async () => {
  const element = await render(OtherComponent, {
    args: {
      count: 10,
    },
  });

  expect(element.innerHTML).toMatchSnapshot();
  expect(didRender()).toBeTruthy();
});

it("should compile template tags", async () => {
  const element = await render(
    <template>
      <OtherComponent @count=10 />
    </template>
  );
  console.log(element.innerHTML);
  expect(element.innerHTML).toMatchSnapshot();
  expect(didRender()).toBeTruthy();
});

it("should compile hbs backtick", async () => {
  const element = await render(hbs`
    <OtherComponent @count=10 />
  `);
  console.log(element.innerHTML);
  expect(element.innerHTML).toMatchSnapshot();
  expect(didRender()).toBeTruthy();
});
