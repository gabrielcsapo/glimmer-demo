import routes from "./routes.js";
import Navigo from "navigo";

import Component from "@glimmer/component";

import {
  modifierCapabilities,
  precompileTemplate,
  setComponentTemplate,
  templateOnlyComponent,
  setModifierManager,
} from "@glimmer/core";

const LinkTo = setComponentTemplate(
  precompileTemplate(
    `
  <a href={{@route}} data-navigo>{{yield}}</a>
  `,
    { strictMode: true }
  ),
  templateOnlyComponent()
);

class CustomModifier {
  element;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  didInsertElement() {}
}

class NavigationModifier {
  capabilities = modifierCapabilities("3.22");

  constructor(owner) {
    this.owner = owner;
    this.router = new Navigo("/");
  }
  createModifier(factory) {
    return new factory(this.owner);
  }
  installModifier(instance, element, args) {
    instance.element = element;

    const navigoRoutes = routes(element);

    this.router.on(navigoRoutes).resolve();

    const { positional, named } = args;
    instance.didInsertElement(positional, named);
  }
  updateModifier(instance, args) {
    const { positional, named } = args;
    instance.didUpdate(positional, named);
  }
  destroyModifier(instance) {
    instance.willDestroyElement();
    this.router.destroy();
  }
}

setModifierManager((owner) => new NavigationModifier(owner), CustomModifier);

class RouterComponent extends Component {
  constructor() {
    super(arguments);

    console.log("hi", RouterComponent);
  }
}

const Router = setComponentTemplate(
  precompileTemplate(
    `
      <div id="glimmer-router-outlet" {{CustomModifier}}></div>
   `,
    { strictMode: true, scope: { CustomModifier } }
  ),
  RouterComponent
);

export { Router, LinkTo };
