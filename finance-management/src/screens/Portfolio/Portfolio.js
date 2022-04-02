import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  getDisplayPropertiesForAllShares,
  deleteAssetFromPortfolio,
} from "../../services/screenServices/Portfolio.services";
import Card from "../../components/Card";
import CustomButton from "../../components/CustomButton";
import styles from "./Portfolio.style";
import CustomText from "../../components/CustomText";
import CustomRow from "../../components/CustomRow";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BACKGROUND_COLOR } from "../../util/constants/styleConstants";

const Portfolio = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioShares, setPortfolioShares] = useState([]);

  async function setPortofolioValueHandler() {
    const [calculatedPortofolioValue, displayProperties] =
      await getDisplayPropertiesForAllShares();
    setPortfolioShares(displayProperties);
    setPortfolioValue(calculatedPortofolioValue);
  }
  useEffect(() => {
    if (isFocused) {
      setPortofolioValueHandler();
    }
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: BACKGROUND_COLOR, height: "110%" }}>
      <Text style={styles.portofolioValueText}>
        {portfolioValue.toFixed(2)} $
      </Text>
      <CustomButton
        onPress={() => {
          navigation.navigate("AddHoldings", { isAddHolding: true });
        }}
        text="ADD HOLDINGS"
      ></CustomButton>

      <FlatList
        contentContainerStyle={{ paddingBottom: "30%" }}
        style={{ ...styles.holdingsList }}
        data={portfolioShares}
        renderItem={(itemData) => (
          <CustomRow style={{ justifyContent: "space-evenly" }}>
            <Card
              key={itemData.item.name}
              style={{ width: "90%", backgroundColor: "#ebf2f6" }}
            >
              <CustomRow style={{ justifyContent: "center" }}>
                <CustomText style={{ fontWeight: "bold", fontStyle: "normal" }}>
                  {itemData.item.companyName}
                </CustomText>
              </CustomRow>
              <CustomRow>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#ddeef0",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 2,
                  }}
                >
                  <Text>{itemData.item.symbol}</Text>
                </View>
                <CustomRow style={{ flexDirection: "column" }}>
                  <CustomText
                    style={{
                      color:
                        itemData.item.shareTotalProfit > 0 ? "green" : "red",
                    }}
                  >
                    {itemData.item.shareTotalProfit.toFixed(2)}
                  </CustomText>
                  <CustomText>
                    {itemData.item.shareTotalValue.toFixed(2)}
                  </CustomText>
                </CustomRow>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "20%",
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      await deleteAssetFromPortfolio(itemData.item.symbol);
                      setPortofolioValueHandler();
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      color={"#f36f8f"}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("AddHoldings", {
                        isAddHolding: false,
                        symbolForEdit: itemData.item.symbol,
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      color={"#848585"}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </CustomRow>
            </Card>
          </CustomRow>
        )}
      />
    </View>
  );
};

export default Portfolio;
