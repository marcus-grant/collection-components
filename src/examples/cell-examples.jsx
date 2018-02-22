import React from 'react';
import {
  ListCell,
  HeaderCell,
//   DefaultCollapsibleHeaderCell,
} from '../lists/list-cells';
import Text from '../basic/text';
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
    this.toggle = this.toggle.bind(this);
    this.state = {
      accType: 0,
      toggle: false,
    };
  }

  toggle() { this.setState(prev => ({ toggle: !prev.toggle })); }

  cycleAccessory() {
    this.setState(prev => ({
      accType: (prev.accType === accessoryTypes.length - 1 ? 0 : prev.accType + 1),
    }));
  }

  render() {
    const containerStyles = {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    };

    // const itemStyles = {
    //   display: 'flex',
    //   flexFlow: 'row wrap',
    //   alignItems: 'center',
    // };

    const cyclingAccessory = (
      <CellAccessory
        type={accessoryTypes[this.state.accType]}
        onPress={this.cycleAccessory}
        styles={{ border: 'solid 1px black' }}
      />
    );

    const textComponentA = (
      <Text
        text="I'm a \'Text\' component using props.text to receive text"
      />
    );

    const textComponentB = (
      <Text>Im that same Text component, but a block component instead</Text>
    );

    const textComponentC = (
      <Text classBlock="some-block">
        {'Text Components can be given custom blocks in class'}
      </Text>
    );

    const wrappingListCell = (
      <ListCell><p><i>A composed cell</i></p></ListCell>
    );

    const listCellWithText = (
      <ListCell text={'cell with text passed as "props.text"'} />
    );

    const listCellOnPressProp = (
      <ListCell text="Click Me!" onPress={this.toggle} />
    );

    const listCellWithTextAccessoryTypeCallback = (
      <ListCell
        text="prop-based accessory & text with callbacks on both"
        onPress={this.toggle}
        rightAccessoryType={accessoryTypes[this.state.accType]}
        rightAccessoryOnPress={this.cycleAccessory}
      />
    );

    const standardHeaderCell = (
      <HeaderCell
        text="same as the ListCell, but classed 'header-cell'"
        onPress={this.toggle}
        rightAccessoryType={accessoryTypes[this.state.accType]}
        rightAccessoryOnPress={this.cycleAccessory}
      />
    );

    const statesDisplay = (
      <div>
        <h6>toggle: </h6>
        <p>{this.state.toggle ? 'on' : 'off'}</p>
      </div>
    );

    const testSectionsArray = [
      {
        text: 'A cycling Accessory (Every type can be clicked through)',
        jsx: cyclingAccessory,
      },
      {
        text: 'A Text Component with Defaults',
        jsx: textComponentA,
      },
      {
        text: 'A Text Component with Defaults (but this time block style)',
        jsx: textComponentB,
      },
      {
        text: 'This text component has BEM (B)lock as "some-block"',
        jsx: textComponentC,
      },
      {
        text: 'A ListCell created by using it as a container component',
        jsx: wrappingListCell,
      },
      {
        text: '<ListCell> can have text passed as a prop',
        jsx: listCellWithText,
      },
      {
        text: '<ListCell> has a callback as prop "onPress"',
        jsx: listCellOnPressProp,
      },
      {
        text: '<ListCell> has a template acsry. & text with callbacks on both',
        jsx: listCellWithTextAccessoryTypeCallback,
      },
      {
        text: '<HeaderCell> same as the standard ListCell, but classed header',
        jsx: standardHeaderCell,
      },
      {
        text: 'Testing States:',
        jsx: statesDisplay,
      },
    ];

    return (
      <div className="app__container--accessories">
        <h3>Pattern Cells</h3>
        {testSectionsArray.map(section => (
          <div style={containerStyles}>
            <h5>{section.text}</h5>
            {section.jsx}
            <br />
          </div>
        ))}
      </div>
    );
  }
}

