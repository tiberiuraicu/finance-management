import yahooFinance from "yahoo-finance2";

// @info : generic method for getting general informations for one or more shares
// @params :
//  symbols : list of share symobols. Ex : ["AAPL","MSFT"]
//  fields  : list of fields needed. Ex : ["regularMarketPrice"]
export const getQuote = async (symbols, fields) => {
  try {
    return await yahooFinance.quote(symbols, { fields });
  } catch (error) {
    console.error(error);
  }
};

// @info : gets the share price and the short name for a list of symbols
// @returns array which contains an object for
// each symbol (which contain the name and the price)
export const getSharesNamesAndPrices = async (symbols) => {
  var namesAndPrices = {};
  const returnedValue = await getQuote(symbols, [
    "regularMarketPrice",
    "shortName",
  ]);
  try {
    returnedValue.map((quote) => {
      namesAndPrices[quote.symbol] = {
        name: quote.shortName,
        price: quote.regularMarketPrice,
      };
    });
  } catch (error) {
    console.log(error);
  }
  return namesAndPrices;
};

// @info : searches for a specific word on yahoofinance
// @returns a JSON with the result
export const search = async (searchTerm) => {
  let result = null;
  try {
    result = await yahooFinance.search(searchTerm, { newsCount: 0 });
  } catch (error) {
    console.error(error);
  }
  return result;
};
