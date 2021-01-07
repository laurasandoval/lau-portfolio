import React from "react";
import { NavLink } from "react-router-dom";
import { throttle } from "lodash";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import "./index.scss";
import AccessibilityLabel from "../AccessibilityLabel";
import DesignWork from "../../Assets/design-work.json";
import CVDataJSON from "../../Assets/cv-data.json";
import ProjectThumbnail from "../ProjectThumbnail";

class GlobalHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this._updateSearchQuery = this._updateSearchQuery.bind(this);
    this._openSearch = this._openSearch.bind(this);
    this._escapeKeyPress = this._escapeKeyPress.bind(this);
    this._closeSearch = this._closeSearch.bind(this);
    this._toggleNav = this._toggleNav.bind(this);
    this._showHeaderBorder = this._showHeaderBorder.bind(this);
    this._hideHeaderBorder = this._hideHeaderBorder.bind(this);
    this.state = {
      navOpen: false,
      searchOpen: false,
      showHeaderBorder: false,
      searchQuery: "",
      headerMarginBottom: undefined,
    };
    this.searchField = React.createRef();
    this.searchResults = React.createRef();
  }

  componentDidMount() {
    const headerMarginBottom = window
      .getComputedStyle(this.headerElement)
      .getPropertyValue("margin-bottom")
      .replace("px", "");
    this.setState({ headerMarginBottom });
    window.addEventListener("scroll", this._throttledScrollCheck);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._throttledScrollCheck);
    clearAllBodyScrollLocks();
  }

  _throttledScrollCheck = throttle(() => {
    window.scrollY > this.state.headerMarginBottom
      ? this._showHeaderBorder()
      : this._hideHeaderBorder();
  }, 250);

  _showHeaderBorder() {
    this.setState({
      showHeaderBorder: true,
    });
  }

  _hideHeaderBorder() {
    this.setState({
      showHeaderBorder: false,
    });
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

    disableBodyScroll(this.searchResults.current);
    this.searchField.current.focus();
    document.body.addEventListener("keydown", this._escapeKeyPress);
  }

  _escapeKeyPress(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      this.searchField && this.searchField.current.blur();
      this._closeSearch();
      document.body.removeEventListener("keydown", this._escapeKeyPress);
    }
  }

  _closeSearch() {
    setTimeout(() => {
      this.setState({
        searchOpen: false,
        searchQuery: "",
      });

      enableBodyScroll(this.searchResults.current);
    }, 200);
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

    const CVData = CVDataJSON;

    return (
      <header
        className="global-header"
        data-sticky={sticky}
        data-search-open={this.state.searchOpen}
        data-show-border={
          this.state.showHeaderBorder === true
            ? sticky
              ? "true"
              : "false"
            : this.state.searchOpen
            ? "true"
            : "false"
        }
        ref={(headerElement) => {
          this.headerElement = headerElement;
        }}
      >
        <div className="header-content">
          <div className="top-bar">
            <div className="sopaipilla-menu" data-open={this.state.navOpen}>
              <button
                className="toggle"
                onClick={this._toggleNav}
                aria-hidden="true"
              >
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
            <h1 aria-hidden={this.state.navOpen}>
              <AccessibilityLabel>Laura Sandoval</AccessibilityLabel>
              <NavLink className="nav-item" exact to="/" aria-hidden="true">
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
                  Work
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
                <a
                  className="nav-item"
                  href={require(`../../Assets/cv-files/${CVData.CV[0].filename}`)}target="_blank"
                  rel="noopener noreferrer"
                >
                  Résumé
                </a>
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
              <label htmlFor="search-field" className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                  <path
                    fillRule="nonzero"
                    d="M6.5 0A6.5 6.5 0 0113 6.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 016.5 13a6.5 6.5 0 110-13m0 2C4 2 2 4 2 6.5S4 11 6.5 11 11 9 11 6.5 9 2 6.5 2z"
                  />
                </svg>
              </label>
              <input
                id="search-field"
                className="search-field"
                type="search"
                placeholder="Search"
                value={this.state.searchQuery}
                onChange={this._updateSearchQuery}
                onFocus={this._openSearch}
                onBlur={this._closeSearch}
                ref={this.searchField}
                autoComplete="off"
                spellCheck="false"
              />
              <div className="cancel-button-container" aria-hidden={this.state.searchOpen ? "false" : "true"}>
                <label
                  htmlFor="search-field"
                  className="search-field-placeholder"
                ></label>
                <button className="cancel-button">Cancel</button>
              </div>
            </div>
            <div className="search-results">
              <ul ref={this.searchResults}>
                {searchResults.slice(0, 5).map((result, i) => {
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
        <div className="translucent-overlay" />
      </header>
    );
  }
}

export default GlobalHeader;
