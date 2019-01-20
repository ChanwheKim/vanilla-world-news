import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import ControlPanel from './ControlPanel';
import ListsWrapper from './Lists';
import Gellery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.dataLoading = false;
    this.state = {
      articles: [],
      sources: [],
      selectedSources: [],
      searchValue: '',
      page: 1,
      headlines: [],
      dates: {
        from: '',
        to: '',
      },
    };

    this.handleSource = this.handleSource.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.updateSelectedSource = this.updateSelectedSource.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.onDateValueChange = this.onDateValueChange.bind(this);
  }

  componentDidMount() {
    this.getSource();
    this.getTopHeadlines();
  }

  onSearchValueChange(text) {
    this.setState({
      searchValue: text,
      page: 1,
    });
  }

  onDateValueChange(newDate) {
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
    axios('https://newsapi.org/v2/top-headlines?country=us&apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52&pageSize=28')
      .then((response) => {
        console.log(response);
        this.setState({
          headlines: response.data.articles,
        })
      })
  }

  getArticles() {
    if (!this.dataLoading) {
      this.dataLoading = true;

      const sourcesSelected = this.state.selectedSources.reduce((acc, source) => {
        return `${acc}${source.id},`;
      }, '&sources=');

      const articleUrl = `https://newsapi.org/v2/everything?apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52&sortBY=popularity&pageSize=30&from=${this.state.dates.from}&to=${this.state.dates.to}&q=${this.state.searchValue}${sourcesSelected}&page=${this.state.page}`;

      axios(articleUrl)
        .then((response) => {
          this.setState((state) => {
            const articles = state.page !== 1 ? state.articles.concat(response.data.articles) : response.data.articles;

            return {
              articles,
              page: state.page + 1,
            };
          });

          this.dataLoading = false;
        })
        .catch((err) => {
          alert(err);
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
      page: 1,
      articles: [],
      sources,
    });
  }

  updateSelectedSource(selectedSources) {
    this.setState({
      selectedSources,
      page: 1,
    });
  }

  render() {
    return (
      <div className="App">
        <Header onChange={this.onSearchValueChange} onEnterDown={this.getArticles} />
        <ControlPanel
          sources={this.state.sources}
          selected={this.state.selectedSources}
          onSubmit={this.updateSelectedSource}
          onDateChange={this.onDateValueChange}
        />
        { this.state.headlines.length !== 0 && <Gellery headlines={this.state.headlines.slice(0, 14)}/> }
        {this.state.articles.length !== 0 ? <ListsWrapper articles={this.state.articles} onScroll={this.getArticles} /> : null }
      </div>
    );
  }
}

export default App;
