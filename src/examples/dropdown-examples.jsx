import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../dropdown/dropdown';
import { ListCell, HeaderCell, CollapseHeaderCell } from '../lists/list-cells';
import StatusButton from '../basic/status-button';

const numSequences = [
  // { title: 'Triangle', nums: [1, 3, 6, 10, 15, 21, 28] },
  { title: 'Fibonacci', nums: [1, 1, 2, 3, 5, 8, 13] },
  { title: 'Prime', nums: [1, 2, 3, 5, 7, 11, 13] },
  // { title: 'Squares', nums: [1, 4, 9, 16, 25, 36] },
];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = {
      toggle: false,
    };
  }

  click() {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  }

  render() {
    return (
      <div className="demo">
        <h3>{this.state.toggle ? 'Clicked' : 'Not Clicked'}</h3>
        <Dropdown
          dropHeaderRenderer={(isCollapsed, toggleCallback) => (
            <CollapseHeaderCell
              text="Menu"
              isCollapsed
              onPress={toggleCallback}
            />
        )}
          sections={numSequences}
          dataAccessor="nums"
          headerRenderer={(data, isCollapsed, onClick) => (
            <CollapseHeaderCell
              text={data.title}
              isCollapsed={isCollapsed}
              onPress={onClick}
            />
          )}
          itemRenderer={() => (
            <StatusButton />
          )}
        />
      </div>
    );
  }
}

export default Demo;
