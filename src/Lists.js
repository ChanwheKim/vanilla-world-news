import React, { Component } from 'react';
import './Lists.css';

class ListsWrapper extends Component {
  renderArticleLists() {
    const articles = this.props.articles.map((article, idx) => {
      return <List article={article} key={article.title} />;
    });

    return articles;
  }

  render() {
    return (
      <ul className="list-container">
        {this.props.articles.length !== 0 ? this.renderArticleLists() : null}
      </ul>
    );
  }
}

function List({article}) {
  return (
    <li className="list">
      <div className="article-info">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-description">{article.description}</p>
        <div className="extra-info">
          <span>{article.source.name}</span>
          <span>{article.author}</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
      <img className="article-img" src={article.urlToImage}></img>
    </li>
  );
}

export default ListsWrapper;
