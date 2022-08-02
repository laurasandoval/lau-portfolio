import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import GlobalHeader from "../../Components/GlobalHeader";
import GenericContainer from "../../Components/GenericContainer";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import CVDataJSON from "../../Assets/cv-data.json";
import "./index.scss";

function About() {
  const Age = "24";
  const CVData = CVDataJSON;

  return (
    <Fragment>
      <Helmet>
        <title>About — Laura Sandoval</title>
      </Helmet>

      <GlobalHeader sticky />
      <GenericContainer className="about-page">
        <h2>
          <AccessibilityLabel>
            About — Laura Sandoval
          </AccessibilityLabel>
        </h2>
        <figure className="hearts-animation" role="img">
          <span
            className="heart"
            aria-hidden="true"
            role="img"
            aria-label="Floating Heart"
          >
            💛
          </span>
          <span
            className="heart"
            aria-hidden="true"
            role="img"
            aria-label="Floating Heart"
          >
            💛
          </span>
          <span
            className="heart"
            aria-hidden="true"
            role="img"
            aria-label="Floating Heart"
          >
            💛
          </span>
          <AccessibilityLabel as="figcaption">
            Animation of floating yellow hearts.
          </AccessibilityLabel>
        </figure>
        <h3 className="big-statement">
          I like building digital products that people love—without them even
          noticing it.
        </h3>
        <p className="big-statement-subtitle">(Hopefully at least)</p>
        <div className="about-me-paragraphs">
          <p role="text">
            Born in Peru {Age} years ago. Moved to Chile a year after that. Then
            back to Peru in 2014. And back to Chile again two years later. So
            here I am.
          </p>
          <p>
            I strive to design wonderful and accessible digital products that go
            unnoticed in day-to-day life, while staying true to their intended
            meaning. Currently doing that at Cornershop, an Uber-owned grocery
            delivery service that offers world-class digital products powered by
            software and design.
          </p>
          <p role="text">
            Taught myself to code, studied Design at Pontificia Universidad Católica de Chile, and you
            know how it goes. Find more of that on my{" "}
            <a
              href={require(`../../Assets/cv-files/${CVData.CV[0].filename}`)}
              rel="noopener noreferrer"
            >
              Résumé
            </a>
            {<AccessibilityLabel>.</AccessibilityLabel>} :-)
          </p>
          <AccessibilityLabel>
            <a
              href={require(`../../Assets/cv-files/${CVData.CV[0].filename}`)}
              rel="noopener noreferrer"
            >
              Résumé
            </a>
          </AccessibilityLabel>
        </div>
      </GenericContainer>
    </Fragment>
  );
}

export default About;
