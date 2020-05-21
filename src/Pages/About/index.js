import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { differenceInYears } from "date-fns";
import GlobalHeader from "../../Components/GlobalHeader";
import GenericContainer from "../../Components/GenericContainer";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import "./index.scss";

function About(props) {
  const Age = differenceInYears(
    new Date(new Date().getFullYear(), 7, 5),
    new Date(1998, 7, 5)
  );
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
            Born in Perú {Age} years ago. Moved to Chile a year after that. Then
            back to Perú in 2014. And back to Chile again two years later. So
            here I am.
          </p>
          <p>
            I strive to design wonderful and accessible digital products that go
            unnoticed in day-to-day life, while staying true to their intended
            meaning. Currently doing that at Cornershop, a Uber-owned grocery
            delivery service that offers world-class digital products powered by
            software and design.
          </p>
          <p>
            Studied Design at Pontificia Universidad Católica de Chile, and you
            know how it goes. Find more of that on my{" "}
            <a
              href={require("../../Assets/cv-files/LS_CV_en_Undefined2020.pdf")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>{" "}
            :-)
          </p>
        </div>
      </GenericContainer>
    </Fragment>
  );
}

export default About;
