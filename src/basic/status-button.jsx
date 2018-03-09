import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, PhasingBars } from '../accessories/progress-indicators';

import './status-button.scss';

// TODO: use for reference
// https://github.com/mathieudutour/react-progress-button/blob/master/src/index.js

export const STATUS = {
  INIT: '',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  DISABLED: 'disabled',
  COMPLETE: 'complete',
};

const defClassName = 'status-button';

// TODO: Give all these better className processing by specifying block of name
const loadingCircle = <Spinner />;
const phasingBars = <PhasingBars width={30} height={24} />;

const StatusButton = (props) => {
  const {
    status,
    onClick,
    successText,
    failText,
    initText,
    completeText,
    disabledText,
  } = props;
  let statusVis;
  switch (status) {
    case STATUS.INIT: statusVis = initText; break;
    case STATUS.LOADING: statusVis = phasingBars; break;
    case STATUS.SUCCESS: statusVis = successText; break;
    case STATUS.ERROR: statusVis = failText; break;
    case STATUS.COMPLETE: statusVis = completeText; break;
    case STATUS.DISABLED: statusVis = disabledText; break;
    default: statusVis = initText;
  }
  const computedClass = props.classBlock ?
    `${props.classBlock}__${defClassName}` : defClassName;
  return (
    <button
      className={computedClass}
      onClick={onClick}
    >{statusVis}
    </button>
  );
};

StatusButton.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.oneOf(Object.keys(STATUS).map(k => STATUS[k])),
  successText: PropTypes.string,
  failText: PropTypes.string,
  initText: PropTypes.string,
  completeText: PropTypes.string,
  disabledText: PropTypes.string,
  classBlock: PropTypes.string,
};

StatusButton.defaultProps = {
  onClick: undefined,
  classBlock: '',
  status: STATUS.INIT,
  successText: 'Success!',
  failText: 'Error',
  initText: 'Select',
  completeText: 'De-Select',
  disabledText: 'Disabled',
};

export default StatusButton;
