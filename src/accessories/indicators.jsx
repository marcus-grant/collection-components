import React from 'react';
import PropTypes from 'prop-types';

import './indicators.scss';

const BASE_TRI_CLASS = 'tri-indicator';

const triIndicatorClassFromString = (triStr, classBlock) => {
  const blockStr = classBlock ? `${classBlock}__` : '';
  const returnStr = `${blockStr}${BASE_TRI_CLASS}`;
  switch (triStr) {
    case 'up':
      return `${returnStr}--up`;
    case 'down':
    case 'dn':
      return `${returnStr}--dn`;
    case 'right':
    case 'rt':
      return `${returnStr}--rt`;
    case 'left':
    case 'lt':
      return `${returnStr}--lt`;
    default:
      return undefined;
  }
};

export const TriIndicator = props =>
  <div className={triIndicatorClassFromString(props.direction, props.classBlock)} />;

TriIndicator.defaultProps = { classBlock: undefined };

TriIndicator.propTypes = {
  direction: PropTypes.oneOf([
    'up',
    'down',
    'dn',
    'left',
    'lt',
    'right',
    'rt',
  ]).isRequired,
  classBlock: PropTypes.string,
};
