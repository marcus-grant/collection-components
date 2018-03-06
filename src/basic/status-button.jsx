import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatBEMClassName } from '../helpers';

import './status-button.scss';

// TODO: use for reference
// https://github.com/mathieudutour/react-progress-button/blob/master/src/index.js

export const STATUS = {
  INIT: '',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  DISABLED: 'disabled',
};

const defClassName = 'status-button';

const circleElement = 'indicator';
const checkElement = 'checkmark';
const crossElement = 'cross';
const btnElement = 'btn';

// TODO: Give all these better className processing by specifying block of name
const loadingCircle = (
  <svg
    className={`${defClassName}--${STATUS.LOADING}`}
    viewBox="0 0 41 41"
  >
    <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
  </svg>
);

const checkmark = (
  <svg
    className={`${defClassName}--${STATUS.SUCCESS}`}
    viewBox="0 0 70 70"
  >
    <path d="m31.5,46.5l15.3,-23.2" />
    <path d="m31.5,46.5l-8.5,-7.1" />
  </svg>
);

const cross = (
  <svg
    className={`${defClassName}--${STATUS.ERROR}`}
    viewBox="0 0 70 70"
  >
    <path d="m35,35l-9.3,-9.3" />
    <path d="m35,35l9.3,9.3" />
    <path d="m35,35l-9.3,9.3" />
    <path d="m35,35l9.3,-9.3" />
  </svg>
);

const indicatorFromStatus = (status) => {
  switch (status) {
    case STATUS.LOADING: return loadingCircle;
    case STATUS.SUCCESS: return checkmark;
    case STATUS.ERROR: return cross;
    default: return undefined;
  }
};

const StatusButton = (props) => {
  const {
    status,
    onClick,
  } = props;
  console.log('status: ', status);
  return (
    <button className={defClassName}>{indicatorFromStatus(status)}</button>
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
  modInit: STATUS.INIT,
  modLoading: STATUS.LOADING,
  modSuccess: STATUS.SUCCESS,
  modError: STATUS.ERROR,
  modDisabled: STATUS.DISABLED,
};

export default StatusButton;
