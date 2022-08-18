import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
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
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  innerTextA: {
    fontSize: 25,
    letterSpacing: 1,
  },
  innerTextB: {
    fontSize: 25,
    letterSpacing: 1,
  },
  name: {
    fontSize: 25,
    letterSpacing: 1,
    paddingVertical: 20,
  },
  address: {
    fontSize: 20,
    color: "grey",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  userAddress: {
    fontSize: 20,
    color: "grey",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  items: {
    borderTopWidth: 1,
    borderColor: "lightgrey",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: "auto",
    padding: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  dish: {
    fontSize: 18,
    color: "grey",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
});
