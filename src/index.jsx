import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from './examples/hello';
// import AccessoriesDemo from './examples/list-cells-accessories';
import CellsDemo from './examples/cell-examples';
// import ListsDemo from './examples/list-examples';

const demos = {
  // hello: <Hello />,
  // accessories: <AccessoriesDemo />,
  cells: <CellsDemo />,
  // lists: <ListsDemo />,
};

ReactDOM.render(demos.cells, document.getElementById('react-root'));
