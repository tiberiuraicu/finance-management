import React from "react";
import Portfolio from "../../../screens/Portfolio/Portfolio.js";
import AddHoldings from "../../../screens/AddHoldings/AddHoldings.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const PortfolioNavigation = () => {
  const options = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          options={options}
        />
        <Stack.Screen
          name="AddHoldings"
          component={AddHoldings}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default PortfolioNavigation;
