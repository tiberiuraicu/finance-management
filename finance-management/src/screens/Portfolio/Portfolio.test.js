import Portfolio from "./Portfolio.js";
import { shallow } from 'enzyme';

describe('Protfolio screen tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<Portfolio />);
      expect(wrapper).toMatchSnapshot();
    });
  });