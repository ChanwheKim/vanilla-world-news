import React from 'react';
import './ArticleModal.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }
  componentDidMount() {
    window.document.body.style.position = 'fixed';
    window.document.body.style.width = '100%';
  }

  componentWillUnmount() {
    window.document.body.style.position = 'static';
    window.document.body.style.width = 'auto';
  }

  onBackgroundClick(ev) {
    const isBackground = (ev.target.classList.contains('modal-background') || ev.target.classList.contains('icon-modal-close'));

    if (isBackground) {
      this.props.onBackgroundClick();
    }
  }

  render() {
    return (
      <div onClick={this.onBackgroundClick} className="modal-background">
        <i className="material-icons icon-modal-close">close</i>
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}
