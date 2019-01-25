import React from 'react';

function ControlPanel({ onFromDateChange, onToDateChange, onSourceBtnClick, children }) {
  return (
    <div className="control-display-panel">
      <div className="calendar">
        <input type="date" className="date-from" onChange={(ev) => onFromDateChange(ev.target.value)} />
        <input type="date" className="date-end" onChange={(ev) => onToDateChange(ev.target.value)} />
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

export default ControlPanel;
