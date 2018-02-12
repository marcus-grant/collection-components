import React from 'react';
import { shallow } from 'enzyme';
import { ListCellContainer } from './list-cells';

// const MyComponent = props => <div />;

const ContainerCell = (
  <ListCellContainer>
    <h1>Stuff</h1>
  </ListCellContainer>
);

describe('ListCellContainer', () => {
  it('Should render the component', () => {
    expect(shallow());
  });
});
