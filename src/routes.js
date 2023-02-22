import { renderComponent } from "@glimmerx/core";

import Home from "./pages/Home.gjs";
import Contact from "./pages/Contact.gjs";

let AboutRoute = null;

export default function (element) {
  return [
    {
      path: "about",
      handler: () => {
        element.innerHTML = "";
        renderComponent(AboutRoute, element);
      },
      hooks: {
        before: (done) => {
          console.log(`before about`);
          return import("./pages/About.gjs").then((module) => {
            AboutRoute = module.default;
            done();
          });
        },
      },
    },
    {
      path: "contact",
      handler: () => {
        element.innerHTML = "";
        renderComponent(Contact, element);
      },
    },
    {
      path: "*",
      handler: () => {
        console.log("hi");
        element.innerHTML = "";
        renderComponent(Home, element);
      },
    },
  ];
}
