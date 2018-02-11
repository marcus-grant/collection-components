import React from 'react';
import {
  // DefaultListCell,
  // ListCell,
  ListCellContainer,
} from './lists/list-cells';
// import {
//
// } from './lists/lists';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      singleToggle: false,
    };
  }

  toggle() {
    const newState = !this.state.singleToggle;
    this.setState({ singleToggle: newState });
  }

  render() {
    const composedCell = (
      <ListCellContainer>
        <h5>This is a h5 tag and button with event handler</h5>
        <button onClick={this.toggle}>Toggle Me!</button>
      </ListCellContainer>
    );

    const statesDisplay = (
      <div className="test-states__container">
        <h5>{`singleToggle: ${this.state.singleToggle ? 'true' : 'false'}`}</h5>
      </div>
    );

    const renderingArray = [
      { title: 'A Composed Cell using ListCellContainer', jsx: composedCell },
      { title: 'Current Testing States:', jsx: statesDisplay },
    ];

    const renderArrayItem = item => (
      <div className="test-group__container">
        <h4>{item.title}</h4>
        {item.jsx}
        <br />
        <hr />
        <br />
      </div>
    );

    return (
      <div className="app__container">
        {renderingArray.map(item => renderArrayItem(item))}
      </div>
    );
  }
}

// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.changeTestState = this.changeTestState.bind(this);
//     this.state = {
//       toggle: false,
//       testStates: {
//         0: false,
//         1: false,
//         2: false,
//         3: false,
//       },
//     };
//   }
//
//   toggle() {
//     this.setState({ toggle: !this.state.toggle });
//   }
//
//   changeTestState(key) {
//     const update = this.state.testStates;
//     update[key] = !update[key];
//     this.setState({ testStates: update });
//   }
//
//
//   render() {
//     const testSections = [
//       {
//         name: 'Cats',
//         data: [
//           'Siamese',
//           'Domestic Short-Hair',
//           'Scottish Fold',
//           'Maine Coon',
//           'Persian',
//         ],
//       },
//       {
//         name: 'Dogs',
//         data: [
//           'Corgi',
//           'Aussie',
//           'Labrador',
//           'Chihuahua',
//         ],
//       },
//     ];
//     const renderer = dataItem => <DefaultListCell label={dataItem} />;
//     return (
//       <div className="app__container">
//         <CallbackContent callback={() => this.toggle()} />
//         <h4>Toggle State: {this.state.toggle ? 'true' : 'false'}</h4>
//         <br />
//         <hr />
//         <h3>Default List Section:</h3>
//         <ListSection name="A list section" isCollapsible>
//           {[0, 1, 2, 3].map(x => (
//             <DefaultListCell label={`Cell section: 0, Row ${x}`} />
//           ))}
//         </ListSection>
//         <br />
//         <hr />
//         <br />
//         <h3>List Section With Custom Cells and Callbacks</h3>
//         <ListSection name="Custom ListSection" isCollapsible>
//           {
//             Object.keys(this.state.testStates).map(key =>
//               (
//                 <ListCell>
//                   <p><b>{`Row ${key}`}</b></p>
//                   <button onClick={() => this.changeTestState(key)}>
//                     {'Click Me!'}
//                   </button>
//                 </ListCell>
//               ))
//           }
//         </ListSection>
//         <br />
//         <hr />
//         <br />
//         <h3>SectionedList Rendered Heterogenously</h3>
//         <SectionedList sections={testSections} sectionRenderer={renderer} />
//       </div>
//     );
//   }
// }
