import React, { Component, Fragment } from 'react';
import ArticleModal from './ArticleModal';
import './Lists.css';
import defaultImage from './defaul-img.jpg';
import TitleSeparator from './TitleSeparator';

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

  onIconClick(classNames) {
    const displayType = classNames.contains('icon-list') ? 'list' : 'card';

    this.setState({
      displayType,
    });
  }

  toggleModalState() {
    this.setState((state) => {
      return {
        showModal: !state.showModal,
      };
    });
  }

  handleOnScroll(ev) {
    const listHeight = this.listRef.current.offsetHeight;
    const yOffSet = window.pageYOffset;
    const paginationHeight = listHeight - 700;

    if (paginationHeight <= yOffSet) {
      this.props.onScroll(ev.type);
    }
  }

  handleModalPopUp(ev) {
    const selectedArticle = this.props.articles[parseInt(ev.currentTarget.dataset.idx)];

    if (this.state.showModal) {
      this.setState((state) => {
        return {
          showModal: !state.showModal,
        };
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
      return <Article
        article={article}
        key={article.title + article.author + idx}
        type={this.state.displayType}
        onClick={this.handleModalPopUp}
        index={idx}
      />;
    });

    return articles;
  }

  render() {
    const article = this.state.selectedArticle;

    return (
      <Fragment>
        <TitleSeparator titleName="News List" />

        <List onViewIconClick={this.onIconClick} reference={this.listRef}>
          {
            this.props.articles.length !== 0 &&
            this.renderArticleLists()
          }
        </List>

        {
          this.state.showModal &&
          <ArticleModal onBackgroundClick={this.toggleModalState}>
            <div className="popup-info">
              <img className="popup-img" src={article.urlToImage} alt={article.title} />
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
              <a target="_blank" className="popup-url" href={article.url}><p>{article.url}</p></a>
            </div>
          </ArticleModal>
        }
      </Fragment>
    );
  }
}

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

function Article({ article, type, onClick, index }) {
  const img = {
    backgroundImage: `url(${article.urlToImage}), url(${defaultImage})`,
    backgroundSize: 'cover',
  };

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
      <div className="article-img" style={img} alt={article.title} />
    </li>
  );
}

export default ListsWrapper;
