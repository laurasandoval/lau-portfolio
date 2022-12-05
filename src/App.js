import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DesignWorkSrc from "./Assets/design-work.json";
import ProjectsRouter from "./Pages/ProjectsRouter";

import "./App.scss";
import DesignWork from "./Pages/DesignWork";
import About from "./Pages/About";
import Balance from "./Pages/Balance";
import ScrollToTop from "./Components/ScrollToTop";
import BalancePrivacyPolicy from "./Pages/Balance/PrivacyPolicy";

import LatestResume from "./Assets/latest-resume.json";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={DesignWork} />
        <Route exact path="/about" component={About} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/balance/privacy-policy" component={BalancePrivacyPolicy} />
        <Route exact path="/balance/rate" component={() => { 
          window.location.replace("https://itunes.apple.com/app/id1532939978?action=write-review");
        }}/>
        <Route exact path="/balance/twitter" component={() => { 
          window.location.replace("https://twitter.com/BalanceAppCL");
        }}/>
        <Route exact path="/patreon" component={() => { 
          window.location.replace("https://patreon.com/laurasideral");
        }}/>
        <Route exact path="/resume" component={() => { 
          window.location.replace(`/resume/${LatestResume.filename}`)
        }}/>
        {DesignWorkSrc.DesignWork.map((project, index) => {
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
