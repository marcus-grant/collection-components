import React from 'react';
import { DefaultListCell, ListCell } from './lists/lists';

const defCell = <DefaultListCell label="Main Text" detailLabel="Subtext" />;
const BasicCell = <h1>Basic Header Cell</h1>;
const CallbackContent = props => (
  <div>
    <h1>This is a button callback</h1>
    <button onClick={props.callback}>Toggle</button>
  </div>
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: false,
    };
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <div className="app__container">
        <ListCell>
          <CallbackContent callback={() => this.toggle()} />
        </ListCell>
        <h4>{this.state.toggle ? 'yes' : 'no'}</h4>
      </div>
    );
  }
}
