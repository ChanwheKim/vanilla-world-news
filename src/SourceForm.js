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
    this.isCarouselMoving = false;

    this.handleInputSource = this.handleInputSource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveSourceCarousel = this.moveSourceCarousel.bind(this);
    this.renderSourceList = this.renderSourceList.bind(this);
  }

  handleInputSource(event) {
    const isChecked = event.target.checked;

    if (isChecked && this.state.sources.length === 20) {
      alert('Sorry, the maximun number of input sources is 20! :)');

      event.target.checked = false;
    } else {
      const sources = this.state.sources.slice();

      if (isChecked) {
        sources.push(event.currentTarget.dataset.idx);

        this.setState({
          sources,
        });
      } else {
        sources.splice(sources.indexOf(event.currentTarget.dataset.idx), 1);

        this.setState({
          sources,
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

  renderSourceList(sourcesData) {
    const sourceLists = sourcesData.map((source, idx) => {
      return (
        <label className="checkbox-container" key={source.id}>
          <input className="checkbox" type="checkbox" name={source.name} id={source.id} onChange={this.handleInputSource} data-idx={idx}></input>{source.name}
          <span className="checkmark"></span>
        </label>
      );
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
          {this.props.sourcesData.length !== 0 ? this.renderSourceList(this.props.sourcesData) : 'loading..'}
          </div>
          <input className="btn-submit" type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

export default SourceForm;
