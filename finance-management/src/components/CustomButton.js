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
        width: "60%",
        height:"5%",
        backgroundColor: "#cfc992",
        borderRadius: 100,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: "5%",
        marginBottom:"5%",

        shadowColor: "#000",
        shadowOffset: {
          width:0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2.62,
        elevation: 5,
      },
      text: {
        color: "#3f708f",
        fontSize: 15,
        alignSelf: "center",
        fontWeight:"bold"
      },
      
});

export default CustomButton;
