import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';

const cellStyle = 'list-cell__container';

const ListCellLabel = text =>
  <p className="list-cell__label">{text}</p>;
const ListCellDetailLabel = text =>
  <p className="list-cell__label--detail">{text}</p>;

// TODO: Consider an accessory ie a chevron or another composition of components
export const DefaultListCell = props => (
  <div className={cellStyle}>
    <div className="list-cell__content">
      {props.label && ListCellLabel(props.label)}
      {props.detailLabel && ListCellDetailLabel(props.detailLabel)}
    </div>
  </div>
);

DefaultListCell.defaultProps = {
  label: undefined,
  detailLabel: undefined,
};

DefaultListCell.propTypes = {
  label: PropTypes.string,
  detailLabel: PropTypes.string,
};

export const ListCell = (props) => {
  if (props.children) {
    return (
      <div
        className={props.customClass}
        onClick={props.handleClick}
      >{props.children}
      </div>
    );
  }
  const { label, detailLabel } = props;
  const defaultProps = { label, detailLabel };
  return <DefaultListCell {...defaultProps} />;
};

ListCell.defaultProps = {
  children: undefined,
  label: undefined,
  detailLabel: undefined,
  customClass: cellStyle,
  handleClick: undefined,
};

ListCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]),
  label: PropTypes.string,
  detailLabel: PropTypes.string,
  customClass: PropTypes.string,
  handleClick: PropTypes.func,
};

const ListSectionHeader = props => (
  <ListCell customClass={`${cellStyle}--header`} handleClick={props.handleClick}>
    <p><b>{props.name}</b></p>
    <div className={`collapse-indicator--${props.isCollapsed ? 'down' : 'up'}`} />
  </ListCell>
);

// Not specifying a handleClick callback just makes the header ignore clicks
ListSectionHeader.defaultProps = {
  handleClick: undefined,
  isCollapsed: false,
};

ListSectionHeader.propTypes = {
  name: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
  handleClick: PropTypes.func,
};

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

const ListContainer = (props) =>
  <div className="list__container">{props.children}</div>;

ListContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

const SectionFromRenderFunc = (section, renderer) => (
  <ListSection
);

export const SectionedList = (props) => {
  let list = [];
  if (props.children) {
    list = <ListContainer>{props.children}</ListContainer>;
  } else {

  }
};

SectionedList.propTypes = {
  sections: PropTypes.arrayOf([
    PropTypes.shape({
      data: PropTypes.array.isRequired,
      title: PropTypes.string,
      sectionRenderer: PropTypes.func,
    }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};
