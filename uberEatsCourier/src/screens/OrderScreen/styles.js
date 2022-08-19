import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
  },
  innerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  textA: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
    paddingBottom: 5,
  },
  textDB: {
    letterSpacing: 0.5,
    color: "grey",
  },
  map: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
