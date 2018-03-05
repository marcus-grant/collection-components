import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './examples/hello';
// import AccessoriesDemo from './examples/list-cells-accessories';
// import CellsDemo from './examples/cell-examples';
// import ListsDemo from './examples/list-examples';
import DropdownDemo from './examples/dropdown-examples';

const demos = {
  hello: <Hello />,
  // accessories: <AccessoriesDemo />,
  // cells: <CellsDemo />,
  // lists: <ListsDemo />,
  dropdown: <DropdownDemo />,
};

ReactDOM.render(demos.dropdown, document.getElementById('react-root'));
