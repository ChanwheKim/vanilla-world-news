import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.onEnterPressed = this.onEnterPressed.bind(this);
  }

  onEnterPressed(ev) {
    if (ev.keyCode === 13) {
      this.props.onEnterDown();
    }
  }

  render() {
    return (
      <header>
        <h1 className="main-title">Vanilla Times</h1>
        <div className="main-pannel">
          <div className="search-bar-wrapper">
            <i className="material-icons icon-search">search</i>
            <input
              className="search-bar"
              type="text"
              onChange={ev => this.props.onChange(ev.target.value)}
              onKeyDown={this.onEnterPressed}
              placeholder="Search"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  onChange: PropTypes.func,
  onEnterDown: PropTypes.func,
};
