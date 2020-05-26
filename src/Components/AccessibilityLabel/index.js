import React from "react";
import "./index.scss";

function AccessibilityLabel(props) {
  const Tag = props.as ? props.as : "span";
  return (
    <Tag className="visually-hidden" role={props.role}>
      {props.children}
    </Tag>
  );
}

export default AccessibilityLabel;
