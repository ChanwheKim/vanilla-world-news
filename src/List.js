import React, { Fragment } from 'react';

function List({ onViewIconClick, children, reference }) {
  return (
    <Fragment>
      <div className="list-control-pannel">
        <i className="material-icons icon-list" onClick={(ev) => {onViewIconClick(ev.target.classList)}}>format_list_bulleted</i>
        <i className="material-icons icon-grid" onClick={(ev) => {onViewIconClick(ev.target.classList)}}>grid_on</i>
      </div>
      <ul className="list-container" ref={reference}>
        {
          children
        }
      </ul>
    </Fragment>
  );
}

export default List;
