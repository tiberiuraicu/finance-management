import { search } from "../API/yahooFinance/yahooFinance.js";

// @info : gets the result of searching for a specific term
// @params : searchTerm - word typed by the user
// @returns : a list of JSON objects that contain a symbol and a name            
export const getShareNamesAndSymbolsForSearchTerm = async (searchTerm) => {
  let symbolAndName = [];

  // if there is no search term => return an empty array
  if (searchTerm === "") return symbolAndName;

  try {
    // gets the result from search
    let searchResult = await search(searchTerm);

    // eliminates everything that is not a share/option
    symbolAndName = searchResult.quotes.filter((quote) => quote.index === "quotes");

    // eliminates every property besides the symbol and name of the share
    symbolAndName = symbolAndName.map((quote) => {
        return { symbol: short(quote.symbol), name: short(quote.shortname) };
    });
  } catch (error) {
    throw error;
  }
  return symbolAndName;
};

// @info restricts a string from having more than 10 characters
const short = (stringToShort) => {
  try {
    return stringToShort.length > 10
      ? stringToShort.substr(0, 10 - 1) + "..."
      : stringToShort;
  } catch (error) {}
};
