import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

function GlobalHeader(props) {
  return (
    <header className="global-header" data-sticky={props.sticky}>
      <div className="header-content-container">
        <div className="header-content">
          <h1>
            <NavLink exact to="/">Laura Sandoval</NavLink>
          </h1>
          <nav>
            <ul>
              <li>
                <NavLink activeClassName="active" exact to="/">Work</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" exact to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default GlobalHeader;
