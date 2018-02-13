import React from 'react';
import PropTypes from 'prop-types';

import './list-cells.scss';

const cellClass = 'list-cell__container';
const headerCellClass = 'header-cell__container';

export const cellContentClass = 'cell-content__container';

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const ListCell = props =>
  <div className={cellClass}>{props.children}</div>;

ListCell.propTypes = {
  children: childrenPropType.isRequired,
};

export const HeaderCell = props =>
  <div className={headerCellClass}>{props.children}</div>;

HeaderCell.propTypes = {
  children: childrenPropType.isRequired,
};


// Now we can start to create templated cells
// Main point is that so long as the container of a cell's content ie the cell...
// has the same component with the same className, the structure will be uniform

const headerCellTextClass = 'header-cell__text';
// const headerCellDetailClass = `${headerCellTextClass}--detail`;
const collapseSignClass = 'collapse-indicator';
const collapseSignClassUp = `${collapseSignClass}--up`;
const collapseSignClassDn = `${collapseSignClass}--down`;
const collapseSignClassFromBool = isCollapsed =>
  (isCollapsed ? collapseSignClassDn : collapseSignClassUp);

export const DefaultCollapsibleHeaderCell = props => (
  <div
    className={headerCellClass}
    onClick={props.onClick}
    onKeyPress={props.onClick}
    role="menuItem"
    tabIndex={0}
  >
    <p className={headerCellTextClass}><b>{props.text}</b></p>
    <div className={collapseSignClassFromBool(props.isCollapsed)} />
  </div>
);

DefaultCollapsibleHeaderCell.defaultProps = {
  text: '',
};

DefaultCollapsibleHeaderCell.propTypes = {
  text: PropTypes.string,
  isCollapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
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
