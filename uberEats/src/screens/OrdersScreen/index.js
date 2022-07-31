import { View, Text, FlatList } from "react-native";
import React from "react";
import OrderListItem from "../../components/OrderListItem";
import restaurants from "../../../assets/data/restaurants.json";
import orders from "../../../assets/data/orders.json";
const OrderScreen = () => {
  return (
    <View style={{ flex: 1, width: "100%", paddingTop: 10 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;
