import { StyleSheet, View, Text } from "react-native";

// import restaurants from "../../../assets/data/restaurants.json";
// const restaurant = restaurants[0]; //dummy data

export default function BasketDishItem({ basketDish }) {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketDish.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketDish.Dish.name}</Text>
      <Text style={{ marginLeft: "auto" }}>$ {basketDish.Dish.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },

  quantityContainer: {
    backgroundColor: "grey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 2,
  },
});
