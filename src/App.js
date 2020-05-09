import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Data from "./Assets/design-work.json";
import ProjectsIndex from "./Containers/ProjectsIndex";

import "./App.scss";
import DesignWork from "./Containers/DesignWork";
import About from "./Containers/About";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DesignWork} />
        <Route exact path="/about" component={About} />
        {Data.DesignWork.map((item, index) => {
          return (
            <Route
              exact
              path={`/${item.src}`}
              key={index}
              render={() => <ProjectsIndex project_src={item.src} />}
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
