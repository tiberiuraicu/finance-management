import React from "react";
import { StyleSheet, TouchableOpacity,Text } from "react-native";

const CustomButton = (props) => {
  return  <TouchableOpacity {...props}
  style={{ ...styles.button, ...props.style }}>
      <Text style={styles.text}>{props.text}</Text>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        width: "80%",
        height:"14%",
        backgroundColor: "black",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: "5%",
        marginBottom:"5%"
      },
      text: {
        color: "#ffffff",
        fontSize: 15,
        alignSelf: "center",
      },
});

export default CustomButton;
