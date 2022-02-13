jest.mock("../API/yahooFinance/yahooFinance.js", () => ({
  getSharesNamesAndPrices: jest
    .fn()

    .mockReturnValueOnce({
      PLTR: { name: "Palantir", price: 21 },
      MSFT: { name: "Microsoft", price: 301 },
    })
    .mockReturnValueOnce(null),
}));

var getItemReturnValue = {
  PLTR: {
    symbol: "PLTR",
    transactions: [
      { price: 20, numberOfShares: 1 },
      { price: 20, numberOfShares: 1 },
    ],
  },
  MSFT: {
    symbol: "MSFT",
    transactions: [
      { price: 300, numberOfShares: 1 },
      { price: 300, numberOfShares: 1 },
    ],
  },
};
jest.mock("../storage/asyncStorage.js", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce(() => {
      return getItemReturnValue;
    })
    .mockImplementationOnce(() => {
      return getItemReturnValue;
    }),
}));

import { getDisplayPropertiesForAllShares } from "./Portfolio.services.js";

describe("getDisplayPropertiesForAllShares method tests", () => {
  it("returns the correct values for specific parameters", async () => {
    const [portfolioValue, shareDisplayParameters] =
      await getDisplayPropertiesForAllShares();
    expect(portfolioValue).toEqual(644.0);
    expect(shareDisplayParameters.length).toEqual(2);
  });
  it("returns 0 as protfolio value and an empty array as display parameters when an error occurs", async () => {
    expect(await getDisplayPropertiesForAllShares()).toEqual([0, [1]]);
  });

  it("returns 0 as protfolio value and an empty array as display parameters when the portfolio object is undefined", async () => {
    expect(await getDisplayPropertiesForAllShares()).toEqual([0, []]);
  });
});
