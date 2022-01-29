import WrapperScrollView from "../WrapperScrollView";
import { shallow } from 'enzyme';

describe('WrapperScrollView component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<WrapperScrollView />);
      expect(wrapper).toMatchSnapshot();
    });
  });