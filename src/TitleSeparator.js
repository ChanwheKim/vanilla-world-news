import React from 'react';

function TitleSeparator({ titleName }) {
  return (
    <div className="separator">
      <div className="separator-title">
        {
          titleName
        }
        <div className="separator__holder separator__left"></div>
        <div className="separator__holder separator__right"></div>
      </div>
    </div>
  );
}

export default TitleSeparator;
