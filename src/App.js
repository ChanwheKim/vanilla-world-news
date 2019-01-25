import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import ControlPanelContainer from './ControlPanelContainer';
import ListsContainer from './ListsContainer';
import HeadlineGallery from './HeadlineGallery';
import Loader from './Loader';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.prevSourcesSelected = '';
    this.prevSearchTerm = '';

    this.state = {
      searchTerm: '',
      articlesData: [],
      sourcesData: [],
      selectedSourcesIdx: [],
      headlines: [],
      requestInProgress: false,
      searchStartAt: '',
      searchEndAt: '',
      page: 1,
    };

    this.saveSourceData = this.saveSourceData.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.updateSelectedSource = this.updateSelectedSource.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.onToDateUpdate = this.onToDateUpdate.bind(this);
    this.onFromDateUpdate = this.onFromDateUpdate.bind(this);
    this.deleteSource = this.deleteSource.bind(this);
    this.requestArticles = this.requestArticles.bind(this);
  }

  componentDidMount() {
    this.getSourceData();
    this.getTopHeadlines();
  }

  onSearchValueChange(searchTerm) {
    this.setState({
      searchTerm,
    });
  }

  onToDateUpdate(searchEndAt) {
    this.setState({
      searchEndAt,
    });
  }

  onFromDateUpdate(searchStartAt) {
    this.setState({
      searchStartAt,
    });
  }

  getSourceData() {
    const sourceUrl = 'https://newsapi.org/v2/sources?apiKey=f0c91f036f9b4acbae1c3cff3164e95b';

    axios(sourceUrl)
      .then(this.saveSourceData)
      .catch(err => alert('Sorry, something went wrong during getting data.'));
  }

  getTopHeadlines() {
    axios('https://newsapi.org/v2/top-headlines?country=us&apiKey=f0c91f036f9b4acbae1c3cff3164e95b&pageSize=14')
      .then((response) => {
        this.setState({
          headlines: response.data.articles,
        });
      })
      .catch((err) => alert('Sorry, something went wrong during getting headlines'));
  }

  getArticles(isScrollEvent) {
    if (this.state.requestInProgress) {
      return;
    }

    let searchTerm = '';
    let sources = '';

    this.setState({
      requestInProgress: true,
    });

    if (isScrollEvent) {
      searchTerm = this.prevSearchTerm;
      sources = this.prevSourcesSelected;

      this.requestArticles(searchTerm, sources);
    } else {
      searchTerm = this.state.searchTerm;
      sources = this.state.selectedSourcesIdx.reduce((acc, index) => `${acc}${this.state.sourcesData[index].id},`, '&sources=');

      this.setState({
        page: 1,
      },() => {
        this.requestArticles(searchTerm, sources);
      });
    }
  }

  requestArticles(searchTerm, sources) {
    const articleUrl = `https://newsapi.org/v2/everything?apiKey=f0c91f036f9b4acbae1c3cff3164e95b&sortBY=popularity&pageSize=30&from=${this.state.searchStartAt}&to=${this.state.searchEndAt}&q=${searchTerm}${sources}&page=${this.state.page}`;

    axios(articleUrl)
      .then((response) => {
        const newArticles = formatDate(response.data.articles);

        this.setState((state) => {
          const articlesData = this.state.page !== 1 ? state.articlesData.concat(newArticles) : newArticles;

          return {
            articlesData,
            requestInProgress: false,
            page: state.page + 1,
          };
        }, () => {
          this.prevSearchTerm = searchTerm;
          this.prevSourcesSelected = sources;
        });
      })
      .catch((err) => alert('Sorry, something went wrong during getting news data. Could you try it again?'));
  }

  saveSourceData(response) {
    const sourcesData = response.data.sources.map(({ id, name}) => ({ id, name }));

    this.setState({
      sourcesData,
      articlesData: [],
    });
  }

  deleteSource(sourceIndex) {
    const selectedSourcesIdx = this.state.selectedSourcesIdx.slice();

    selectedSourcesIdx.splice(selectedSourcesIdx.indexOf(sourceIndex), 1);

    this.setState({  
      selectedSourcesIdx,
    });
  }

  updateSelectedSource(selectedSourcesIdx) {
    this.setState({
      selectedSourcesIdx,
    });
  }

  render() {
    return (
      <div className="App">
        <Header onChange={this.onSearchValueChange} onEnterDown={this.getArticles} />
        {
          this.state.sourcesData.length !== 0 &&
          <ControlPanelContainer
            sourcesData={this.state.sourcesData}
            sourcesSelected={this.state.selectedSourcesIdx}
            onSourceSubmit={this.updateSelectedSource}
            onToDateChange={this.onToDateUpdate}
            onFromDateChange={this.onFromDateUpdate}
            onSourceDeleteClick={this.deleteSource}
          />
        }
        {
          this.state.headlines.length !== 0 &&
          <HeadlineGallery headlines={this.state.headlines} />
        }
        {
          this.state.articlesData.length > 0 &&
          <ListsContainer articles={this.state.articlesData} onScroll={this.getArticles} />
        }
        {
          this.state.requestInProgress &&
          <Loader />
        }
        <Footer />
      </div>
    );
  }
}

export default App;

function formatDate(articles) {
  return articles.map((article) => {
    article.publishedAt = article.publishedAt.slice(0, 10);

    return article;
  });
}
