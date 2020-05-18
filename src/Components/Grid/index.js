import React from "react";
import "./index.scss";

function Grid(props) {
  return (
    <section className="projects-grid" data-featured={props.featured}>
      {props.children}
    </section>
  );
}

export default Grid;