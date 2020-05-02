import React from "react";
import "./index.scss";

function Grid(props) {
  return (
    <section className={`projects-grid ${props.featured === true && "featured"}`}>
      {props.children}
    </section>
  );
}

export default Grid;