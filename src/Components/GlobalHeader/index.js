import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import AccessibilityLabel from "../AccessibilityLabel";
import DesignWork from "../../Assets/design-work.json";
import ProjectThumbnail from "../ProjectThumbnail";

class GlobalHeader extends React.Component {
  constructor(props) {
    super(props);

    this.searchField = React.createRef();
    this._updateSearchQuery = this._updateSearchQuery.bind(this);
    this._openSearch = this._openSearch.bind(this);
    this._closeSearch = this._closeSearch.bind(this);
    this._toggleNav = this._toggleNav.bind(this);
    this.state = {
      navOpen: false,
      searchOpen: false,
      searchQuery: "",
    };
  }

  _updateSearchQuery(event) {
    this.setState({
      searchQuery: event.target.value.substr(0, 100).toLowerCase(),
    });
  }

  _openSearch() {
    this.setState({
      searchOpen: true,
    });
    this.searchField.current.focus();
    document.body.addEventListener("keydown", (e) => {
      if(e.key === "Escape" || e.key === "Esc") {
        this._closeSearch();
      }
    })
  }

  _closeSearch() {
    setTimeout(() => {
      this.setState({
        searchOpen: false,
      });
    }, 100);
    setTimeout(() => {
      this.setState({
        searchQuery: "",
      });
    }, 1000);
  }

  _toggleNav() {
    this.setState((prevState) => ({
      navOpen: !prevState.navOpen,
    }));
  }

  render() {
    const { sticky } = this.props;
    let searchResults = DesignWork.DesignWork.filter((project) => {
      return this.state.searchQuery.length
        ? project.title.toLowerCase().indexOf(this.state.searchQuery) !== -1
        : null;
    });

    return (
      <header
        className="global-header"
        data-sticky={sticky}
        data-search-open={this.state.searchOpen}
      >
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
              <NavLink className="nav-item" exact to="/">
                Laura Sandoval
              </NavLink>
            </h1>
          </div>
          <nav data-open={this.state.navOpen}>
            <ul>
              <li>
                <NavLink
                  className="nav-item"
                  activeClassName="active"
                  exact
                  to="/"
                >
                  Design
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-item"
                  activeClassName="active"
                  exact
                  to="/about"
                >
                  Photography
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-item"
                  activeClassName="active"
                  exact
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-item"
                  activeClassName="active"
                  exact
                  to="/about"
                >
                  Get in Touch
                </NavLink>
              </li>
              <li className="search-button" onClick={this._openSearch}>
                <span className="nav-item">Search</span>
              </li>
            </ul>
          </nav>
          <div
            className="search-box-container"
            data-open={this.state.searchOpen}
          >
            <div className="search-container">
              <input
                className="search-bar-input"
                type="search"
                placeholder="Search"
                value={this.state.searchQuery}
                onChange={this._updateSearchQuery}
                onFocus={this._openSearch}
                onBlur={this._closeSearch}
                ref={this.searchField}
              />
              <div className="search-results">
                <ul>
                  {searchResults.map((result, i) => {
                    return (
                      <li key={i}>
                        <ProjectThumbnail
                          {...result}
                          thumbnail={result.thumbnails[0]}
                          hover
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default GlobalHeader;
