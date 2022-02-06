import { inputValidator } from "./InputValidation.js";

describe("inputValidator method tests", () => {
  const setInputProperties = jest.fn();
  var inputProperties = { value: "", validation: false, errorMessage: "" };

  it("Should show no error message(call with correct parameters)", () => {
    inputValidator(1, setInputProperties);
    expect(setInputProperties).toBeCalledWith({
      value: 1,
      validation: true,
      errorMessage: "",
    });
  });
  it("Should show 'This field cannot be empty' as error message", () => {
    inputValidator("", setInputProperties, { notEmpty: true, isNumber: true });
    expect(setInputProperties).toBeCalledWith({
      value: "",
      validation: false,
      errorMessage: "This field cannot be empty",
    });
  });
  it("Should show 'Only numbers accepted' as error message", () => {
    inputValidator("word", setInputProperties, {
      notEmpty: true,
      isNumber: true,
    });
    expect(setInputProperties).toBeCalledWith({
      value: "word",
      validation: false,
      errorMessage: "Only numbers accepted",
    });
  });
});
