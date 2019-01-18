import React, { Component } from 'react';
import SourceForm from './SourceForm';
import './ControlPanel.css';

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
  }

  renderSelectedSources(selection) {
    const selected = selection.map(source => {
      return <SelectedSources key={source.id} name={source.name} />;
    });

    return selected;
  }

  onDateChange(ev) {
    this.props.onDateChange({
      type: ev.target.className,
      date: ev.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="control-display-panel">
          <div className="calendar">
            <input type="date" className="date-from" onChange={this.onDateChange} />
            <input type="date" className="date-end" onChange={this.onDateChange} />
          </div>
          <div className="source-selection-wrapper">
            <div className="source-selection" onClick={this.props.onSourceIconClick}>
              <span className='label-icon-source'>News Source</span>
              <i className="material-icons">playlist_add_check</i>
            </div>
            <div className="sources-selected">
              {this.props.selected.length !== 0 ? this.renderSelectedSources(this.props.selected) : null }
            </div>
          </div>

          <div className={this.props.sourceDisplayMode ? "source-wrapper" : "source-wrapper inactive"}>
            <SourceForm sources={this.props.sources} onSubmit={this.props.onSubmit} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function SelectedSources({name}) {
  return (
    <div className="selected-sources">
      {name}
      <i className="material-icons icon-delete">close</i>
    </div>
  );
}

export default ControlPanel;
