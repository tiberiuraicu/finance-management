import Portfolio from "./Portfolio.js";
import { shallow,mount } from "enzyme";
import { TouchableOpacity } from "react-native";

const createTestProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});
jest.mock("@react-navigation/native", () => ({
  useIsFocused: jest.fn(),
}));


describe("Protfolio screen tests", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Portfolio />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should trigger onPress", () => {
    props = createTestProps({});
    const wrapper = mount(<Portfolio {...props} />);

    wrapper.find(TouchableOpacity).first().simulate('click')
    expect(props.navigation.navigate).toHaveBeenCalledWith("AddHoldings", {"isAddHolding": true}); // SUCCESS
  });
});
