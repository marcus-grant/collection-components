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

// TODO: Add SectionHeaderCell
// TODO: Standardized Cell Layouts for basic lists
// TODO: Consider using <ul> & <li>
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
      // this.setState(prevState => ({ value: prevState.value - 1 }));
      this.setState({ isCollapsed: !this.state.isCollapsed });
    }
    console.log('header clicked!');
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
