import React from 'react';
import PropTypes from 'prop-types';
import Text from '../basic/text';
import CellAccessory from '../accessories/cell-accessories';
import { formatBEMClassName } from '../helpers';

import './list-cells.scss';

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

const wrapCell = (className, children, onPress) => (
  <div
    className={className}
    onClick={onPress}
    onKeyPress={onPress}
    role="menuItem"
    tabIndex={onPress && 0}
  >
    {children}
  </div>
);

// TODO: Handle the leftAccessory, now it doesn't render it at all
// TODO: Handle secondary label
// TODO: Convert to <li>
// TODO: Give semantics to change width based on min/max of text, sass or text width
// TODO: Add detail & side text components
// TODO: Add left accessory component
const Cell = props => wrapCell(
  // Here is where the element name gets decided for each cell type
  formatBEMClassName(props.classBlock, props.classElement, props.classModifier),
  [ // The child nodes to wrap
    (props.children || [
      /* PLACEHOLDER for rightAccessory */
      <Text classBlock={props.classBlock}>{props.text}</Text>,
      /* PLACEHOLDER for rightText */
      /* PLACEHOLDER for detailText */
      (
      /* accessories can either be rendered as a child component
      *  OR as a standard CellAccessory by passing props */
        props.rightAccessory ?
          <CellAccessory key={props.key}>{props.rightAccessory}</CellAccessory> :
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

const cellPropTypes = {
  children: childrenPropType,
  text: PropTypes.string,
  onPress: PropTypes.func,
  rightAccessory: childrenPropType,
  rightAccessoryType: PropTypes.string,
  classBlock: PropTypes.string,
  classModifier: PropTypes.string,
};

const cellDefaultProps = {
  children: undefined,
  text: undefined,
  onPress: undefined,
  rightAccessory: undefined,
  rightAccessoryType: undefined,
  classBlock: '',
  classModifier: '',
};
Cell.defaultProps = Object.assign({ classElement: 'cell' }, cellDefaultProps);
Cell.propTypes = Object.assign({ classElement: PropTypes.string }, cellPropTypes);

export const ListCell = props => <Cell classElement="list-cell" {...props} />;

export const HeaderCell = props => <Cell classElement="header-cell" {...props} />;

const accessorTypesByState = {
  default: ['triangle-up', 'triangle-dn'],
};
// const getAccessoryTypeFromCollapseType = (type) =>

export const CollapseHeaderCell = (props) => {
  const computedProps = {
    rightAccessoryType: accessorTypesByState[props.type][props.isCollapsed ? 1 : 0],
    classModifier: props.isCollapsed ? 'collapsed' : '',
  };
  return <HeaderCell {...props} {...computedProps} />;
};

CollapseHeaderCell.defaultProps = {
  text: '',
  type: 'default',
  onPress: undefined,
  classBlock: '',
};

CollapseHeaderCell.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf([
    'default',
    undefined,
  ]),
  isCollapsed: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  classBlock: PropTypes.string,
};

