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
    const sources = this.state.sources.slice();
    const isChecked = event.target.checked;

    if (isChecked) {
      sources.push({
        name: event.target.name,
        id: event.target.id,
      });
    } else {
      sources.splice(sources.indexOf(event.target.name), 1);

      for (let i = 0; i < sources.length; i++) {
        if (sources[i].name === event.target.name) {
          sources.splice(i, 1);
          break;
        }
      }
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
      <input className="checkbox" type="checkbox" name={name} id={id} onChange={handleInputChange}></input>{name}
      <span className="checkmark"></span>
    </label>
  );
}

export default SourceForm;
