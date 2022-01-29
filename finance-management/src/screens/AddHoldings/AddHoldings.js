import React from "react";
import { View, useWindowDimensions } from "react-native";
import TextInputCustom from "../../components/TextInputCustom";
import WrapperScrollView from "../../components/WrapperScrollView";
import CustomButton from "../../components/CustomButton";
import styles from "./AddHoldings.style";

const AddHoldings = () => {
  const windowHeight = useWindowDimensions().height;

  return (
    <WrapperScrollView>
      <View style={[{...styles.inputContainer, minHeight: Math.round(windowHeight) }]}>
        <TextInputCustom></TextInputCustom>
        <TextInputCustom></TextInputCustom>
        <TextInputCustom></TextInputCustom>
        <CustomButton>Add holdings</CustomButton>
      </View>
    </WrapperScrollView>
  );
};

export default AddHoldings;
