import React from "react";
import "./index.scss";

function SopaipillaMenu(props) {
  return (
    <div className="sopaipilla-menu" aria-hidden="true">
      <span className="sopaipilla top">
        <span className="inner-sopaipilla"></span>
      </span>
      <span className="sopaipilla bottom">
        <span className="inner-sopaipilla"></span>
      </span>
    </div>
  );
}

export default SopaipillaMenu;
