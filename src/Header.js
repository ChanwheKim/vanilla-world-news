import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="main-pannel">
          <input className="search-bar" type="text"></input>
        </div>
      </header>
    );
  }
}

export default Header;
