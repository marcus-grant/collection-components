import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme Adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme jfunctions available in all test files without import
global.shallow = shallow;
global.render = render;
global.mount = mount;
