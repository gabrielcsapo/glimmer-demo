import {
  renderComponent as glimmerRenderComponent,
  didRender,
} from "@glimmerx/core";

export async function renderComponent(component, renderingOptions = {}) {
  let options;

  const div = document.createElement("div");

  await glimmerRenderComponent(component, {
    element: div,
    ...renderingOptions,
  });

  return div;
}

// Re-export didRender for convenience
export { didRender };
