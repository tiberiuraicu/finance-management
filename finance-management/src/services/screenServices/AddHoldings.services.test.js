jest.mock("../storage/asyncStorage", () => ({
  getItem: jest.fn(),
  updateItem: jest.fn(),
}));
import { addHoldings, inputValidator } from "./AddHoldings.services.js";

import { getItem, updateItem } from "../storage/asyncStorage";

describe("addHoldings method tests", () => {
  beforeEach(() => {
    getItem.mockImplementation(() => {
      return null;
    });
    updateItem.mockImplementation(() => {
      return null;
    });
  });

  // check if one of the transaction object is undefined
  it("calls addHoldings with undefined as the symbol", async () => {
    var returnValue = await addHoldings({
      price: 5,
      numberOfShares: 5,
    });
    expect(returnValue).toEqual(false);
  });
  it("calls addHoldings with undefined as the price", async () => {
    var returnValue = await addHoldings(
      {
        numberOfShares: 5,
      },
      "PLTR"
    );
    expect(returnValue).toEqual(false);
  });
  it("calls addHoldings with undefined as the numberOfShares", async () => {
    var returnValue = await addHoldings(
      {
        price: 5,
      },
      "PLTR"
    );
    expect(returnValue).toEqual(false);
  });

  // -> assumes that the share for which the transaction
  //    is added doesn't exist in portfolio
  it("calls addHoldings with correct parameters", async () => {
    var returnValue = await addHoldings(
      {
        price: 5,
        numberOfShares: 5,
      },
      "PLTR"
    );
    expect(getItem).toBeCalled();
    expect(updateItem).toBeCalled();
    expect(returnValue).toEqual(true);
  });

  it("calls addHoldings with an empty transaction", async () => {
    var returnValue = await addHoldings({});
    expect(returnValue).toEqual(false);
  });

  it("calls addHoldings with null as transaction", async () => {
    var returnValue = await addHoldings(null);
    expect(returnValue).toEqual(false);
  });

  it("calls addHoldings and async storage throws exception", async () => {
    getItem.mockImplementation(() => {
      throw "exception";
    });
    var returnValue = await addHoldings(
      {
        price: 5,
        numberOfShares: 5,
      },
      "PLTR"
    );
    expect(returnValue).toEqual(false);
  });

  // -> assumes that the share for which the transaction
  //    is added exists in portfolio
  it(
    "calls addHoldings with that specific share already being part of " +
      "the use's portfolio(should just add a new transaction to the existing share array) => should return true",
    async () => {
      getItem.mockImplementation(() => {
        return {
          PLTR: {
            symbol: "PLTR",
            transactions: [{ price: 5, numberOfShares: 5 }],
          },
        };
      });
      var returnValue = await addHoldings(
        {
          price: 5,
          numberOfShares: 5,
        },
        "PLTR"
      );
      expect(returnValue).toEqual(true);
    }
  );
});

describe("inputValidator method tests", () => {
  const setInputProperties = jest.fn();
  var inputProperties = { value: "", validation: false, errorMessage: "" };

  it("Should show no error message(call with correct parameters)", () => {
    inputValidator(1, inputProperties, setInputProperties);
    expect(setInputProperties).toBeCalledWith({
      value: 1,
      validation: true,
      errorMessage: "",
    });
  });
  it("Should show 'This field cannot be empty' as error message", () => {
    inputValidator("", inputProperties, setInputProperties);
    expect(setInputProperties).toBeCalledWith({
      value: "",
      validation: false,
      errorMessage: "This field cannot be empty",
    });
  });
  it("Should show 'Number should be bigger than 0' as error message", () => {
    inputValidator(-5, inputProperties, setInputProperties);
    expect(setInputProperties).toBeCalledWith({
      value: -5,
      validation: false,
      errorMessage: "Number should be bigger than 0",
    });
  });
  it("Should show 'Only numbers accepted' as error message", () => {
    inputValidator("word", inputProperties, setInputProperties);
    expect(setInputProperties).toBeCalledWith({
      value: "word",
      validation: false,
      errorMessage: "Only numbers accepted",
    });
  });
});
