import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: { flex: 1 },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  name: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 1,
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
  },
  container: {
    margin: 2,
  },
  iconContainer: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  menuTitle: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 5,
  },
});
export default styles;
