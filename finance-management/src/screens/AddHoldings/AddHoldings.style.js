import { StyleSheet } from "react-native";
export default StyleSheet.create({
  inputContainer: {
   
    paddingTop: "15%",
    marginTop: "20%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#F2FCFE",
    borderRadius: 10,
  },
  searchTermInput:{
    borderRadius: 10,
    height: "14%",
    borderWidth: 1,
    margin: 11,
    paddingLeft: 10,
  },
  
});

export let searchTermInputText =(symbol)=>{
  return {
    fontSize: 18,
    marginTop: 20,
    color: symbol.value === "" ? "#788793" : "black",
  }
}
