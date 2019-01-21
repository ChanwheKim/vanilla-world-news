import React, { Component } from 'react';
import SourceForm from './SourceForm';
import './ControlPanelContainer.css';

class ControlPanelContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSourceList: false,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.toggleSourceList = this.toggleSourceList.bind(this);
  }

  onDateChange(ev) {
    this.props.onDateChange({
      type: ev.target.className,
      date: ev.target.value,
    });
  }

  toggleSourceList() {
    this.setState((state) => {
      return {
        showSourceList: !state.showSourceList,
      };
    });
  }

  renderSelectedSources() {
    const { sourcesSelected } = this.props;
    const selection = sourcesSelected.map((source) => {
      return <SelectedSources key={source.id} name={source.name} onSourceDeleteClick={this.props.onSourceDeleteClick} />;
    });

    return selection;
  }

  render() {
    const { sources, onSubmit, sourcesSelected } = this.props;
    const { showSourceList } = this.state;

    return (
      <ControlPanel onDateChange={this.onDateChange} onSourceBtnClick={this.toggleSourceList}>
        {
          sourcesSelected.length !== 0 &&
          this.renderSelectedSources()
        }
        {
          showSourceList &&
          <SourceForm
            sources={sources}
            onSubmit={onSubmit}
            closeForm={this.toggleSourceList}
          />
        }
      </ControlPanel>
    );
  }
}

function ControlPanel({ onDateChange, onSourceBtnClick, children }) {
  return (
    <div className="control-display-panel">
      <div className="calendar">
        <input type="date" className="date-from" onChange={onDateChange} />
        <input type="date" className="date-end" onChange={onDateChange} />
      </div>
      <div className="source-selection-wrapper">
        <div className="source-selection" onClick={onSourceBtnClick}>
          <span className="label-icon-source">News Source</span>
          <i className="material-icons">playlist_add_check</i>
        </div>
        <div className="sources-selected">
          {
            children
          }
        </div>
      </div>
    </div>
  );
}

function SelectedSources({ name, onSourceDeleteClick }) {
  return (
    <div className="selected-sources" data-name={name} onClick={(ev) => onSourceDeleteClick(ev.currentTarget.dataset.name)}>
      {name}
      <i className="material-icons icon-delete">close</i>
    </div>
  );
}

export default ControlPanelContainer;
