import React, { Component } from 'react';
import './SourceForm.css';

class SourceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: [],
    };

    this.carousel = React.createRef();
    this.carouselPage = 1;

    this.handleInputSource = this.handleInputSource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveSourceCarousel = this.moveSourceCarousel.bind(this);
    this.renderSourceList = this.renderSourceList.bind(this);

    this.isCarouselMoving = false;
  }

  handleInputSource(event) {
    const isChecked = event.target.checked;

    if (isChecked && this.state.sources.length === 20) {
      alert('Sorry, the maximun number of input sources is 20! :)');

      event.target.checked = false;
    } else {
      const sources = this.state.sources.slice();

      if (isChecked) {
        sources.push({
          name: event.target.name,
          id: event.target.id,
        });

        this.setState({sources});
      } else {
        sources.splice(sources.indexOf(event.target.name), 1);

        for (let i = 0; i < sources.length; i++) {
          if (sources[i].name === event.target.name) {
            sources.splice(i, 1);
            break;
          }
        }

        this.setState({
          sources
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.sources);

    this.props.closeForm();
  }

  moveSourceCarousel(ev) {
    if (!this.isCarouselMoving) {
      this.isCarouselMoving = true;

      const toLeft = ev.target.classList.contains('icon-to-right');
      const wrapperLeft = this.carousel.current.offsetLeft;

      if (toLeft && wrapperLeft >= -3500) {
        this.carousel.current.style.left = wrapperLeft - 1169 + 'px';
      } else if (!toLeft && wrapperLeft < 0) {
        this.carousel.current.style.left = wrapperLeft + 1169 + 'px';
      }

      setTimeout(() => { this.isCarouselMoving = false; }, 300);
    }
  }

  renderSourceList(sources) {
    const sourceLists = sources.map(source => {
      return <Source 
        name={source.name}
        key={source.id}
        id={source.id}
        handleInputSource={this.handleInputSource}
      />;
    });

    return sourceLists;
  }

  render() {
    return (
      <div className="source-wrapper">
          <i className="material-icons icon-to-left" onClick={this.moveSourceCarousel}>arrow_drop_down_circle</i>
          <i className="material-icons icon-to-right" onClick={this.moveSourceCarousel}>arrow_drop_down_circle</i>
        <form className="source-container" onSubmit={this.handleSubmit}>
          <div className="source-carousel" ref={this.carousel}>
          {this.props.sources.length !== 0 ? this.renderSourceList(this.props.sources) : 'loading..'}
          </div>
          <input className="btn-submit" type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

function Source({name, id, handleInputSource}) {
  return (
    <label className="checkbox-container">
      <input className="checkbox" type="checkbox" name={name} id={id} onChange={handleInputSource}></input>{name}
      <span className="checkmark"></span>
    </label>
  );
}

export default SourceForm;
