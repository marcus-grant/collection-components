import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';

const containerClass = 'list-cell__container';

export const ListCellContainer = props =>
  <div className={containerClass}>{props.children}</div>;

ListCellContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
/*
 * Old - Examine each of these definitions and turn them into new tested definitions
 *
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
*/
