import { renderComponent, didRender } from "@glimmerx/core";

export async function render(component, renderingOptions = {}) {
  const div = document.createElement("div");

  await renderComponent(component, {
    element: div,
    ...renderingOptions,
  });

  return div;
}

// Re-export didRender for convenience
export { didRender };
