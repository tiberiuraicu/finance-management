import React from "react";
import { Text } from "react-native";

const ErrorMessage = (props) => {
  function errorMessageColor(errorTruthValue) {
    return {
      color: !errorTruthValue ? "red" : "transparent",
      marginLeft: "5%",
      height: "5%",
    };
  }
  return (
    <Text
      style={{ ...errorMessageColor(props.errorTruthValue), ...props.style }}
    >
      {props.children}
    </Text>
  );
};

export default ErrorMessage;
