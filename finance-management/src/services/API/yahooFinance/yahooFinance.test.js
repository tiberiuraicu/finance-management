import * as yahooFinance from "./yahooFinance.js";

describe("yahoo finance API tests", () => {
  it("should get regular market price for one share", async () => {
    const result = await yahooFinance.getQuote("TSLA");
    expect(typeof result).toBe("object");
  });
  it("should get regular market price for multiple shares", async () => {
    const result = await yahooFinance.getSharesNamesAndPrices([
      "TSLA",
      "MSFT",
      "AAPL",
    ]);
    expect(Object.keys(result).length).toBe(3);
    
    expect(typeof result["TSLA"].name).toBe("string");
    expect(typeof result["TSLA"].price).toBe("number");

    expect(typeof result["MSFT"].name).toBe("string");
    expect(typeof result["MSFT"].price).toBe("number");

    expect(typeof result["AAPL"].name).toBe("string");
    expect(typeof result["AAPL"].price).toBe("number");

  });
});
