import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import GlobalHeader from "../../Components/GlobalHeader";
import GenericContainer from "../../Components/GenericContainer";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import "./index.scss";

function About(props) {
  return (
    <Fragment>
      <Helmet>
        <title>About — Laura Sandoval</title>
      </Helmet>

      <GlobalHeader sticky />
      <GenericContainer className="about-page">
        <h1>
          <AccessibilityLabel>About — Laura Sandoval</AccessibilityLabel>
        </h1>
        <div className="hearts-animation">
          <span className="heart" role="img" aria-label="Floating Heart">
            💛
          </span>
          <span className="heart" role="img" aria-label="Floating Heart">
            💛
          </span>
          <span className="heart" role="img" aria-label="Floating Heart">
            💛
          </span>
        </div>
        <h2 className="big-statement">
          I like building digital products that people love—without them even
          noticing it.
        </h2>
        <p className="big-statement-subtitle">(Hopefully at least)</p>
        <div className="about-me-paragraphs">
          <p>
            Born in Perú 22 years ago. Moved to Chile 21 years ago. Then back to
            Perú 6 years ago. And back to Chile again in 2016.
          </p>
          <p>
            Studied Design at Pontificia Universidad Católica de Chile, and you
            know how it goes. Find more of that on my <a href={require("../../Assets/cv-files/LS_CV_en_Undefined2020.pdf")} target="_blank" rel="noopener noreferrer">Resume</a> :)
          </p>
        </div>
      </GenericContainer>
    </Fragment>
  );
}

export default About;
