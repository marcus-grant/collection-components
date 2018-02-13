import React from 'react';
import { shallow } from 'enzyme';
import { ListCellContainer } from './list-cells';

// Some quick examples to demonstrate testing on Enzyme & Jest
test('render a label', () => {
  const wrapper = shallow(<Label>Hello jest!</Label>);
});

const ContainerCell = (
  <ListCellContainer>
    <h1>Stuff</h1>
  </ListCellContainer>
);

describe('ListCellContainer', () => {
  it('Should render the component', () => {
    expect(shallow(ContainerCell));
  });
});
