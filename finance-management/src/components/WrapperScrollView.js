import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { BACKGROUND_COLOR } from "../util/constants/styleConstants";

const WrapperScrollView = (props) => {
  return (
    <View style={styles.wrapperView}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.wrapperScrollView}
      >
        {props.children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperScrollView: {},
  wrapperView: {
    height: "100%",
    backgroundColor:BACKGROUND_COLOR
  },
});

export default WrapperScrollView;
