import React from "react";
import "./index.scss";
import AccessibilityLabel from "../AccessibilityLabel";

function SeeAllThumbnail(props) {
  const Tag = props.as;
  const remainingCount = props.remainingCount;

  return (
    <Tag className="see-all-thumbnail">
      <button className="button-access">
        <AccessibilityLabel>See all, {remainingCount} remaining project</AccessibilityLabel>
      </button>
      <div className="content" aria-hidden="true">
        <div className="cards-stack">
          <span className="card" />
          <span className="card" />
          <span className="card">
            <span className="remaining-count">
              {remainingCount}
            </span>
          </span>
        </div>
        <div className="text">
          <h3 className="title">See all</h3>
          <h4 className="subtitle">Remaining Projects</h4>
        </div>
      </div>
    </Tag>
  );
}

export default SeeAllThumbnail;
