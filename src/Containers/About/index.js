import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import GlobalHeader from "../../Components/GlobalHeader";

function About(props) {
  return (
    <Fragment>
      <Helmet>
        <title>Laura Sandoval — About</title>
      </Helmet>

      <GlobalHeader sticky />
      <h1>About</h1>
      <p>Hello there, the quick brown fox jumps over the lazy dog.</p>
    </Fragment>
  );
}

export default About;
