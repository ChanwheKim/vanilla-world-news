import React, { Fragment } from 'react';
import './Gallery.css';
import image from './defaul-img.jpg';

export default class Gellery extends React.Component {
  renderGalleryGrids() {
    return this.props.headlines.map((article, idx) => {
      return <GalleryGrid img={article.urlToImage} num={idx + 1} key={idx} title={article.title} />
    });
  }

  render() {
    return (
      <Fragment>
        <div className="separator">
          <div className="separator-title">
            The Headlines
            <div className="separator__holder separator__left"></div>
            <div className="separator__holder separator__right"></div>
          </div>
        </div>
        <section className='gallery'>
          { this.props.headlines.length !== 0 &&
            this.renderGalleryGrids() }
        </section>
      </Fragment>
    );
  }
}

function GalleryGrid({ title, img, num }) {
  return (
    <figure className={`gallery__item gallery__item--${num}`}>
      <img src={img || image} className="gallery__img" alt="gallery img" />
      <span className="healine-title">{title}</span>
    </figure>
  );
}
