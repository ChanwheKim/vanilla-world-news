import React, { Component } from 'react';
import './Header.css';

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
    const { onChange } = this.props;

    return (
      <header>
        <h1 className="main-title">Vanilla Times</h1>
        <div className="main-pannel">
          <SearchBar onChange={onChange} onKeyDown={this.onEnterPressed} />
        </div>
      </header>
    );
  }
}

const SearchBar = ({ onChange, onKeyDown }) => {
  return (
    <div className="search-bar-wrapper">
      <i className="material-icons icon-search">search</i>
      <input
        className="search-bar"
        type="text"
        onChange={ev => onChange(ev.target.value)}
        onKeyDown={onKeyDown}
        placeholder='Search'
      />
    </div>
  );
};

export default Header;
