import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";

import TextInputCustom from "../../components/TextInputCustom";
import WrapperScrollView from "../../components/WrapperScrollView";
import CustomButton from "../../components/CustomButton";
import ErrorMessage from "../../components/ErrorMessage";

import styles from "./AddHoldings.style";
import { inputModel } from "../../util/models";

import {
  addHoldings,
  inputValidator,
} from "../../services/screenServices/AddHoldings.services";

const AddHoldings = () => {
  const windowHeight = useWindowDimensions().height / 1.5;
  const [symbol, setSymbol] = useState(inputModel());
  const [price, setPrice] = useState(inputModel());
  const [numberOfShares, setNumberOfShares] = useState(inputModel());

  const setPriceHandler = (valueToBeTested) => {
    inputValidator(valueToBeTested, price, setPrice);
  };
  const setNumberOfSharesHandler = (valueToBeTested) => {
    inputValidator(valueToBeTested, numberOfShares, setNumberOfShares);
  };

  return (
    <WrapperScrollView>
      <View
        style={{
          ...styles.inputContainer,
          minHeight: Math.round(windowHeight),
        }}
      >
        <TextInputCustom placeholder="Symbol"></TextInputCustom>

        <TextInputCustom
          placeholder="Price"
          value={price.value}
          onChangeText={setPriceHandler}
        ></TextInputCustom>

        <ErrorMessage errorTruthValue={price.validation}>
          {price.errorMessage}
        </ErrorMessage>

        <TextInputCustom
          placeholder="Number of shares"
          value={numberOfShares.value}
          onChangeText={setNumberOfSharesHandler}
        ></TextInputCustom>

        <ErrorMessage errorTruthValue={numberOfShares.validation}>
          {numberOfShares.errorMessage}
        </ErrorMessage>

        <CustomButton text="ADD HOLDING"></CustomButton>
      </View>
    </WrapperScrollView>
  );
};

export default AddHoldings;
