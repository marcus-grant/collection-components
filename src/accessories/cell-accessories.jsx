import React from 'react';
import PropTypes from 'prop-types';
import {
  TriIndicator,
} from './indicators';

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

const accessoryClass = 'cell-accessory__container';


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

const wrapAccessory = (children, onPress, styles) =>
  wrap(accessoryClass, children, onPress, styles);

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

const CellAccessory = props => (
  wrapAccessory(
    (props.children || accessoryFromString(props.type)),
    props.onPress,
    props.styles,
  )
);

CellAccessory.defaultProps = {
  children: undefined,
  type: undefined,
  onPress: undefined,
  styles: undefined,
};

CellAccessory.propTypes = {
  children: childrenPropType,
  type: PropTypes.string,
  onPress: PropTypes.func,
  styles: PropTypes.object,
};

export default CellAccessory;
