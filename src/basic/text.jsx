import React from 'react';
import PropTypes from 'prop-types';

import './text.scss';

const TEXT_CLASS_ELEMENT = 'text';

// TODO: <p> & <div> content should be of related class but distinct
const Text = (props) => {
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

export default Text;
