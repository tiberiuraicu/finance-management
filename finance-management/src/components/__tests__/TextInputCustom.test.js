import TextInputCustom from "../TextInputCustom";
import { shallow } from 'enzyme';

describe('TextInputCustom component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<TextInputCustom />);
      expect(wrapper).toMatchSnapshot();
    });
  });