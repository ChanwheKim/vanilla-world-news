import React from 'react';
import PropTypes from 'prop-types';

function SelectedSources({ name, sourceIdx, onSourceDeleteClick }) {
  return (
    <div className="selected-sources" data-source-idx={sourceIdx} onClick={(ev) => onSourceDeleteClick(ev.currentTarget.dataset.sourceIdx)}>
      {name}
      <i className="material-icons icon-delete">close</i>
    </div>
  );
}

export default SelectedSources;

SelectedSources.propTypes = {
  name: PropTypes.string,
  onSourceDeleteClick: PropTypes.func,
};
