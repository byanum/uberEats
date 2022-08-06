import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";

import orders from "./assets/data/orders.json";
import OrderItem from "./src/components/OrderItem";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem order={item} />}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
});
