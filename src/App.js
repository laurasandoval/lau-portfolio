import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Data from "./Assets/design-work.json";
import ProjectsRouter from "./Containers/ProjectsRouter";

import "./App.scss";
import DesignWork from "./Containers/DesignWork";
import About from "./Containers/About";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DesignWork} />
        <Route exact path="/about" component={About} />
        {Data.DesignWork.map((project, index) => {
          return (
            <Route
              exact
              path={`/${project.src}`}
              key={index}
              render={() => <ProjectsRouter {...project} />}
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
