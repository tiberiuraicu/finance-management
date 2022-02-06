import { TouchableOpacity, FlatList } from "react-native";

import Card from "./Card";
import CustomRow from "./CustomRow";
import CustomText from "./CustomText";

export const ListForSearch = (props) => {
  return (
    <FlatList
      data={props.data}
      keyboardShouldPersistTaps="always"
      renderItem={(itemData) => (
        <TouchableOpacity
          key={itemData.item.name}
          onPress={() => props.onPress(itemData.item.symbol)}
        >
          <Card>
            <CustomRow>
              <CustomText>{itemData.item.symbol}</CustomText>
              <CustomText>{itemData.item.name}</CustomText>
            </CustomRow>
          </Card>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default ListForSearch;
