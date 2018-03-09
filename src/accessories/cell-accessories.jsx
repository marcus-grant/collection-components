import React from 'react';
import PropTypes from 'prop-types';
import {
  TriIndicator,
} from './indicators';

import './cell-accessories.scss';

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);


const wrap = (className, children, onPress, cellIndex, sectionIndex, styles) => (
  <div
    className={className}
    onClick={onPress ? (() => onPress(cellIndex, sectionIndex)) : undefined}
    onKeyPress={onPress ? (() => onPress(cellIndex, sectionIndex)) : undefined}
    style={styles}
    role="menuItem"
    tabIndex={0}
  >
    {children}
  </div>
);

// TODO: If needed add Block prefix and/or Mod suffix for className
const accessoryClass = 'cell-accessory__container';

const wrapAccessory = (children, onPress, cellIndex, sectionIndex, styles) =>
  // console.log('wrapAccessory.onPress', onPress);
  wrap(accessoryClass, children, onPress, cellIndex, sectionIndex, styles);
const ACCESSORIES = {
  triangleUp: <TriIndicator direction="up" />,
  triangleDn: <TriIndicator direction="dn" />,
  triangleLt: <TriIndicator direction="lt" />,
  triangleRt: <TriIndicator direction="rt" />,
};

const accessoryFromString = (str) => {
  switch (str) {
    case 'triangle-up':
      return ACCESSORIES.triangleUp;
    case 'triangle-dn':
      return ACCESSORIES.triangleDn;
    case 'triangle-lt':
      return ACCESSORIES.triangleLt;
    case 'triangle-rt':
      return ACCESSORIES.triangleRt;
    default:
      return undefined;
  }
};

const CellAccessory = props =>
  // console.log('CellAccessory.props.onPress', props.onPress);
  wrapAccessory(
    (props.children || accessoryFromString(props.type)),
    props.onPress,
    props.cellIndex,
    props.sectionIndex,
    // props.styles,
  );
CellAccessory.defaultProps = {
  children: undefined,
  type: undefined,
  onPress: undefined,
  // styles: undefined,
};

CellAccessory.propTypes = {
  children: childrenPropType,
  type: PropTypes.string,
  onPress: PropTypes.func,
  cellIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  // styles: PropTypes.object,
};

export default CellAccessory;
