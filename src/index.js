import { renderComponent } from "@glimmerx/core";

import App from "./App.gjs";
import LocaleService from "./services/LocaleService.js";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const element = document.getElementById("app");
    renderComponent(App, {
      element: element,
      owner: {
        services: {
          locale: new LocaleService("en_US"),
        },
      },
    });
  },
  { once: true }
);
