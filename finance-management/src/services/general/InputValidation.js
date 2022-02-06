import { inputModel } from "../../util/models";

// @info : validates a given value depending 
// on the given optional parameters 
// (it can test a value using one or more checks) 
export const inputValidator = (
  valueToBeTested,
  setInputProperties,
  { notEmpty = false, isNumber = false } = {}
) => {
  var inputProperties = inputModel()

  // only tests if the valueToBeTested does not have to be empty
  if (notEmpty)
    inputProperties = notEmptyCheck(valueToBeTested, inputProperties);

  // only tests if the valueToBeTested should be a number
  if (isNumber)
    inputProperties = isNumberCheck(valueToBeTested, inputProperties);

  // if none of the above conditions are met => no error message will be shown
  if (inputProperties.errorMessage === "")
    inputProperties = {
      ...inputProperties,
      validation: true,
    };

  // sets the value for a specific field(ex : price, numberOfShares)
  // and also the other properties that were changed above
  setInputProperties({ ...inputProperties, value: valueToBeTested });
};

// checks if the field is empty => error
const notEmptyCheck = (valueToBeTested, inputProperties) => {
  if (valueToBeTested === "")
    inputProperties = {
      ...inputProperties,
      validation: false,
      errorMessage: "This field cannot be empty",
    };

  return inputProperties;
};

// checks if the value typed is a number => error
const isNumberCheck = (valueToBeTested, inputProperties) => {
  
  // regex which allows just numbers and "."
  const re = /^[0-9]*\.?[0-9]*$/;

  if (!re.test(valueToBeTested))
    inputProperties = {
      ...inputProperties,
      validation: false,
      errorMessage: "Only numbers accepted",
    };

  return inputProperties;
};
