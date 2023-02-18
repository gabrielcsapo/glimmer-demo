import Component from "@glimmer/component";
import { precompileTemplate, setComponentTemplate } from "@glimmer/core";

import "./App.css";

import { Router, LinkTo } from "./Router.js";

class App extends Component {}

setComponentTemplate(
  precompileTemplate(
    `
    <html>
      <header>
        <nav>
          <ul>
            <li><LinkTo @route="/">Home</LinkTo></li>
            <li><LinkTo @route="about">About</LinkTo></li>
            <li><LinkTo @route="contact">Contact</LinkTo></li>
          </ul>
        </nav>
      </header>
      <main>
          <Router/>
      </main>
    </html>
    `,
    { strictMode: true, scope: { Router, LinkTo } }
  ),
  App
);

export default App;
