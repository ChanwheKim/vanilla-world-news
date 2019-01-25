import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="lds-ring">
        {
          new Array(4).fill(<div></div>)
        }
      </div>
    </div>
  );
}

export default Loader;
