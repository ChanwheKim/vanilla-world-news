import React, { Component } from 'react';
import './SourceForm.css';

export class SourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sources: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    let sources = this.state.sources.slice();
    const isChecked = event.target.checked;

    if (isChecked) {
      sources.push(event.target.id);
    } else if(sources.includes(event.target.id)) {
      sources.splice(sources.indexOf(event.target.id), 1);
    }
    
    this.setState({sources});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.sources);
  }

  renderSourceLists(sources) {
    const sourceLists = sources.map(source => {
      return <Source name={source.name} key={source.id} id={source.id} handleInputChange={this.handleInputChange} />;
    });

    return sourceLists;
  }

  render() {
    return (
      <form className="source-container" onSubmit={this.handleSubmit}>
        {this.props.sources.length !== 0 ? this.renderSourceLists(this.props.sources) : 'loading'}
        <input className="btn-submit" type="submit" value="submit" />
      </form>
    );
  }
}

function Source({name, id, handleInputChange}) {
  return (
    <label className="checkbox-container">
      <input className="checkbox" type="checkbox" id={id} onChange={handleInputChange}></input>{name}
      <span className="checkmark"></span>
    </label>
  );
}

export default SourceForm;
