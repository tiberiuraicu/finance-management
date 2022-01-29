import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import WrapperScrollView from "../../components/WrapperScrollView";
import styles from "./Portfolio.style";

const Portfolio = ({ navigation }) => {
  return (
    <WrapperScrollView>
      <Text style={styles.portofolioValueText}>Portfolio value</Text>
      <CustomButton
        onPress={() => {
          navigation.navigate("AddHoldings");
        }}
        text="ADD HOLDINGS"
      ></CustomButton>
      <View style={styles.holdingsList}></View>
    </WrapperScrollView>
  );
};

export default Portfolio;
