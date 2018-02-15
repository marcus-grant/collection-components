import React from 'react';
import PropTypes from 'prop-types';

import './lists.scss';

const wrap = (className, children) => <div className={className}>{children}</div>;

const listClass = 'list__container';

const wrapList = list => wrap(listClass, list);

// Consider changing from <div>s to <li>s
// Also consider turning each rendering mode into its own function or component
// ^== this allows the component to be more declarative
// ^== this also means that a div with "content" class should be inside a <li>
export const FlatList = (props) => {
  let list = props.children;
  if (!list) {
    list = props.listData.map((cellData, key) => props.cellRenderer(cellData, key));
  }
  return wrapList(list);
};

const propTypeChildren = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node).isRequired,
  PropTypes.node.isRequired,
]);

const propTypeListDataItem = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
]);

const propTypeDataArray = PropTypes.arrayOf(propTypeListDataItem);

FlatList.defaultProps = {
  children: undefined,
  cellRenderer: undefined,
  listData: undefined,
};

FlatList.propTypes = {
  children: propTypeChildren,
  cellRenderer: PropTypes.func,
  listData: propTypeDataArray,
};

const sectionClass = 'list-section__container';

const wrapListSection = section => wrap(sectionClass, section);

// TODO: Consider adding an accessor function to fetch an array from sectionData
export class ListSection extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSection = this.toggleSection.bind(this);
    this.state = {
      isCollapsed: false,
    };
  }

  toggleSection() {
    this.setState(prev => ({
      isCollapsed: this.props.isCollapsible && !prev.isCollapsed,
    }));
  }

  render() {
    return wrapListSection(!this.props.children &&
      [
        this.props.headerRenderer(
          this.props.sectionData,
          this.state.isCollapsed,
          this.toggleSection,
        ),
        !this.state.isCollapsed && (
          <FlatList
            listData={this.props.sectionData[this.props.dataAccessor]}
            cellRenderer={this.props.cellRenderer}
          />
        ),
      ]);
  }
}

ListSection.defaultProps = {
  children: undefined,
  sectionData: undefined,
  cellRenderer: undefined,
  headerRenderer: undefined,
  isCollapsible: true,
  dataAccessor: 'data',
};

ListSection.propTypes = {
  children: propTypeChildren,
  sectionData: propTypeListDataItem,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.func,
  isCollapsible: PropTypes.bool,
  dataAccessor: PropTypes.string,
};

const sectionListClass = 'section-list__container';

const wrapSectionList = list => wrap(sectionListClass, list);

export const SectionList = props => wrapSectionList((!props.children && (
  props.sectionsData.map(section => (
    <ListSection
      sectionData={section}
      headerRenderer={props.headerRenderer}
      cellRenderer={props.cellRenderer}
      dataAccessor={props.dataAccessor}
    />
  ))
)));

SectionList.defaultProps = {
  children: undefined,
  sectionsData: undefined,
  headerRenderer: undefined,
  cellRenderer: undefined,
  dataAccessor: 'data',
};

SectionList.propTypes = {
  children: propTypeChildren,
  sectionsData: propTypeDataArray,
  headerRenderer: PropTypes.func,
  cellRenderer: PropTypes.func,
  dataAccessor: PropTypes.string,
};
