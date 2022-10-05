import React from "react";
import "./index.scss";

function Callout(props) {
  return (
    <div className="callout-container">
      <div className="callout">
        {props.children}
      </div>
    </div>
  );
}

export default Callout;