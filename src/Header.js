import React, { Component } from 'react';
import './Header.css';

const SearchBar = ({ onChange, onKeyDown }) => {
  return <input className="search-bar" type="text" onChange={ev => onChange(ev.target.value)} onKeyDown={onKeyDown} />;
};

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
        <div className="main-pannel">
          <SearchBar onChange={this.props.onChange} onKeyDown={this.onEnterPressed} />
        </div>
      </header>
    );
  }
}

export default Header;
