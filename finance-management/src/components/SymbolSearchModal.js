import React, { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { getShareNamesAndSymbolsForSearchTerm } from "../services/componentServices/SymbolSearchModal.services";

import TextInputCustom from "./TextInputCustom";

import { ListForSearch } from "./ListForSearch";

export const SymbolSearchModal = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const setSearchResultsHandler = async (searchTerm) => {
    setSearchResults(await getShareNamesAndSymbolsForSearchTerm(searchTerm));
  };

  const onItemPress = (symbol) => {
    props.setSymbol({
      ...props.symbol,
      value: symbol,
      validation: true,
    });
    setSearchResults([]);
    props.setSearchModalVisibility(false);
  };

  return (
    <Modal
      isVisible={props.searchModalVisibility}
      onRequestClose={() => {
        props.setSearchModalVisibility(false);
      }}
      statusBarTranslucent={true}
    >
      <TouchableOpacity
        onPress={() => {
          props.setSearchModalVisibility(false);
        }}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "#F2FCFE",
          
          }}
        >
          <View
            style={{
              height: "60%",
              paddingTop: "7%",
            }}
          >
            <TextInputCustom
              autoFocus={true}
              placeholder=" Search term"
              onChangeText={setSearchResultsHandler}
            />
            <ListForSearch
              onPress={onItemPress}
              data={searchResults}
            ></ListForSearch>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default SymbolSearchModal;
