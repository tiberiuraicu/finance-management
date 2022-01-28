import React from "react";
import Portfolio from "../../../screens/Portfolio/Portfolio.js";
import AddNewTransaction from "../../../screens/AddNewTransaction/AddNewTransaction.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const PortfolioNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddNewTransaction" component={AddNewTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default PortfolioNavigation;
