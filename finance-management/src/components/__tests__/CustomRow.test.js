import CustomRow from "../CustomRow";
import { shallow } from 'enzyme';

describe('CustomRow component tests', () => {
    it('renders the component', () => {
      const wrapper = shallow(<CustomRow />);
      expect(wrapper).toMatchSnapshot();
    });
  });