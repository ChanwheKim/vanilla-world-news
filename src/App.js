import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import ControlPanel from './ControlPanel';


const apiKey = 'ff15c5d7dadb4d318d1c4c7a170c4e52';
const sourceUrl = 'https://newsapi.org/v2/sources?apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52';
const articleUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52`;
const specificArticleUrl = 'https://newsapi.org/v2/everything?sources=bbc-news&apiKey=ff15c5d7dadb4d318d1c4c7a170c4e52';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      selectedSources: [],
      sourceDisplayMode: false,
    };

    this.handleSource = this.handleSource.bind(this);
  }

  componentDidMount() {
    this.getSource();
  }
  
  getSource() {
    axios(sourceUrl)
    .then(this.handleSource)
    .catch(err => alert(err))
  }

  handleSource(response) {
    const sources = response.data.sources.map(source => {
      return {
        id: source.id,
        name: source.name
      };
    });

    this.setState({sources});
  }

  updateSelectedSource(selectedSources) {
    this.setState({
      selectedSources
    });
  }

  toggleSourceContainer() {
    const sourceDisplayMode = this.state.sourceDisplayMode ? false : true;

    this.setState({sourceDisplayMode});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ControlPanel
          sources={this.state.sources}
          onSourceIconClick={this.toggleSourceContainer.bind(this)}
          sourceDisplayMode={this.state.sourceDisplayMode}
          selected={this.state.selectedSources}
          onSubmit={this.updateSelectedSource.bind(this)}
        />
      </div>
    );
  }
}

export default App;




  // getArticles() {
  //   axios(specificArticleUrl)
  //   .then(response => console.log(response))
  // }
