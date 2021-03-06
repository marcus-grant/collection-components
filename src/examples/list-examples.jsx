import React from 'react';
import {
  ListCell,
  HeaderCell,
  CollapseHeaderCell,
} from '../lists/list-cells';
import {
  FlatList,
  ListSection,
  SectionList,
} from '../lists/lists';

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
    const flatList = (
      <FlatList
        listData={['A', 'B', 'C'].map(x => ({ title: x }))}
        cellRenderer={x => <ListCell text={x.title} />}
      />
    );

    const listSection = (
      <ListSection
        sectionData={{ section: 'A Section', data: ['A', 'B', 'C'] }}
        headerRenderer={(sectionData, isCollapsed, onClick) => (
          <CollapseHeaderCell
            text={sectionData.section}
            isCollapsed={isCollapsed}
            onPress={onClick}
          />
        )}
        dataAccessor="data"
        cellRenderer={x => <ListCell text={x} />}
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
          <CollapseHeaderCell
            text={sectionData.title}
            isCollapsed={isCollapsed}
            onPress={onClick}
          />
        )}
        dataAccessor="nums"
        cellRenderer={x => <ListCell><p><b>{x}</b></p></ListCell>}
      />
    );

    // const oldDropdown = (
    //
    // );

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

