import React from "react";
import "./index.scss";

function GlobalHeader(props) {
  return (
    <header className="global-header">
      <div className="header-content-container">
        <div className="header-content">
          <h1><a href="/">Laura Sandoval</a></h1>
          <nav>
            <ul>
              <li>Design</li>
              <li>Photography</li>
              <li>About</li>
              <li>Get in Touch</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default GlobalHeader;
