import Component from "@glimmerx/component";

import "./App.css";

import { Router, LinkTo } from "./Router.gjs";

class App extends Component {
  <template>
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
  </template>
}

export default App;
