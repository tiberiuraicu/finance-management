jest.mock("../storage/asyncStorage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  updateItem: jest.fn(),
}));
import {
  addHoldings,
  getShareNamesAndSymbolsForSearchTerm,
} from "./AddHoldings.services.js";

import { getItem, updateItem,setItem } from "../storage/asyncStorage";

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
    expect(setItem).toBeCalled();
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


