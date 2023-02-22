import routes from "./routes.js";
import Navigo from "navigo";

import Component from "@glimmerx/component";

import {
  modifierCapabilities,
  setComponentTemplate,
  setModifierManager,
} from "@glimmerx/core";

const LinkTo = <template><a href={{@route}} data-navigo>{{yield}}</a></template>

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

    navigoRoutes.forEach(r => {
      this.router.on(r.path, r.handler, r.hooks).resolve();
    });

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

class Router extends Component {
  constructor() {
    super(arguments);
  }
  <template>
    <div id="glimmer-router-outlet" {{CustomModifier}}></div>
  </template>
}

export { Router, LinkTo };
