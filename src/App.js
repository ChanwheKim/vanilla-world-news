import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import ControlPanelContainer from './ControlPanelContainer';
import ListsWrapper from './ListsWrapper';
import HeadlineGallery from './HeadlineGallery';
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
      articlesData: [],
      sourcesData: [],
      selectedSources: [],
      headlines: [],
      dataLoading: false,
      dates: {
        from: '',
        to: '',
      },
    };

    this.saveSourceData = this.saveSourceData.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.updateSelectedSource = this.updateSelectedSource.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.deleteSource = this.deleteSource.bind(this);
  }

  componentDidMount() {
    this.getSourceData();
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
      .catch((err) => {
        alert('Sorry, something went wrong during getting headlines');
      });
  }

  getArticles(isScrollEvent) {
    if (!this.dataLoading) {
      let searchTerm = '';
      let sources = '';

      this.dataLoading = true;
      this.setState({
        dataLoading: true,
      });

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

      const articleUrl = `https://newsapi.org/v2/everything?apiKey=f0c91f036f9b4acbae1c3cff3164e95b&sortBY=popularity&pageSize=30&from=${this.state.dates.from}&to=${this.state.dates.to}&q=${searchTerm}${sources}&page=${this.page}`;

      axios(articleUrl)
        .then((response) => {
          let newArticles = response.data.articles;

          newArticles = formatDate(newArticles);

          this.setState((state) => {
            const articlesData = this.page !== 1 ? state.articlesData.concat(newArticles) : newArticles;

            return {
              articlesData,
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

  saveSourceData(response) {
    const sourcesData = response.data.sources.map(source => {
      return {
        id: source.id,
        name: source.name,
      };
    });

    this.setState({
      sourcesData,
      articlesData: [],
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
          sourcesData={this.state.sourcesData}
          sourcesSelected={this.state.selectedSources}
          onSourceSubmit={this.updateSelectedSource}
          onDateChange={this.onDateChange}
          onSourceDeleteClick={this.deleteSource}
        />
        {
          this.state.headlines.length !== 0 &&
          <HeadlineGallery headlines={this.state.headlines} />
        }
        {
          this.state.articlesData.length > 0 &&
          <ListsWrapper articles={this.state.articlesData} onScroll={this.getArticles} />
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
