import {
  renderComponent as glimmerRenderComponent,
  didRender,
} from "@glimmerx/core";

export async function renderComponent(component) {
  let options;

  const div = document.createElement("div");

  await glimmerRenderComponent(component, {
    element: div,
  });

  return div;
}

// Re-export didRender for convenience
export { didRender };
