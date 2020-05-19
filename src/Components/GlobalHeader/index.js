import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import AccessibilityLabel from "../AccessibilityLabel";

class GlobalHeader extends React.Component {
  constructor(props) {
    super(props);

    this._toggleNav = this._toggleNav.bind(this);
    this.state = {
      navOpen: false,
    };
  }

  _toggleNav() {
    this.setState((prevState) => ({
      navOpen: !prevState.navOpen,
    }));
  }

  render() {
    const { sticky } = this.props;
    return (
      <header className="global-header" data-sticky={sticky}>
        <div className="header-content">
          <div className="top-bar">
            <div
              className="sopaipilla-menu"
              aria-hidden="true"
              data-open={this.state.navOpen}
            >
              <button className="toggle" onClick={this._toggleNav}>
                <AccessibilityLabel>
                  {this.navOpen === true ? "Close" : "Open"} menu
                </AccessibilityLabel>
              </button>
              <span className="sopaipilla top">
                <span className="inner-sopaipilla"></span>
              </span>
              <span className="sopaipilla bottom">
                <span className="inner-sopaipilla"></span>
              </span>
            </div>
            <h1>
              <NavLink exact to="/">
                Laura Sandoval
              </NavLink>
            </h1>
          </div>
          <nav data-open={this.state.navOpen}>
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
}

export default GlobalHeader;
