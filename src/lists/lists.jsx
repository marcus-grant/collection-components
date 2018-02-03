import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';

const cellStyle = 'list-cell__container';

const ListCellLabel = text =>
  <p className="list-cell__label">{text}</p>;
const ListCellDetailLabel = text =>
  <p className="list-cell__label--detail">{text}</p>;

// TODO: Consider an accessory ie a chevron or another composition of components
export const DefaultListCell = props => (
  <div className={cellStyle}>
    <div className="list-cell__content">
      {props.label && ListCellLabel(props.label)}
      {props.detailLabel && ListCellDetailLabel(props.detailLabel)}
    </div>
  </div>
);

DefaultListCell.defaultProps = {
  label: undefined,
  detailLabel: undefined,
};

DefaultListCell.propTypes = {
  label: PropTypes.string,
  detailLabel: PropTypes.string,
};

export const ListCell = (props) => {
  if (props.children) return <div className={cellStyle}>{props.children}</div>;
  const { label, detailLabel } = props;
  const defaultProps = { label, detailLabel };
  return <DefaultListCell {...defaultProps} />;
};

ListCell.defaultProps = {
  children: undefined,
  label: undefined,
  detailLabel: undefined,
};

ListCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]),
  label: PropTypes.string,
  detailLabel: PropTypes.string,
};

export const ListSection = (props) => {

};

ListSection.propTypes = {
  rows: PropTypes.arrayOf(),
};
