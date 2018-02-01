import React from 'react';
import PropTypes from 'prop-types';
import { ListCell, DefaultListCell } from './list-cell';
import './list.scss';

const renderCells = cellRenderer => (
  {}
);

const ListUI = (props) => {
};

// TODO: consider feeding cells with...
//  - enumeration object
//      - expected properties define nesting and structure
//  - arrays of cells
ListUI.propTypes = {
  cells: PropTypes.instance
};

export default ListUI;
