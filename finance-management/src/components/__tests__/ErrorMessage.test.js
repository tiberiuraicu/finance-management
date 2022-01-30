import ErrorMessage from "../ErrorMessage";
import { shallow } from 'enzyme';

describe('ErrorMessage component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<ErrorMessage />);
      expect(wrapper).toMatchSnapshot();
    });
  });