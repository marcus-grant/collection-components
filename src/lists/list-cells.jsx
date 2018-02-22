import React from 'react';
import PropTypes from 'prop-types';
import Text from '../basic/text';
import CellAccessory from '../accessories/cell-accessories';

import './list-cells.scss';

const wrap = (className, children, onPress, styles) => (
  <div
    className={className}
    onClick={onPress}
    onKeyPress={onPress}
    style={styles}
    role="menuItem"
    tabIndex={onPress && 0}
  >
    {children}
  </div>
);


const cellClass = 'list-cell__container';
const headerCellClass = 'header-cell__container';
export const cellContentClass = 'cell-content__container';


const wrapCell = (children, onPress, styles) =>
  wrap(cellClass, children, onPress, styles);

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

// TODO: Handle the leftAccessory, now it doesn't render it at all
// TODO: Handle secondary label
// TODO: Convert to <li>
// TODO: Give semantics to change width based on min/max of text, sass or text width
// TODO: Add detail & side text components
// TODO: Add left accessory component
export const ListCell = props => wrapCell(
  [ // The child nodes to wrap
    (props.children || [
      /* PLACEHOLDER for rightAccessory */
      <Text classBlock="list-cell">{props.text}</Text>,
      /* PLACEHOLDER for rightText */
      /* PLACEHOLDER for detailText */
      (
      /* accessories can either be rendered as a child component
      *  OR as a standard CellAccessory by passing props */
        props.rightAccessory ?
          <CellAccessory>{props.rightAccessory}</CellAccessory> :
          <CellAccessory
            type={props.rightAccessoryType}
            onPress={props.rightAccessoryOnPress}
          />
      ),
    ]),
  ],
  props.onPress, // The even handler callback incase this is listening to that
  // props.styles, // Inline styles if they are desired
);

ListCell.defaultProps = {
  children: undefined,
  text: undefined,
  onPress: undefined,
  classPrefix: '',
  rightAccessory: undefined,
  rightAccessoryType: undefined,
  rightAccessoryOnPress: undefined,
};

ListCell.propTypes = {
  children: childrenPropType,
  text: PropTypes.string,
  onPress: PropTypes.func,
  classPrefix: childrenPropType.string,
  rightAccessory: childrenPropType,
  rightAccessoryType: PropTypes.string,
  rightAccessoryOnPress: PropTypes.func,
  // rightAccessoryStyles: PropTypes.object,
};


export const HeaderCell = props =>
  <div className={headerCellClass}>{props.children}</div>;

HeaderCell.propTypes = {
  children: childrenPropType.isRequired,
};


// TODO : Deprecated, needs to be recreated using the new ListCells model
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
