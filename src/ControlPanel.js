import React, { Component } from 'react';
import SourceForm from './SourceForm';
import './ControlPanel.css';

class ControlPanel extends Component {
  renderSelectedSources(selection) {
    const selected = selection.map(id => {
      return <SelectedSources id={id} key={id} />;
    });

    return selected;
  }

  render() {
    

    return (
      <React.Fragment>
        <div className="control-display-panel">
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

function SelectedSources({id}) {
  return (
    <div className="selected-sources">
      {id}
      <i className="material-icons icon-delete">close</i>
    </div>
  );
}

export default ControlPanel;
