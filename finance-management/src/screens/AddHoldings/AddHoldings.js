import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

// importing custom components
import TextInputCustom from "../../components/TextInputCustom";
import WrapperScrollView from "../../components/WrapperScrollView";
import CustomButton from "../../components/CustomButton";
import ErrorMessage from "../../components/ErrorMessage";
import SymbolSearchModal from "../../components/SymbolSearchModal";

// importing styles
import styles, { searchTermInputText } from "./AddHoldings.style";

// importing models
import { inputModel, transactionModel } from "../../util/models";

//importing services
import { addHoldings } from "../../services/screenServices/AddHoldings.services";
import { inputValidator } from "../../services/general/InputValidation";

const AddHoldings = () => {
  // get the window height
  const windowHeight = useWindowDimensions().height;

  // hooks for the input fields
  const [symbol, setSymbol] = useState(inputModel());
  const [price, setPrice] = useState(inputModel());
  const [numberOfShares, setNumberOfShares] = useState(inputModel());

  // hook for the modal visibility
  const [searchModalVisibility, setSearchModalVisibility] = useState(false);

  // calls a service function which verifies if the
  // value is correct and then sets the price value
  const setPriceHandler = (valueToBeTested) => {
    inputValidator(valueToBeTested, setPrice, {
      notEmpty: true,
      isNumber: true,
    });
  };

  // calls a service function which verifies if the
  // value is correct and then sets the nunber of shares value
  const setNumberOfSharesHandler = (valueToBeTested) => {
    inputValidator(valueToBeTested, setNumberOfShares, {
      notEmpty: true,
      isNumber: true,
    });
  };

  // calls a service function which adds a new transaction
  // to portfolio. It will execute only if the value from
  // each field is correct
  const addHoldingsHandler = async () => {
    // if the values from every field are correct
    if (symbol.validation && price.validation && numberOfShares.validation) {
      // creates a new transaction object
      const transaction = transactionModel(price.value, numberOfShares.value);

      //calls the addHoldings method
      let result = await addHoldings(transaction, symbol.value);

      // if the transaction was added successfully
      if (result)
        // show transaction added alert
        Alert.alert("", "Transaction added");
      // else show transaction failed
      else Alert.alert("", "Transaction failed");
    }
  };
  return (
    <WrapperScrollView>
      {/* the view which contains the inputs */}
      <View
        style={{
          ...styles.inputContainer,

          // give it a specific height based on screen height
          minHeight: Math.round(windowHeight / 1.5),
        }}
      >
        {/* looks like an input
         => when it is pressed a modal appears
            which lets the user search for a share */}
        <TouchableOpacity
          onPress={() => {
            setSearchModalVisibility(true);
          }}
          style={styles.searchTermInput}
        >
          {/* will have either a placeholder value or 
          the selected share symbol(from the modal) */}
          <Text style={searchTermInputText(symbol)}>
            {symbol.value !== "" ? symbol.value : "Search term"}
          </Text>
        </TouchableOpacity>

        {/* the modal in which the user searches for a specific share */}
        {searchModalVisibility && (
          <SymbolSearchModal
            searchModalVisibility={searchModalVisibility}
            setSearchModalVisibility={setSearchModalVisibility}
            symbol={symbol}
            setSymbol={setSymbol}
          ></SymbolSearchModal>
        )}

        {/* symbol error message */}
        <ErrorMessage errorTruthValue={symbol.validation}>
          {symbol.errorMessage}
        </ErrorMessage>

        {/* the user can enter the price 
        for which an asset has been bought */}
        <TextInputCustom
          placeholder="Price"
          value={price.value}
          onChangeText={setPriceHandler}
          keyboardType="numeric"
        ></TextInputCustom>

        {/* price error message */}
        <ErrorMessage errorTruthValue={price.validation}>
          {price.errorMessage}
        </ErrorMessage>

        {/* the user can enter the 
       number of shares bought */}
        <TextInputCustom
          placeholder="Number of shares"
          value={numberOfShares.value}
          onChangeText={setNumberOfSharesHandler}
          keyboardType="numeric"
        ></TextInputCustom>

        {/* number of shares error message */}
        <ErrorMessage errorTruthValue={numberOfShares.validation}>
          {numberOfShares.errorMessage}
        </ErrorMessage>

        {/* adds the transaction to portfolio */}
        <CustomButton
          text="ADD HOLDING"
          onPress={addHoldingsHandler}
        ></CustomButton>
      </View>
    </WrapperScrollView>
  );
};

export default AddHoldings;
