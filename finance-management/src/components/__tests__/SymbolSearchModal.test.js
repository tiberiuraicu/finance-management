jest.mock(
  "../../services/componentServices/SymbolSearchModal.services",
  () => ({
    getShareNamesAndSymbolsForSearchTerm: jest.fn().mockImplementation(() => {
      return [
        { symbol: "TSLA", name: "Tesla" },
        { symbol: "MSFT", name: "Microsoft" },
      ];
    }),
  })
);

import SymbolSearchModal from "../SymbolSearchModal";
import { shallow } from "enzyme";
import TextInputCustom from "../TextInputCustom";
import { getShareNamesAndSymbolsForSearchTerm } from "../../services/componentServices/SymbolSearchModal.services";
import { TouchableOpacity } from "react-native";

// jest.useFakeTimers();

describe("WrapperScrollView component tests", () => {
  it("renders the component", () => {
    const wrapper = shallow(
      <SymbolSearchModal
        symbol={{ value: "", validation: false, errorMessage: "" }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("calls getShareNamesAndSymbolsForSearchTerm (gets search results) when something is typed on TextInput ", () => {
    const wrapper = shallow(
      <SymbolSearchModal
        symbol={{ value: "", validation: false, errorMessage: "" }}
      />
    );
    wrapper.find(TextInputCustom).at(0).simulate("changeText", "1");
    expect(getShareNamesAndSymbolsForSearchTerm).toBeCalled();
  });

  it("sets modal visibility to false on clicking outside the results section", () => {
    const modalVisibilityMock = jest.fn();
    const wrapper = shallow(
      <SymbolSearchModal setSearchModalVisibility={modalVisibilityMock} />
    ).find(TouchableOpacity);
    wrapper.simulate("press");
    expect(modalVisibilityMock).toBeCalled();
  });

  it("calls the 'onItemPress' function when an item from the list is choosen", async () => {
    const setSymbol = jest.fn();
    const setSearchModalVisibility = jest.fn();
    const wrapper = shallow(
      <SymbolSearchModal
        symbol={{ value: "", validation: false, errorMessage: "" }}
        setSymbol={setSymbol}
        setSearchModalVisibility={setSearchModalVisibility}
      />
    );
    await wrapper.find(TextInputCustom).at(0).simulate("changeText", "1");
    wrapper.find("ListForSearch").props().onPress();
    expect(setSymbol).toBeCalled();
    expect(setSearchModalVisibility).toBeCalled();
  });
});
