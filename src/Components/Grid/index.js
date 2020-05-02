import React from "react";
import classNames from "classnames";
import "./index.scss";

function Grid(props) {
  return (
    <section className={classNames("projects-grid", {"featured": props.featured})}>
      {props.children}
    </section>
  );
}

export default Grid;