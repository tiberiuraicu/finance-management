import * as storage from "../storage/asyncStorage.js";
import { PORTFOLIO } from "../../util/constants/constants.js";

// @info : adds a new holding to the user's portfolio
// @param :
//      - transaction : json object which contains the price and the number of shares bought
//      - symbol : share symbol
export const addHoldings = async (transaction, symbol) => {
  if (transactionIsValid(transaction, symbol))
    try {
      var portfolio = {};
      var share = {
        symbol: symbol,
        transactions: [],
      };

      var portfolioFromStorage = await storage.getItem(PORTFOLIO);

      // if the protofolio object already exists replace the empty one
      // declared at the start of the method with the one from storage
      if (portfolioFromStorage !== null) portfolio = portfolioFromStorage;

      // if the share already exists in protfolio
      if (portfolio[symbol] !== undefined) {
        // add a new transaction to it
        portfolio[symbol].transactions.push(transaction);
      } else {
        // add transaction to the share object
        share.transactions.push(transaction);
        // add the share object to portfolio
        portfolio[symbol] = share;

      }
      //set the portfolio object in storage
      await storage.setItem(PORTFOLIO, portfolio);
      return true;
    } catch (exception) {
      console.error(exception)

      return false;
    }
  else return false;
};

const transactionIsValid = (transaction, symbol) => {
  if (
    symbol !== undefined &&
    symbol !== null &&
    transaction !== null &&
    transaction["price"] &&
    transaction["numberOfShares"]
  )
    return true;
  else return false;
};




