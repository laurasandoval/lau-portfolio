import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import DesignWork from "./Containers/DesignWork";
import About from "./Containers/About";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <DesignWork />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
