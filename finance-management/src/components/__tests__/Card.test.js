import Card from "../Card";
import { shallow } from 'enzyme';

describe('Card component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<Card />);
      expect(wrapper).toMatchSnapshot();
    });
  });