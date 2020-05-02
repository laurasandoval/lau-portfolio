import React, { Fragment } from "react";
import "./App.scss";
import GlobalHeader from "./Components/GlobalHeader";
import AccessibilityLabel from "./Components/AccessibilityLabel";
import DesignProjects from "./Containers/DesignProjects";

function App() {
  return (
    <Fragment>
      <GlobalHeader />
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <DesignProjects />
    </Fragment>
  );
}

export default App;
