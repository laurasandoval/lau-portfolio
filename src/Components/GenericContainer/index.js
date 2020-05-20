import React from "react";
import "./index.scss";

function GenericContainer(props) {
  const Tag = props.as ? props.as : "div";
  return <Tag className={`generic-container ${props.className}`}>{props.children}</Tag>;
}

export default GenericContainer;
