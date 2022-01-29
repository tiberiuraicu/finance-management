import AddNewTransaction from "./AddHoldings.js";
import { shallow } from 'enzyme';

describe('AddNewTransaction screen tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<AddNewTransaction />);
      expect(wrapper).toMatchSnapshot();
    });
  });