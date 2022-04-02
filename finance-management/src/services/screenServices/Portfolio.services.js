import { getSharesNamesAndPrices } from "../API/yahooFinance/yahooFinance";
import * as storage from "../storage/asyncStorage.js";
import { PORTFOLIO } from "../../util/constants/constants";
import { initializeShareDisplayParameters } from "../../util/models";
import { getRatesForCoin } from "../API/curencyConverter/currencyConverter";

// @info : calculates the following values for each
// share in portfolio : shareTotalValue, shareTotalProfit,
// averageEntryPrice, totalSharesOwned, totalMoneyInvested
// @returns : - total portfolio value
//            - array containing the values mentioned above + symbol, name, price
export async function getDisplayPropertiesForAllShares() {
  // array for placing objects containing
  // display values for each share
  var displaySharesArray = [];
  let portofolioValue = 0;

  try {
    // gets the portfolio object from storage
    var portofolio = await storage.getItem(PORTFOLIO);

    // if there is a portfolio object in storage
    if (portofolio) {
      // list of symbols for the shares in portfolio
      var symbols = Object.keys(portofolio);

      // gets the name and current price for every share in portfolio
      let sharesNamesAndPrices = await getSharesNamesAndPrices(symbols);
console.log(sharesNamesAndPrices)
      // iterate trough every share object
      for (var index in symbols) {
        // create an object containing all the needed
        // display values for a specific share
        var shareDisplayParametersObject = initializeShareDisplayParameters(
          symbols[index],
          sharesNamesAndPrices[symbols[index]].name,
          sharesNamesAndPrices[symbols[index]].price
        );

        // calculate the display values for a specific share
        shareDisplayParametersObject = await calculateShareDisplayParameters(
          portofolio[symbols[index]],
          shareDisplayParametersObject,
          sharesNamesAndPrices[symbols[index]].currency
        );

        // add the object with the calculated
        // values to the array of objects
        displaySharesArray.push(shareDisplayParametersObject);

        // add the share value(invested + profit)
        // to the portfolio value
        portofolioValue += shareDisplayParametersObject.shareTotalValue;
      }
    }
    // return the portfolio value with 2 decimals
    // and the shares to be displayed(if any)
    return [portofolioValue, displaySharesArray];
  } catch (exception) {
    console.log(exception);
    return [0, []];
  }
}

// @info : calculates the display parameters for a specific share
// by iterating trough every transaction added by the user
// @returns : an object containing the calculated display parameters
const calculateShareDisplayParameters = async (
  shareFromStorage,
  shareDisplayParametersObject,
  currency
) => {
  // iterate trough the share transactions array
  shareFromStorage.transactions.map((transaction) => {
    // calculate the amount invested per transaction
    var transactionInvestedAmount =
      Number(transaction.numberOfShares) * Number(transaction.price);

    // add the transaction invested amount to
    // the total money invested in the current share
    shareDisplayParametersObject.totalMoneyInvested +=
      transactionInvestedAmount;

    // add the number of shares bought in the current transaction
    // to the total number of shares (of the current share)
    shareDisplayParametersObject.totalSharesOwned += Number(
      transaction.numberOfShares
    );

    // calculate average entry price
    shareDisplayParametersObject.averageEntryPrice =
      shareDisplayParametersObject.totalMoneyInvested /
      shareDisplayParametersObject.totalSharesOwned;
  });

  let currencyRate = 1;

  if (currency !== "USD") {
    currencyRate = await getRatesForCoin(currency, "USD");
    currencyRate = currencyRate.rates.USD;
  }

  // calculates the total value for the current share
  shareDisplayParametersObject.shareTotalValue =
    shareDisplayParametersObject.totalSharesOwned *
    shareDisplayParametersObject.currentPrice *
    currencyRate;

  // calculates the total profit for the current share
  shareDisplayParametersObject.shareTotalProfit +=
    shareDisplayParametersObject.shareTotalValue -
    shareDisplayParametersObject.totalMoneyInvested * currencyRate;

  return shareDisplayParametersObject;
};

export const deleteAssetFromPortfolio = async (symbol) => {
  await storage.removeItem(symbol);
};
