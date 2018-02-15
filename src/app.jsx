import React from 'react';
import {
  ListCell,
  HeaderCell,
  DefaultCollapsibleHeaderCell,
} from './lists/list-cells';
import {
  FlatList,
  ListSection,
  SectionList,
} from './lists/lists';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.collapseTestHeader = this.collapseTestHeader.bind(this);
    this.collapseSingleSection = this.collapseSingleSection.bind(this);
    this.state = {
      singleToggle: false,
      defaultHeaderIsCollapsed: false,
      singleSectionIsCollapsed: false,
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

  collapseSingleSection() {
    this.setState({ singleSectionIsCollapsed: !this.state.singleSectionIsCollapsed });
  }

  render() {
    // const composedCell = (
    //   <ListCell>
    //     <h5>This is a h5 tag and button with event handler</h5>
    //     <button onClick={this.toggle}>Toggle Me!</button>
    //   </ListCell>
    // );
    //
    // const composedHeaderContent = [
    //   <h5>Custom HeaderCell Content, also with an event handler</h5>,
    //   <button onClick={this.toggle}>Toggle Me!</button>,
    // ];
    //
    // const composedHeader = <HeaderCell>{composedHeaderContent}</HeaderCell>;
    //
    // const defaultCollapseHeader = (
    //   <DefaultCollapsibleHeaderCell
    //     text="This is the template for a collapsible cell"
    //     isCollapsed={this.state.defaultHeaderIsCollapsed}
    //     onClick={this.collapseTestHeader}
    //   />
    // );

    const flatList = (
      <FlatList
        listData={['A', 'B', 'C'].map(x => ({ title: x }))}
        cellRenderer={x => <ListCell><p><b>{x.title}</b></p></ListCell>}
      />
    );

    const listSection = (
      <ListSection
        sectionData={{ section: 'A Section', data: ['A', 'B', 'C'] }}
        headerRenderer={(sectionData, isCollapsed, onClick) => (
          <DefaultCollapsibleHeaderCell
            text={sectionData.section}
            isCollapsed={isCollapsed}
            onClick={onClick}
          />
        )}
        dataAccessor="data"
        cellRenderer={x => <ListCell><p><b>{x}</b></p></ListCell>}
      />
    );

    const sectionListData = [
      { title: 'Triangle', nums: [1, 3, 6, 10, 15, 21, 28] },
      { title: 'Fibonacci', nums: [1, 1, 2, 3, 5, 8, 13] },
      { title: 'Prime', nums: [1, 2, 3, 5, 7, 11, 13] },
    ];

    const sectionList = (
      <SectionList
        sectionsData={sectionListData}
        headerRenderer={(sectionData, isCollapsed, onClick) => (
          <DefaultCollapsibleHeaderCell
            text={sectionData.title}
            isCollapsed={isCollapsed}
            onClick={onClick}
          />
        )}
        dataAccessor="nums"
        cellRenderer={x => <ListCell><p><b>{x}</b></p></ListCell>}
      />
    );

    const statesDisplay = (
      <div className="test-states__container">
        <h5>{`singleToggle: ${this.state.singleToggle ? 'true' : 'false'}`}</h5>
      </div>
    );

    const renderingArray = [
      // { title: 'A Composed Cell Wrapped in ListCell', jsx: composedCell },
      // { title: 'A Composed Cell Wrapped in HeaderCell', jsx: composedHeader },
      // {
      //   title: 'DefaultCollapsibleHeaderCell, a template header',
      //   jsx: defaultCollapseHeader,
      // },
      { title: 'A FlatList with render function', jsx: flatList, key: 123 },
      { title: 'A Single ListSection with data rendering composed of a FlatList & HeaderCell', jsx: listSection, key: 944 },
      { title: 'A SectionList', jsx: sectionList, key: 1923 },
      { title: 'Current Testing States:', jsx: statesDisplay, key: 69 },
    ];

    const renderArrayItem = item => (
      <div key={item.key} className="test-group__container">
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
