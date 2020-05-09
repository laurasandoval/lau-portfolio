import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

function GlobalHeader(props) {
  return (
    <header className="global-header">
      <div className="header-content-container">
        <div className="header-content">
          <h1>
            <Link to="/">Laura Sandoval</Link>
          </h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Work</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default GlobalHeader;
