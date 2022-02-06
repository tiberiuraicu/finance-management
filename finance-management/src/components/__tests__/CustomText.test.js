import CustomText from "../CustomText";
import { shallow } from 'enzyme';

describe('CustomText component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<CustomText />);
      expect(wrapper).toMatchSnapshot();
    });
  });