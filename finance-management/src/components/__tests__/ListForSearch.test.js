import { ListForSearch } from "../ListForSearch";
import { shallow, mount } from "enzyme";

describe("ListFor search tests", () => {
  it("renders the component", () => {
    const wrapper = shallow(<ListForSearch />);
    expect(wrapper).toMatchSnapshot();
  });

  it("flatlist renders given items", () => {
    const wrapper = mount(
      <ListForSearch
        data={[
          { symbol: "TSLA", name: "Tesla" },
          { symbol: "MSFT", name: "Microsoft" },
        ]}
      />
    );
    const TouchableOpacities = wrapper.find("TouchableOpacity");
    expect(TouchableOpacities.length).toBe(2);
  });

  it("calls the onPress function with the right parameter", () => {
    const onPressMockFunction = jest.fn();
    const wrapper = mount(
      <ListForSearch
        data = {[
          { symbol: "TSLA", name: "Tesla" },
          { symbol: "MSFT", name: "Microsoft" },
        ]}
        onPress = {onPressMockFunction}
      />
    );

    const TouchableOpacity = wrapper.find("TouchableOpacity").at(0);
    TouchableOpacity.simulate("click");

    expect(onPressMockFunction).toBeCalledWith("TSLA");
  });
});
