import yahooFinance from "yahoo-finance2";

// @info : generic method for getting general informations for one or more shares
// @params :
//  symbols : list of share symobols. Ex : ["AAPL","MSFT"]
//  fields  : list of fields needed. Ex : ["regularMarketPrice"]
export const getQuote = async (symbols, fields) => {
  try {
    return await yahooFinance.quote(
      symbols,
      { fields },
      { validateResult: false, currency: "USD" }
    );
  } catch (error) {
    console.error(error);
  }
};

// @info : gets the share price and the short name for a list of symbols
// @returns array which contains an object for
// each symbol (which contain the name and the price)
export const getSharesNamesAndPrices = async (symbols) => {
  var namesAndPrices = {};
  const returnedValue = await getQuote(
    symbols,
    ["regularMarketPrice", "shortName", "currency"],
    { validateResult: false }
  );
  try {
    returnedValue.map((quote) => {
      namesAndPrices[quote.symbol] = {
        name: quote.shortName,
        price: quote.regularMarketPrice,
        currency: quote.currency,
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
    result = await yahooFinance.search(
      searchTerm,
      {},
      { validateResult: false }
    );
  } catch (error) {
    console.error(error);
  }
  return result;
};

// @info : generic method for getting general informations for one or more shares
// @params :
//  symbols : list of share symobols. Ex : ["AAPL","MSFT"]
//  fields  : list of fields needed. Ex : ["regularMarketPrice"]
// export const getQuote = async (symbols, fields) => {
//   return [
//     {
//       language: "en-US",
//       region: "US",
//       quoteType: "EQUITY",
//       quoteSourceName: "Nasdaq Real Time Price",
//       triggerable: true,
//       currency: "USD",
//       exchange: "NMS",
//       shortName: "Apple Inc.",
//       longName: "Apple Inc.",
//       messageBoardId: "finmb_24937",
//       exchangeTimezoneName: "America/New_York",
//       exchangeTimezoneShortName: "EST",
//       gmtOffSetMilliseconds: -18000000,
//       market: "us_market",
//       esgPopulated: false,
//       epsCurrentYear: 4.45,
//       priceEpsCurrentYear: 30.732584,
//       sharesOutstanding: 16788100096,
//       bookValue: 3.936,
//       fiftyDayAverage: 133.31032,
//       fiftyDayAverageChange: 3.4496765,
//       fiftyDayAverageChangePercent: 0.02587704,
//       twoHundredDayAverage: 119.94297,
//       twoHundredDayAverageChange: 16.817024,
//       twoHundredDayAverageChangePercent: 0.1402085,
//       marketCap: 2295940513792,
//       forwardPE: 29.34764,
//       priceToBook: 34.745934,
//       sourceInterval: 15,
//       exchangeDataDelayedBy: 0,
//       tradeable: false,
//       firstTradeDateMilliseconds: new Date("1980-12-12T14:30:00.000Z"),
//       priceHint: 2,
//       marketState: "PREPRE",
//       postMarketChangePercent: -0.058498,
//       postMarketTime: new Date("2021-02-06T00:59:58.000Z"),
//       postMarketPrice: 136.68,
//       postMarketChange: -0.0800018,
//       regularMarketChange: -0.42500305,
//       regularMarketChangePercent: -0.30980286,
//       regularMarketTime: new Date("2021-02-05T21:00:02.000Z"),
//       regularMarketPrice: 136.76,
//       regularMarketDayHigh: 137.41,
//       regularMarketDayRange: { low: 135.86, high: 137.41 },
//       regularMarketDayLow: 135.86,
//       regularMarketVolume: 75693830,
//       regularMarketPreviousClose: 137.185,
//       bid: 0,
//       ask: 0,
//       bidSize: 29,
//       askSize: 11,
//       fullExchangeName: "NasdaqGS",
//       financialCurrency: "USD",
//       regularMarketOpen: 137.35,
//       averageDailyVolume3Month: 106825349,
//       averageDailyVolume10Day: 108468300,
//       fiftyTwoWeekLowChange: 83.6075,
//       fiftyTwoWeekLowChangePercent: 1.572974,
//       fiftyTwoWeekRange: { low: 53.1525, high: 145.09 },
//       fiftyTwoWeekHighChange: -8.330002,
//       fiftyTwoWeekHighChangePercent: -0.057412654,
//       fiftyTwoWeekLow: 53.1525,
//       fiftyTwoWeekHigh: 145.09,
//       dividendDate: new Date("2021-02-11T00:00:00.000Z"),
//       earningsTimestamp: new Date("2021-01-27T16:30:00.000Z"),
//       earningsTimestampStart: new Date("2021-04-28T10:59:00.000Z"),
//       earningsTimestampEnd: new Date("2021-05-03T12:00:00.000Z"),
//       trailingAnnualDividendRate: 0.807,
//       trailingPE: 37.092484,
//       trailingAnnualDividendYield: 0.0058825673,
//       epsTrailingTwelveMonths: 3.687,
//       epsForward: 4.66,
//       displayName: "Apple",
//       symbol: "AAPL",
//     },
//     {
//       language: "en-US",
//       region: "US",
//       quoteType: "EQUITY",
//       quoteSourceName: "Nasdaq Real Time Price",
//       triggerable: true,
//       currency: "USD",
//       exchange: "NMS",
//       shortName: "Google",
//       longName: "Google",
//       messageBoardId: "finmb_24937",
//       exchangeTimezoneName: "America/New_York",
//       exchangeTimezoneShortName: "EST",
//       gmtOffSetMilliseconds: -18000000,
//       market: "us_market",
//       esgPopulated: false,
//       epsCurrentYear: 4.45,
//       priceEpsCurrentYear: 30.732584,
//       sharesOutstanding: 16788100096,
//       bookValue: 3.936,
//       fiftyDayAverage: 133.31032,
//       fiftyDayAverageChange: 3.4496765,
//       fiftyDayAverageChangePercent: 0.02587704,
//       twoHundredDayAverage: 119.94297,
//       twoHundredDayAverageChange: 16.817024,
//       twoHundredDayAverageChangePercent: 0.1402085,
//       marketCap: 2295940513792,
//       forwardPE: 29.34764,
//       priceToBook: 34.745934,
//       sourceInterval: 15,
//       exchangeDataDelayedBy: 0,
//       tradeable: false,
//       firstTradeDateMilliseconds: new Date("1980-12-12T14:30:00.000Z"),
//       priceHint: 2,
//       marketState: "PREPRE",
//       postMarketChangePercent: -0.058498,
//       postMarketTime: new Date("2021-02-06T00:59:58.000Z"),
//       postMarketPrice: 136.68,
//       postMarketChange: -0.0800018,
//       regularMarketChange: -0.42500305,
//       regularMarketChangePercent: -0.30980286,
//       regularMarketTime: new Date("2021-02-05T21:00:02.000Z"),
//       regularMarketPrice: 136.76,
//       regularMarketDayHigh: 137.41,
//       regularMarketDayRange: { low: 135.86, high: 137.41 },
//       regularMarketDayLow: 135.86,
//       regularMarketVolume: 75693830,
//       regularMarketPreviousClose: 137.185,
//       bid: 0,
//       ask: 0,
//       bidSize: 29,
//       askSize: 11,
//       fullExchangeName: "NasdaqGS",
//       financialCurrency: "USD",
//       regularMarketOpen: 137.35,
//       averageDailyVolume3Month: 106825349,
//       averageDailyVolume10Day: 108468300,
//       fiftyTwoWeekLowChange: 83.6075,
//       fiftyTwoWeekLowChangePercent: 1.572974,
//       fiftyTwoWeekRange: { low: 53.1525, high: 145.09 },
//       fiftyTwoWeekHighChange: -8.330002,
//       fiftyTwoWeekHighChangePercent: -0.057412654,
//       fiftyTwoWeekLow: 53.1525,
//       fiftyTwoWeekHigh: 145.09,
//       dividendDate: new Date("2021-02-11T00:00:00.000Z"),
//       earningsTimestamp: new Date("2021-01-27T16:30:00.000Z"),
//       earningsTimestampStart: new Date("2021-04-28T10:59:00.000Z"),
//       earningsTimestampEnd: new Date("2021-05-03T12:00:00.000Z"),
//       trailingAnnualDividendRate: 0.807,
//       trailingPE: 37.092484,
//       trailingAnnualDividendYield: 0.0058825673,
//       epsTrailingTwelveMonths: 3.687,
//       epsForward: 4.66,
//       displayName: "Google",
//       symbol: "GOOG",
//     },
//   ];
// };

// // @info : gets the share price and the short name for a list of symbols
// // @returns array which contains an object for
// // each symbol (which contain the name and the price)
// export const getSharesNamesAndPrices = async (symbols) => {
//   var namesAndPrices = {};
//   const returnedValue = await getQuote(symbols, [
//     "regularMarketPrice",
//     "shortName",
//   ]);
//   try {
//     returnedValue.map((quote) => {
//       namesAndPrices[quote.symbol] = {
//         name: quote.shortName,
//         price: quote.regularMarketPrice,
//       };
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   return namesAndPrices;
// };

// // @info : searches for a specific word on yahoofinance
// // @returns a JSON with the result
// export const search = async (searchTerm) => {
//   return {
//     explains: [],
//     count: 3,
//     quotes: [
//       {
//         exchange: "NMS",
//         shortname: "Alphabet Inc.",
//         quoteType: "EQUITY",
//         symbol: "GOOG",
//         index: "quotes",
//         score: 597831,
//         typeDisp: "Equity",
//         longname: "Alphabet Inc.",
//         isYahooFinance: true,
//       },
//       {
//         exchange: "NMS",
//         shortname: "Apple Inc.",
//         quoteType: "EQUITY",
//         symbol: "AAPL",
//         index: "quotes",
//         score: 597831,
//         typeDisp: "Equity",
//         longname: "Apple Inc.",
//         isYahooFinance: true,
//       },
//       {
//         index: "5167b830a941ed08d275f74473d13e91",
//         name: "Google for Startups",
//         permalink: "google-for-entrepreneurs",
//         isYahooFinance: false,
//       },
//       {
//         index: "26e6817312a98f234d2fcf80fa1abc1c",
//         name: "Google Cloud Platform",
//         permalink: "google-cloud-platform",
//         isYahooFinance: false,
//       },
//     ],
//     news: [],
//     nav: [],
//     lists: [],
//     researchReports: [],
//     totalTime: 20,
//     timeTakenForQuotes: 414,
//     timeTakenForNews: 0,
//     timeTakenForAlgowatchlist: 400,
//     timeTakenForPredefinedScreener: 400,
//     timeTakenForCrunchbase: 400,
//     timeTakenForNav: 400,
//     timeTakenForResearchReports: 0,
//   };
// };
