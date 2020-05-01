import React from "react";
import "./index.scss";

function AccessibilityLabel(props) {
  const Tag = props.as;
  return (
    <Tag className="visuallyhidden">
      {props.children}
    </Tag>
  );
}

export default AccessibilityLabel;
