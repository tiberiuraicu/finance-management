export const getRatesForCoin = async (fromCoin, toCoin) => {
  const host = "api.frankfurter.app";
  const response = await fetch(
    `https://${host}/latest?amount=1&from=${fromCoin}&to=${toCoin}`
  );
  return response.json();
};
