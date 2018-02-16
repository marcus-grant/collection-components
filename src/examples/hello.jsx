import React from 'react';
import PropTypes from 'prop-types';

const Hello = props => <h1>{props.text}</h1>;

Hello.defaultProps = {
  text: 'Hello World!!!',
};

Hello.propTypes = {
  text: PropTypes.string,
};

export default Hello;
