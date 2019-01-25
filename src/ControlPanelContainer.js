import React, { Component } from 'react';
import SourceForm from './SourceForm';
import './ControlPanelContainer.css';
import ControlPanel from './ControlPanel';
import PropTypes from 'prop-types';
import SelectedSources from './SelectedSources';

class ControlPanelContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSourceList: false,
    };

    this.toggleSourceList = this.toggleSourceList.bind(this);
  }

  toggleSourceList() {
    this.setState((state) => ({ showSourceList: !state.showSourceList }));
  }

  renderSelectedSources() {
    const selection = this.props.sourcesSelected.map((index) => {
      return <SelectedSources key={index} name={this.props.sourcesData[index].name} onSourceDeleteClick={this.props.onSourceDeleteClick} sourceIdx={index} />;
    });

    return selection;
  }

  render() {
    const { sourcesData, onSourceSubmit, sourcesSelected } = this.props;
    const { showSourceList } = this.state;

    return (
      <ControlPanel 
        onToDateChange={this.props.onToDateChange}
        onFromDateChange={this.props.onFromDateChange}
        onSourceBtnClick={this.toggleSourceList}>
        {
          sourcesSelected.length !== 0 &&
          this.renderSelectedSources()
        }
        {
          showSourceList &&
          <SourceForm
            sourcesData={sourcesData}
            onSubmit={onSourceSubmit}
            closeForm={this.toggleSourceList}
          />
        }
      </ControlPanel>
    );
  }
}

export default ControlPanelContainer;


ControlPanelContainer.propTypes = {
  sourcesData: PropTypes.array,
  sourcesSelected: PropTypes.array,
  onSourceSubmit: PropTypes.func,
  onToDateChange: PropTypes.func,
  onFromDateChange: PropTypes.func,
  onSourceDeleteClick: PropTypes.func,
};
