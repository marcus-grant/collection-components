import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, FlatList } from '../lists/lists';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isCollapsed: false,
    };
  }

  toggle() {
    this.setState(prev => ({ isCollapsed: !prev.isCollapsed }));
  }

  render() {
    return (
      <div className="dropdown">
        { this.props.dropHeaderRenderer(this.state.isCollapsed, this.toggle) }
        {
          !this.state.isCollapsed &&
            <SectionList
              sectionsData={this.props.sections}
              dataAccessor={this.props.dataAccessor}
              headerRenderer={this.props.headerRenderer}
              cellRenderer={this.props.itemRenderer}
            />
        }
      </div>

    );
  }
}

Dropdown.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
  dataAccessor: PropTypes.string,
  headerRenderer: PropTypes.func,
  itemRenderer: PropTypes.func.isRequired,
  dropHeaderRenderer: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  sections: undefined,
  items: undefined,
  dataAccessor: 'data',
  headerRenderer: undefined,
};


export default Dropdown;
