jest.mock("../../services/general/InputValidation", () => ({
  inputValidator: jest.fn(),
}));
jest.mock("../../services/screenServices/AddHoldings.services", () => ({
  addHoldings: jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true),
}));
jest.mock("@react-navigation/native", () => ({
  useIsFocused: jest.fn(),
}));

jest.mock("react", () => {
  const originalModule = jest.requireActual("react");

  return {
    ...originalModule,
    useState: jest
      .fn()
      .mockImplementation(() => [
        { value: "", validation: true, errorMessage: "" },
        () => {},
      ]),
  };
});

import AddHoldings from "./AddHoldings.js";
import { shallow, mount } from "enzyme";
import { inputValidator } from "../../services/general/InputValidation";
import { addHoldings } from "../../services/screenServices/AddHoldings.services";
import { Alert } from "react-native";

const route = {
  params: {
    isAddHolding: true,
    symbolForEdit: undefined,
  },
};

describe("AddHoldings screen tests", () => {
  it("renders the component", () => {
    const wrapper = shallow(<AddHoldings route={route} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("calls the input validator", () => {
    const wrapper = shallow(<AddHoldings route={route} />);
    wrapper.find("TextInputCustom").at(0).simulate("changeText", "1");
    expect(inputValidator).toBeCalled();
    wrapper.find("TextInputCustom").at(1).simulate("changeText", "1");
    expect(inputValidator).toBeCalled();
  });

  it("calls the addHoldings method on button press (with transaction failed alert)", async () => {
    jest.spyOn(Alert, "alert");

    const wrapper = mount(<AddHoldings route={route} />);
    await wrapper.find("CustomButton").at(0).props().onPress();

    expect(addHoldings).toBeCalled();

    // it gives 'Transaction failed' because there
    // is no transaction object and an error is thrown
    // => it gets to this point because the validations
    // for inputs have been mocked to be true
    expect(Alert.alert).toHaveBeenCalledWith("", "Transaction failed");
  });

  it("calls the addHoldings method on button press (with transaction added alert)", async () => {
    jest.spyOn(Alert, "alert");

    const wrapper = mount(<AddHoldings route={route} />);
    await wrapper.find("CustomButton").at(0).props().onPress();

    expect(addHoldings).toBeCalled();

    // it gives 'Transzction failed' because there
    // is no transaction object and an error is thrown
    // => it gets to this point because the validations
    // for inputs have been mocked to be true
    expect(Alert.alert).toHaveBeenCalledWith("", "Transaction added");
  });
});
