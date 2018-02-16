import React from 'react';
import PropTypes from 'prop-types';

import './list-cells.scss';

const wrap = (className, children, onPress, styles) => (
  <div
    className={className}
    onClick={onPress}
    onKeyPress={onPress}
    style={styles}
    role={onPress && 'menuItem'}
    tabIndex={onPress && 0}
  >
    {children}
  </div>
);

/*
 * Basic Components
 * TODO: Move to own module with own stylesheet
 */
// TODO: Move this into its own file eventually
const TEXT_CLASS_ELEMENT = 'text';

// TODO: <p> & <div> content should be of related class but distinct
export const Text = (props) => {
  const classBlock = props.classBlock ? `${props.classBlock}__` : '';
  const classElement = TEXT_CLASS_ELEMENT;
  const classMod = props.classModifier ? `${props.classModifier}` : '';
  const classString = `${classBlock}${classElement}${classMod}`;
  const text = props.children || props.text;
  return <div className={classString}><p>{text}</p></div>;
};

Text.defaultProps = {
  children: undefined,
  text: undefined,
  classBlock: undefined,
  classModifier: undefined,
};

Text.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string,
  classBlock: PropTypes.string,
  classModifier: PropTypes.string,
};


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
export const ListCell = props => wrapCell(
  [ // The child nodes to wrap
    (props.children || <Text classBlock="list-cell">This is a ListCell with text</Text>),
  ],
  props.onPress, // The even handler callback incase this is listening to that
  props.styles, // Inline styles if they are desired
);

ListCell.defaultProps = {
  children: undefined,
  text: undefined,
  classPrefix: '',
};

ListCell.propTypes = {
  children: childrenPropType,
  text: PropTypes.string,
  classPrefix: childrenPropType.string,
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
