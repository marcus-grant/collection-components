import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';

// TODO: Consider using <ul> & <li>
// TODO: This could probably just as easily made into a functional component
//          - The state might as well be managed by List?
// TODO: There should be a custom render/data structure option like in React Native
//      - This means, like in semiotic, providing the data source, and...
//      - Either an accessor string, or a function that returns the cell's contents...
//          from the datasource that's delivered
//      - This should be the expected behavior, decided on by if Children are given
export class ListSection extends React.Component {
  constructor(props) {
    super(props);
    this.collapseSection = this.collapseSection.bind(this);
    this.state = {
      isCollapsed: false,
    };
  }

  collapseSection() {
    if (this.props.isCollapsible) {
      this.setState(prev => ({ isCollapsed: !prev.isCollapsed }));
    }
  }

  render() {
    return (
      <div className="list-section__container">
        <ListSectionHeader
          name={this.props.name}
          isCollapsed={this.state.isCollapsed}
          handleClick={this.collapseSection}
        />
        {this.state.isCollapsed ? undefined : this.props.children}
      </div>
    );
  }
}

ListSection.defaultProps = {
  name: undefined,
  isCollapsed: false,
  isCollapsible: false,
};

ListSection.propTypes = {
  name: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  isCollapsible: PropTypes.bool,
};

const ListContainer = props =>
  <div className="list__container">{props.children}</div>;

ListContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

// TODO: Have ListSection become smart enough to do this themselves based on
// deterministic logic based on props
const sectionFromRenderFunc = (data, renderer, isCollapsible) => (
  <ListSection
    name={data.name}
    isCollapsible={isCollapsible}
  >
    {renderer(data)}
  </ListSection>
);

export const SectionedList = (props) => {
  let list = props.children;
  // If children are given, it means rendering is being handled through JSX outside
  // Simply wrap the children inside
  if (!props.children) {
    list = props.sections.map(section => (
      sectionFromRenderFunc(
        section.data,
        props.sectionRenderer,
        props.collapsableSections,
      )
    ));
  }
  return <ListContainer>{list}</ListContainer>;
};

SectionedList.defaultProps = {
  sections: undefined,
  sectionRenderer: undefined,
  collapsableSections: true,
};

SectionedList.propTypes = {
  sections: PropTypes.arrayOf([
    PropTypes.shape({
      data: PropTypes.array.isRequired,
      title: PropTypes.string,
    }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  sectionRenderer: PropTypes.func,
  collapsableSections: PropTypes.bool,
};
