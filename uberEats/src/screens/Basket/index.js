import { StyleSheet, View, Text, FlatList } from "react-native";

import restaurants from "../../../assets/data/restaurants.json";

import BasketDishItem from "../../components/BasketDishItem";

const restaurant = restaurants[0]; //dummy data

export default function Basket() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your Items
      </Text>
      <FlatList
        data={restaurant.dishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />
      {/* button */}
      <View style={styles.button}>
        <Text style={styles.btnText}>Create Order</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "grey",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  quantityStyle: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",

    padding: 20,
    marginTop: "auto",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
