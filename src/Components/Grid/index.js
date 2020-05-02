import React from "react";
import "./index.scss";

function Grid(props) {
  return (
    <section className="grid">
      {props.children}
    </section>
  );
}

export default Grid;