import CustomButton from "../CustomButton";
import { shallow } from 'enzyme';

describe('CustomButton component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<CustomButton />);
      expect(wrapper).toMatchSnapshot();
    });
  });