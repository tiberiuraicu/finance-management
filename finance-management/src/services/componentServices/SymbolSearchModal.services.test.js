import { getShareNamesAndSymbolsForSearchTerm } from "./SymbolSearchModal.services.js";

describe("getShareNamesAndSymbolsForSearchTerm method tests", () => {
  it("returns the symbol and name for every result", async () => {
    const results = await getShareNamesAndSymbolsForSearchTerm("TSLA");
    expect(results.length).not.toEqual(0);
    expect(results[0].symbol).not.toBeNull();
    expect(results[0].name).not.toBeNull();
  });
  it("Returns an empty array on empty search term", async () => {
    var result = await getShareNamesAndSymbolsForSearchTerm("");
    expect(result).toEqual([]);
  });
});
