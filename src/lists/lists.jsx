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
    list = props.listData.map(cellData => props.cellRenderer(cellData));
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

// export const ListSection = (props) => {
//   let section = props.children;
//   if (!section) {
//     section = [];
//     section.push(props.headerRenderer(props.sectionData));
//     section.push(props.isCollapsed && props.cellRenderer(props.sectionData));
//   } return wrapListSection(section);
// };

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
        !this.state.isCollapsed && this.props.cellRenderer(this.props.sectionData),
      ]);
  }
}

ListSection.defaultProps = {
  children: undefined,
  sectionData: undefined,
  cellRenderer: undefined,
  headerRenderer: undefined,
  isCollapsible: true,
};

ListSection.propTypes = {
  children: propTypeChildren,
  sectionData: propTypeListDataItem,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.func,
  isCollapsible: PropTypes.bool,
};


// TODO: Consider using <ul> & <li>
// TODO: This could probably just as easily made into a functional component
//          - The state might as well be managed by List?
// export class ListSection extends React.Component {
//   constructor(props) {
//     super(props);
//     this.collapseSection = this.collapseSection.bind(this);
//     this.state = {
//       isCollapsed: false,
//     };
//   }
//
//   collapseSection() {
//     if (this.props.isCollapsible) {
//       this.setState(prev => ({ isCollapsed: !prev.isCollapsed }));
//     }
//   }
//
//   render() {
//     return (
//       <div className="list-section__container">
//         <ListSectionHeader
//           name={this.props.name}
//           isCollapsed={this.state.isCollapsed}
//           handleClick={this.collapseSection}
//         />
//         {this.state.isCollapsed ? undefined : this.props.children}
//       </div>
//     );
//   }
// }
//
// ListSection.defaultProps = {
//   name: undefined,
//   isCollapsed: false,
//   isCollapsible: false,
// };
//
// ListSection.propTypes = {
//   name: PropTypes.string,
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node).isRequired,
//     PropTypes.node.isRequired,
//   ]).isRequired,
//   isCollapsible: PropTypes.bool,
// };
//
// const ListContainer = props =>
//   <div className="list__container">{props.children}</div>;
//
// ListContainer.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node).isRequired,
//     PropTypes.node.isRequired,
//   ]).isRequired,
// };
//
// // TODO: Have ListSection become smart enough to do this themselves based on
// // deterministic logic based on props
// const sectionFromRenderFunc = (data, renderer, isCollapsible) => (
//   <ListSection
//     name={data.name}
//     isCollapsible={isCollapsible}
//   >
//     {renderer(data)}
//   </ListSection>
// );
//
// export const SectionedList = (props) => {
//   let list = props.children;
//   // If children are given, it means rendering is being handled through JSX outside
//   // Simply wrap the children inside
//   if (!props.children) {
//     list = props.sections.map(section => (
//       sectionFromRenderFunc(
//         section.data,
//         props.sectionRenderer,
//         props.collapsableSections,
//       )
//     ));
//   }
//   return <ListContainer>{list}</ListContainer>;
// };
//
// SectionedList.defaultProps = {
//   sections: undefined,
//   sectionRenderer: undefined,
//   collapsableSections: true,
// };
//
// SectionedList.propTypes = {
//   sections: PropTypes.arrayOf([
//     PropTypes.shape({
//       data: PropTypes.array.isRequired,
//       title: PropTypes.string,
//     }),
//   ]),
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node).isRequired,
//     PropTypes.node.isRequired,
//   ]).isRequired,
//   sectionRenderer: PropTypes.func,
//   collapsableSections: PropTypes.bool,
// };
