import { renderComponent } from "@glimmerx/core";

import Home from "./pages/Home.gjs";
import About from "./pages/About.gjs";
import Contact from "./pages/Contact.gjs";

export default function (element) {
  return {
    about: () => {
      element.innerHTML = "";
      renderComponent(About, element);
    },
    contact: () => {
      element.innerHTML = "";
      renderComponent(Contact, element);
    },
    "*": () => {
      console.log("hi");
      element.innerHTML = "";
      renderComponent(Home, element);
    },
  };
}
