import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import ControlPanelContainer from './ControlPanelContainer';
import ListsWrapper from './ListsWrapper';
import Gallery from './Gallery';
import Loader from './Loader';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.dataLoading = false;
    this.searchTerm = '';
    this.page = 1;
    this.prevSourcesSelected = '';
    this.prevSearchTerm = '';

    this.state = {
      articles: [],
      sources: [],
      selectedSources: [],
      headlines: [],
      dataLoading: false,
      dates: {
        from: '',
        to: '',
      },
    };

    this.handleSource = this.handleSource.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.updateSelectedSource = this.updateSelectedSource.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.deleteSource = this.deleteSource.bind(this);
  }

  componentDidMount() {
    this.getSource();
    this.getTopHeadlines();
  }

  onSearchValueChange(text) {
    this.searchTerm = text;
  }

  onDateChange(newDate) {
    const dates = JSON.parse(JSON.stringify(this.state.dates));

    if (newDate.type === 'date-from') {
      dates.from = newDate.date;
    } else {
      dates.end = newDate.date;
    }

    this.setState({
      dates,
    });
  }

  getSource() {
    const sourceUrl = 'https://newsapi.org/v2/sources?apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52';

    axios(sourceUrl)
      .then(this.handleSource)
      .catch(err => alert(err));
  }

  getTopHeadlines() {
    axios('https://newsapi.org/v2/top-headlines?country=us&apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52&pageSize=14')
      .then((response) => {
        this.setState({
          headlines: response.data.articles,
        });
      })
      .catch((err) => {
        alert('Sorry, something went wrong during getting headlines');
      });
  }

  getArticles(isScrollEvent) {
    if (!this.dataLoading) {
      let searchTerm = '';
      let sources = '';

      this.dataLoading = true;

      if (isScrollEvent) {
        searchTerm = this.prevSearchTerm;
        sources = this.prevSourcesSelected;
      } else {
        searchTerm = this.searchTerm;
        sources = this.state.selectedSources.reduce((acc, source) => {
          return `${acc}${source.id},`;
        }, '&sources=');

        this.page = 1;
      }

      console.log('Ajax request', 'page is: ', this.page, 'searchTerm is', searchTerm);
      console.log('sources are ', sources);

      const articleUrl = `https://newsapi.org/v2/everything?apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52&sortBY=popularity&pageSize=30&from=${this.state.dates.from}&to=${this.state.dates.to}&q=${searchTerm}${sources}&page=${this.page}`;

      axios(articleUrl)
        .then((response) => {
          let news = response.data.articles;

          news = formatDate(news);

          this.setState((state) => {
            const articles = this.page !== 1 ? state.articles.concat(news) : news;

            return {
              articles,
              dataLoading: false,
            };
          }, () => {
            this.page += 1;
            this.dataLoading = false;
            this.prevSearchTerm = searchTerm;
            this.prevSourcesSelected = sources;
          });
        })
        .catch((err) => {
          alert('Sorry, something went wrong during getting news data. Could you try it again?');
        });
    }

    function formatDate(articles) {
      return articles.map((article) => {
        article.publishedAt = article.publishedAt.slice(0, 10);

        return article;
      });
    }
  }

  handleSource(response) {
    const sources = response.data.sources.map(source => {
      return {
        id: source.id,
        name: source.name,
      };
    });

    this.setState({
      sources,
      articles: [],
    });
  }

  deleteSource(name) {
    const selectedSources = this.state.selectedSources.slice();

    for (let i = 0; i < selectedSources.length; i++) {
      if (selectedSources[i].name === name) {
        selectedSources.splice(i, 1);
      }
    }

    this.setState({
      selectedSources,
    });
  }

  updateSelectedSource(selectedSources) {
    this.setState({
      selectedSources,
    });
  }

  render() {
    return (
      <div className="App">
        <Header onChange={this.onSearchValueChange} onEnterDown={this.getArticles} />
        <ControlPanelContainer
          sources={this.state.sources}
          selected={this.state.selectedSources}
          onSubmit={this.updateSelectedSource}
          onDateChange={this.onDateChange}
          onSourceDeleteClick={this.deleteSource}
        />
        {
          this.state.headlines.length !== 0 &&
          <Gallery headlines={this.state.headlines} />
        }
        {
          this.state.articles.length > 0 &&
          <ListsWrapper articles={this.state.articles} onScroll={this.getArticles} />
        }
        {
          this.state.dataLoading &&
          <Loader />
        }
        <Footer />
      </div>
    );
  }
}

export default App;
