import AddNewTransaction from "./AddNewTransaction.js";
import { shallow } from 'enzyme';

describe('AddNewTransaction screen tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<AddNewTransaction />);
      expect(wrapper).toMatchSnapshot();
    });
  });