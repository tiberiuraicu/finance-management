export const inputModel = () => {
  return {
    value: "",
    validation: false,
    errorMessage: "",
  };
};

export const transactionModel = (price, numberOfShares) => {
  return {
    price: price,
    numberOfShares: numberOfShares,
  };
};

export const initializeShareDisplayParameters = (symbol, name, price) => {
  return {
    symbol: symbol,
    companyName: name,
    currentPrice: price,
    shareTotalValue: 0,
    shareTotalProfit: 0,
    averageEntryPrice: 0,
    totalSharesOwned: 0,
    totalMoneyInvested: 0,
  };
};
