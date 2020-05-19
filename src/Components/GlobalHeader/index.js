import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

function GlobalHeader(props) {
  return (
    <header className="global-header" data-sticky={props.sticky}>
      <div className="header-content">
        <h1>
          <NavLink exact to="/">
            Laura Sandoval
          </NavLink>
        </h1>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="active" exact to="/">
                Design
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/about">
                Photography
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/about">
                Get in Touch
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default GlobalHeader;
