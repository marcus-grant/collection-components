import React from 'react';
import { DefaultListCell, ListCell } from './lists/list-ui';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app__container">
        <DefaultListCell label="Main Text" detailLabel="Subtext" />
      </div>
    );
  }
}
