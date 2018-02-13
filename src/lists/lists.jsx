import React from 'react';
import PropTypes from 'prop-types';

import './lists.scss';

const propTypeChildren = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node).isRequired,
  PropTypes.node.isRequired,
]);

const listClass = 'list__container';

const wrapList = list => (<div className={listClass}>{list}</div>);

// Consider changing from <div>s to <li>s
// Also consider turning each rendering mode into its own function or component
// ^== this allows the component to be more declarative
// ^== this also means that a div with "content" class should be inside a <li>
export const FlatList = (props) => {
  let list = props.children;
  if (!props.children) {
    list = props.listData.map(cellData => props.cellRenderer(cellData));
  }
  return wrapList(list);
};

FlatList.defaultProps = {
  children: undefined,
  cellRenderer: undefined,
  listData: undefined,
};

FlatList.propTypes = {
  children: propTypeChildren,
  cellRenderer: PropTypes.func,
  listData: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ])),
};


// export const SectionList = (props) => {
//
// };


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
