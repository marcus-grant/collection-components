import React from 'react';
import {
  DefaultListCell,
  ListCell,
  ListSection,
} from './lists/lists';

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
    this.changeTestState = this.changeTestState.bind(this);
    this.state = {
      toggle: false,
      testStates: {
        0: false,
        1: false,
        2: false,
        3: false,
      },
    };
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  changeTestState(key) {
    const update = this.state.testStates;
    update[key] = !update[key];
    this.setState({ testStates: update });
  }


  render() {
    const callbackSectionCell = (id, label, callback) => (
      <div>
        <p><b>{label}</b></p>
        <button onClick={callback(id)} />
      </div>
    );
    const renderSectionCells = () => {
      Object.keys(this.state.testStates).forEach(key => callbackSectionCell(key, key, this.changeTestState));
    };
    return (
      <div className="app__container">
        <ListCell>
          <CallbackContent callback={() => this.toggle()} />
        </ListCell>
        <h4>Toggle State: {this.state.toggle ? 'true' : 'false'}</h4>
        <br />
        <hr />
        <h3>Default List Section:</h3>
        <ListSection name="A list section" isCollapsible>
          {[0, 1, 2, 3].map(x => (
            <DefaultListCell label={`Cell section: 0, Row ${x}`} />
          ))}
        </ListSection>
        <br />
        <hr />
        <br />
        <h3>List Section With Custom Cells and Callbacks</h3>
        <ListSection name="Custom ListSection" isCollapsible>
          {renderSectionCells}
        </ListSection>
      </div>
    );
  }
}
