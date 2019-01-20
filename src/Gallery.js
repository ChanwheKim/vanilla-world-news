import React from 'react';
import './Gallery.css';
import image from './defaul-img.jpg';

export default class Gellery extends React.Component {
  renderGalleryGrids() {
    const topArticles = this.props.headlines.map((article, idx) => {
      return <GalleryGrid img={article.urlToImage} num={idx + 1} key={idx} title={article.title} />
    });

    return topArticles;
  }

  render() {
    return (
      <React.Fragment>
        <div className="separator">
          <div className="separator-title">
            The Headlines
            <div className="separator__holder separator__left"></div>
            <div className="separator__holder separator__right"></div>
          </div>
        </div>
        <section className='gallery'>
          { this.props.headlines ? this.renderGalleryGrids() : 'not' }
        </section>
      </React.Fragment>
    );
  }
}

function GalleryGrid({title, img, num}) {
  return (
    <figure className={`gallery__item gallery__item--${num}`}>
      <img src={img || image} className="gallery__img" alt="gallery img" />
      <span className="healine-title">{title}</span>
    </figure>
  );
}
