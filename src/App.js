import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import ControlPanel from './ControlPanel';
import ListsWrapper from './Lists';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      sources: [],
      selectedSources: [],
      sourceDisplayMode: false,
      searchValue: '',
      dates: {
        from: '',
        to: '',
      },
    };

    this.handleSource = this.handleSource.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.updateSelectedSource = this.updateSelectedSource.bind(this);
    this.toggleSourceContainer = this.toggleSourceContainer.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.onDateValueChange = this.onDateValueChange.bind(this);
  }

  componentDidMount() {
    this.getSource();
  }

  onSearchValueChange(text) {
    this.setState({
      searchValue: text,
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

  getArticles() {
    const from = this.state.dates.from ? `&from=${this.state.dates.from}` : '';
    const to = this.state.dates.to ? `&to=${this.state.dates.to}` : '';
    const searchValue = `&q=${this.state.searchValue}`;
    const sourcesSelected = this.state.selectedSources.reduce((acc, source) => {
      return `${acc}${source.id},`;
    }, '&sources=');
    const articleUrl = `https://newsapi.org/v2/everything?apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52&sortBY=popularity&pageSize=30${from}${to}${searchValue}${sourcesSelected}`;

    axios(articleUrl)
      .then((response) => {
        console.log(response);
        this.setState({
          articles: response.data.articles,
        });
      });
  }

  handleSource(response) {
    const sources = response.data.sources.map(source => {
      return {
        id: source.id,
        name: source.name,
      };
    });

    this.setState({ sources });
  }

  updateSelectedSource(selectedSources) {
    this.setState({
      selectedSources,
    });
  }

  toggleSourceContainer() {
    const sourceDisplayMode = this.state.sourceDisplayMode ? false : true;
    this.setState({ sourceDisplayMode });
  }

  render() {
    return (
      <div className="App">
        <Header onChange={this.onSearchValueChange} onEnterDown={this.getArticles} />
        <ControlPanel
          sources={this.state.sources}
          onSourceIconClick={this.toggleSourceContainer}
          sourceDisplayMode={this.state.sourceDisplayMode}
          selected={this.state.selectedSources}
          onSubmit={this.updateSelectedSource}
          onDateChange={this.onDateValueChange}
        />
        {this.state.articles.length !== 0 ? <ListsWrapper articles={this.state.articles} /> : null }
      </div>
    );
  }
}

export default App;
