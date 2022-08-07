import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import orders from "./assets/data/orders.json";

import OrderScreen from "./src/screens/OrderScreen.js";
import OrderDelivery from "./src/screens/OrderDelivery";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <SafeAreaView> */}
      {/* <OrderScreen /> */}
      <OrderDelivery />
      <StatusBar style="auto" />
      {/* </SafeAreaView> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
});
