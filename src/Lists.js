import React, { Component } from 'react';
import ArticleModal from './ArticleModal';
import './Lists.css';

class ListsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayType: 'list',
      showModal: false,
      selectedArticle: {},
    };

    this.listRef = React.createRef();

    this.onIconClick = this.onIconClick.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.handleModalPopUp = this.handleModalPopUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    const listHeight = this.listRef.current.offsetHeight;
    const yOffSet = window.pageYOffset;
    const paginationHeight = listHeight - 700;

    if (paginationHeight <= yOffSet) {
      this.props.onScroll();
    }
  }

  toggleModalState() {
    this.setState((state) => {
      return { showModal: !state.showModal };
    });
  }

  handleModalPopUp(ev) {
    const selectedArticle = this.props.articles[parseInt(ev.currentTarget.dataset.idx)];
    console.log(selectedArticle);
    if (this.state.showModal) {
      this.setState((state) => {
        return { showModal: !state.showModal };
      });
    } else {
      this.setState((state) => {
        return {
          showModal: !state.showModal,
          selectedArticle,
        };
      });
    }
  }

  renderArticleLists() {
    const articles = this.props.articles.map((article, idx) => {
      return <List
        article={article}
        key={article.title + article.author + idx}
        type={this.state.displayType}
        onClick={this.handleModalPopUp}
        index={idx}
      />;
    });

    return articles;
  }

  onIconClick(ev) {
    const displayType = ev.target.classList.contains('icon-list') ? 'list' : 'card';

    this.setState({
      displayType
    });
  }

  render() {
    const article = this.state.selectedArticle;
    return (
      <div>
        <div className="separator news-list-title">
          <div className="separator-title">
            News List
            <div className="separator__holder separator__left"></div>
            <div className="separator__holder separator__right"></div>
          </div>
        </div>

        <div className="list-control-pannel">
          <i className="material-icons icon-list" onClick={this.onIconClick}>format_list_bulleted</i>
          <i className="material-icons icon-grid" onClick={this.onIconClick}>grid_on</i>
        </div>
        <ul className="list-container" ref={this.listRef}>
          {this.props.articles.length !== 0 ? this.renderArticleLists() : null}
        </ul>
        { this.state.showModal &&
          <ArticleModal onBackgroundClick={this.toggleModalState}>
            <div className="popup-info">
              <img className="popup-img" src={article.urlToImage}/>
              <span>Author : {article.author}</span>
              <span>Published : {article.publishedAt}</span>
              <span>Source : {article.source.name}</span>
            </div>
            <div className="popup-content">
              <h1 className="popup-title">{article.title}</h1>
              <div className="popup-article">
                <div className="popup-description">{article.description}</div>
                <div className="popup-text">{article.content}</div>
              </div>
              <a className="popup-url" href={article.url}><p>{article.url}</p></a>
            </div>
          </ArticleModal>
        }
      </div>
    );
  }
}

function List({ article, type, onClick, index }) {
  return (
    <li className={type} onClick={onClick} data-idx={index}>
      <div className="article-info">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-description">{article.description}</p>
        <div className="extra-info">
          <span>{article.source.name}</span>
          <span>{article.author}</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
      <img className="article-img" src={article.urlToImage} alt={article.source.name} />
    </li>
  );
}

export default ListsWrapper;
