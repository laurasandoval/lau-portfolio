import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <Fragment>
      <header>
        <h1>Laura Sandoval</h1>
        <nav>
          <ul>
            <li>Design</li>
            <li>Photography</li>
            <li>About</li>
            <li>Get in Touch</li>
          </ul>
        </nav>
      </header>
      <h2 class="visuallyhidden">Selected Works</h2>
    </Fragment>
  );
}

export default App;
