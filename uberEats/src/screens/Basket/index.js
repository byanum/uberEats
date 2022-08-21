import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

import BasketDishItem from "../../components/BasketDishItem";

import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";

import { useNavigation } from "@react-navigation/native";
// import restaurants from "../../../assets/data/restaurants.json";
// const restaurant = restaurants[0]; //dummy data

export default function Basket() {
  const { restaurant, basketDishes, totalPrice } = useBasketContext();
  const { createOrder } = useOrderContext();

  const navigation = useNavigation();

  const onCreateOrder = async () => {
    const newOrder = await createOrder();
    navigation.navigate("OrdersTab", {
      screen: "Order",
      params: { id: newOrder.id },
    });
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{restaurant?.name}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your Items
      </Text>
      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />
      {/* button */}
      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.btnText}>
          Create Order &#8226; ${totalPrice.toFixed(2)}
        </Text>
      </Pressable>
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
