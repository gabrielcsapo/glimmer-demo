import { renderComponent } from "@glimmerx/core";

let AboutRoute = null;
let ContactRoute = null;
let HomeRoute = null;

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
          if (AboutRoute) {
            done();
            return;
          }

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
        renderComponent(ContactRoute, element);
      },
      hooks: {
        before: (done) => {
          if (ContactRoute) {
            done();
            return;
          }

          return import("./pages/Contact.gjs").then((module) => {
            ContactRoute = module.default;
            done();
          });
        },
      },
    },
    {
      path: "*",
      handler: () => {
        console.log("hi");
        element.innerHTML = "";
        renderComponent(HomeRoute, element);
      },
      hooks: {
        before: (done) => {
          if (HomeRoute) {
            done();
            return;
          }

          return import("./pages/Home.gjs").then((module) => {
            HomeRoute = module.default;
            done();
          });
        },
      },
    },
  ];
}
