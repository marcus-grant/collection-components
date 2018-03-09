import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../dropdown/dropdown';
import { ListCell, HeaderCell, CollapseHeaderCell } from '../lists/list-cells';
import StatusButton from '../basic/status-button';

const menuData = [
  { title: 'Datasets', labels: ['Set A', 'Set B', 'Set C', 'Set D'] },
  { title: 'Options', labels: ['Opt A', 'Opt B', 'Opt C', 'Opt D'] },
];

// const btnStatuses = ['', 'loading', 'success', 'error', 'disabled'];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.getDataSet = this.getDataSet.bind(this);
    this.processNewDataSet = this.processNewDataSet.bind(this);
    // this.toggleSections = this.toggleSections.bind(this);
    this.state = {
      dropdownSections: [
        {
          name: 'DataSets',
          controls: [
            { text: 'Set A', status: '' },
            { text: 'Set B', status: '' },
            { text: 'Set C', status: '' },
            { text: 'Set D', status: '' },
          ],
        },
        {
          name: 'Options',
          controls: [
            { text: 'Opt A', status: '' },
            { text: 'Opt B', status: '' },
            { text: 'Opt C', status: '' },
            { text: 'Opt D', status: '' },
          ],
        },
      ],
      toggle: false,
    };
  }

  getDataSet(setName, sectionIndex, controlIndex) {
    console.log('Downloading ', setName);
  }

  processNewDataSet(data, setName, sectionIndex, controlIndex) {
    console.log('New data acquired, processing...done');
    // Do data processing...
    // update the dropdown control state
    const newDropdownSections = Object.assign(this.state.dropdownSections);
    newDropdownSections[sectionIndex].controls[controlIndex].status = 'complete';
    this.setState({ dropdownSections: Object.assign(newDropdownSections) });
  }

  handleCellClick(cellIndex, sectionIndex) {
    console.log('cell clicked');
    const newDropdownSections = Object.assign(this.state.dropdownSections);
    const oldControlData = newDropdownSections[sectionIndex].controls[cellIndex];
    // If this control status is '' it means no data has been downloaded for this set
    // Change the control status to 'loading' & call getDataSet to download the set
    if (oldControlData.status === '') {
      newDropdownSections[sectionIndex].controls[cellIndex].status = 'loading';
      // update state of the control to be loading while getDataSet runs
      this.setState({
        dropdownSections: Object.assign(newDropdownSections),
      });
      this.getDataSet(oldControlData.text, sectionIndex, cellIndex);
    } else if (oldControlData.status === 'loading') {
      newDropdownSections[sectionIndex].controls[cellIndex].status = 'complete';
    } else if (oldControlData.status === 'complete') {
      newDropdownSections[sectionIndex].controls[cellIndex].status = '';
    }
    this.forceUpdate(); // consider better way of ensuring that react is redrawing after state
  }


  render() {
    return (
      <div className="demo">
        <h3>{this.state.toggle ? 'Clicked' : 'Not Clicked'}</h3>
        <Dropdown
          sections={this.state.dropdownSections}
          dataAccessor="controls"
          headerRenderer={(data, isCollapsed, onClick, sectionIndex) => (
            <CollapseHeaderCell
              text={data.name}
              isCollapsed={isCollapsed}
              onPress={onClick}
              cellKey={`secHead[${sectionIndex}]`}
              sectionIndex={sectionIndex}
              cellIndex={-1}
              key={`colhead[${sectionIndex}]`}
            />
          )}
          itemRenderer={(data, cellIndex, sectionIndex) => (
            <ListCell
              key={`lc${cellIndex}`} // eslint-disable-line
              cellKey={`c[${cellIndex}]`}
              text={data.text}
              cellIndex={cellIndex}
              sectionIndex={sectionIndex}
              rightAccessoryOnPress={this.handleCellClick}
              rightAccessory={
                <StatusButton
                  key={cellIndex}
                  status={data.status}
                  completeText="REMOVE"
                  initText="SELECT"
                />
              }
            />
          )}
        />
      </div>
    );
  }
}

export default Demo;
