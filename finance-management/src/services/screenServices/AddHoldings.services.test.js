jest.mock("../storage/asyncStorage", () => ({
  getItem: jest.fn(),
  updateItem: jest.fn(),
}));
import * as addHoldingsServices from "./AddHoldings.services.js";

import { getItem, updateItem } from "../storage/asyncStorage";

describe("AddNewTransaction addHoldings method test", () => {
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
    var returnValue = await addHoldingsServices.addHoldings({
      price: 5,
      numberOfShares: 5,
    });
    expect(returnValue).toEqual(false);
  });
  it("calls addHoldings with undefined as the price", async () => {
    var returnValue = await addHoldingsServices.addHoldings(
      {
        numberOfShares: 5,
      },
      "PLTR"
    );
    expect(returnValue).toEqual(false);
  });
  it("calls addHoldings with undefined as the numberOfShares", async () => {
    var returnValue = await addHoldingsServices.addHoldings(
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
    var returnValue = await addHoldingsServices.addHoldings(
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
    var returnValue = await addHoldingsServices.addHoldings({});
    expect(returnValue).toEqual(false);
  });

  it("calls addHoldings with null as transaction", async () => {
    var returnValue = await addHoldingsServices.addHoldings(null);
    expect(returnValue).toEqual(false);
  });

  it("calls addHoldings and async storage throws exception", async () => {
    getItem.mockImplementation(() => {
      throw "exception";
    });
    var returnValue = await addHoldingsServices.addHoldings(
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
  it("calls addHoldings with that specific share already being part of the use's portfolio", async () => {
    getItem.mockImplementation(() => {
      return {
        PLTR: {
          symbol: "PLTR",
          transactions: [{ price: 5, numberOfShares: 5 }],
        },
      };
    });
    var returnValue = await addHoldingsServices.addHoldings(
      {
        price: 5,
        numberOfShares: 5,
      },
      "PLTR"
    );
    expect(returnValue).toEqual(true);
  });
});
