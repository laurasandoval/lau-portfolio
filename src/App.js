import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Data from "./Assets/design-work.json";
import ProjectsRouter from "./Pages/ProjectsRouter";

import "./App.scss";
import DesignWork from "./Pages/DesignWork";
import About from "./Pages/About";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
