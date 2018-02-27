import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatBEMClassName } from '../helpers';

// TODO: use for reference
// https://github.com/mathieudutour/react-progress-button/blob/master/src/index.js

export const STATUS = {
  INIT: '',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  DISABLED: 'disabled',
};

const circleElement = 'indicator';
const checkElement = 'checkmark';
const crossElement = 'cross';
const btnElement = 'btn';

const loadingCircle = (b, m) => (
  <svg
    className={formatBEMClassName(b, circleElement, m)}
    viewBox="0 0 70 70"
  >
    <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
  </svg>
);

const checkmark = (b, m) => (
  <svg
    className={formatBEMClassName(b, checkElement, m)}

  >
    <path d="m31.5,46.5l15.3,-23.2" />
    <path d="m31.5,46.5l-8.5,-7.1" />
  </svg>
);

const StatusButton = (props) => {
  const {
    onClick,
    block,
    modInit,
    modLoading,
    modSuccess,
    modError,
    modDisabled,
  } = props;
  return (
    <h1>blah</h1>
  );
};

StatusButton.propTypes = {
  classBlock: PropTypes.string,
  modInit: PropTypes.string,
  modLoading: PropTypes.string,
  modSuccess: PropTypes.string,
  modError: PropTypes.string,
  modDisabled: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS).map(k => STATUS[k])),
};

StatusButton.defaultProps = {
  classBlock: '',
  status: STATUS.INIT,
  modInit: '',
  modLoading: '',
  modSuccess: '',
  modError: '',
  modDisabled: '',
};

export default StatusButton;
