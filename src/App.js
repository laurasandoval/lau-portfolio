import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Header from "./Components/Header";
import Grid from "./Components/Grid";
import AccessibilityLabel from "./Components/AccessibilityLabel";

function App() {
  return (
    <Fragment>
      <Header/>
      <AccessibilityLabel as="h2">
        Selected Works
      </AccessibilityLabel>
      <Grid />
    </Fragment>
  );
}

export default App;
