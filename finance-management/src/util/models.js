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
