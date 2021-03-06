import { StyleSheet, View, Text } from "react-native";
import React from "react";
import restaurants from "../../../assets/data/restaurants.json";

const restaurant = restaurants[0]; //dummy data

export default function BasketDishItem({ basketDish }) {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>1</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketDish.name}</Text>
      <Text style={{ marginLeft: "auto" }}>{basketDish.price}</Text>
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
