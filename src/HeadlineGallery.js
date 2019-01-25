import React, { Fragment } from 'react';
import './HeadlineGallery.css';
import image from './defaul-img.jpg';
import TitleSeparator from './TitleSeparator';
import PropTypes from 'prop-types';

export default class HeadlineGallery extends React.Component {
  renderGalleryGrids() {
    return this.props.headlines.map((article, idx) => {
      return (
        <figure key={article.title + idx} className={`gallery__item gallery__item--${idx + 1}`}>
          <img src={article.urlToImage || image} className="gallery__img" alt="gallery img" />
          <span className="healine-title">{article.title}</span>
        </figure>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <TitleSeparator titleName="The Headlines" />
        <section className='gallery'>
          {
            this.props.headlines.length !== 0 &&
            this.renderGalleryGrids()
          }
        </section>
      </Fragment>
    );
  }
}

HeadlineGallery.propTypes = {
  headlines: PropTypes.array,
};
