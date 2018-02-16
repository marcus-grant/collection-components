import React from 'react';
// import {
//   ListCell,
//   HeaderCell,
//   DefaultCollapsibleHeaderCell,
// } from '../lists/list-cells';
import { TriIndicator } from '../accessories/indicators';
import CellAccessory from '../accessories/cell-accessories';

const accessoryTypes = [
  'triangle-up',
  'triangle-dn',
  'triangle-lt',
  'triangle-rt',
  'this-doesnt-exist',
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.cycleAccessory = this.cycleAccessory.bind(this);
    this.state = {
      accType: 0,
    };
  }

  cycleAccessory() {
    this.setState(a => ({
      accType: (a.accType === accessoryTypes.length - 1 ? 0 : a.accType + 1),
    }));
  }

  render() {
    // Render the tri-indicators
    const triIndicators = [
      {
        text: 'up',
        jsx: <TriIndicator direction="up" />,
      },
      {
        text: 'down',
        jsx: <TriIndicator direction="dn" />,
      },
      {
        text: 'left',
        jsx: <TriIndicator direction="lt" />,
      },
      {
        text: 'right',
        jsx: <TriIndicator direction="rt" />,
      },
    ];

    const containerStyles = {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    };

    const itemStyles = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
    };

    const renderTris = () => triIndicators.map(item => (
      <div key={item.text} style={itemStyles}>
        <p><b>{item.text}</b></p>
        {item.jsx}
      </div>
    ));

    const cyclingAccessory = (
      <CellAccessory
        type={accessoryTypes[this.state.accType]}
        onPress={this.cycleAccessory}
        styles={{ border: 'solid 1px black' }}
      />
    );

    const testSectionsArray = [
      { text: 'Triangle Indicators', jsx: renderTris() },
      {
        text: 'A cycling Accessory (Every type can be clicked through)',
        jsx: cyclingAccessory,
      },
    ];

    return (
      <div className="app__container--accessories">
        <h3>Accessory Views</h3>
        {testSectionsArray.map(section => (
          <div style={containerStyles}>
            <h4>{section.text}</h4>
            {section.jsx}
            <br />
          </div>
        ))}
      </div>
    );
  }
}
