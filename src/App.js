import React, { Fragment } from "react";
import "./App.scss";
import GlobalHeader from "./Components/GlobalHeader";
import AccessibilityLabel from "./Components/AccessibilityLabel";
import DesignWork from "./Containers/DesignWork";

function App() {
  return (
    <Fragment>
      <GlobalHeader />
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <DesignWork />
    </Fragment>
  );
}

export default App;
