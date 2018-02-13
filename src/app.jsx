import React from 'react';
import {
  ListCell,
  HeaderCell,
  DefaultCollapsibleHeaderCell,
} from './lists/list-cells';
import {
  FlatList,
} from './lists/lists';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.collapseTestHeader = this.collapseTestHeader.bind(this);
    this.state = {
      singleToggle: false,
      defaultHeaderIsCollapsed: false,
    };
  }

  toggle() {
    const newState = !this.state.singleToggle;
    this.setState({ singleToggle: newState });
  }

  collapseTestHeader() {
    // this.setState(prev => ({ defaultHeaderIsCollapsed: !prev }));
    this.setState({ defaultHeaderIsCollapsed: !this.state.defaultHeaderIsCollapsed });
  }

  render() {
    const composedCell = (
      <ListCell>
        <h5>This is a h5 tag and button with event handler</h5>
        <button onClick={this.toggle}>Toggle Me!</button>
      </ListCell>
    );

    const composedHeaderContent = [
      <h5>Custom HeaderCell Content, also with an event handler</h5>,
      <button onClick={this.toggle}>Toggle Me!</button>,
    ];

    const defaultCollapseHeader = (
      <DefaultCollapsibleHeaderCell
        text="This is the template for a collapsible cell"
        isCollapsed={this.state.defaultHeaderIsCollapsed}
        onClick={this.collapseTestHeader}
      />
    );

    const composedHeader = <HeaderCell>{composedHeaderContent}</HeaderCell>;

    const flatList = (
      <FlatList
        listData={['A', 'B', 'C'].map(x => ({ title: x }))}
        cellRenderer={x => <ListCell><p><b>{x.title}</b></p></ListCell>}
      />
    );

    const statesDisplay = (
      <div className="test-states__container">
        <h5>{`singleToggle: ${this.state.singleToggle ? 'true' : 'false'}`}</h5>
      </div>
    );

    const renderingArray = [
      { title: 'A Composed Cell Wrapped in ListCell', jsx: composedCell },
      { title: 'A Composed Cell Wrapped in HeaderCell', jsx: composedHeader },
      {
        title: 'DefaultCollapsibleHeaderCell, a template header',
        jsx: defaultCollapseHeader,
      },
      { title: 'A FlatList with render function', jsx: flatList },
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
