import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import DishDetailed from "./src/screens/DishDetailedScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantDetailedPage from "./src/screens/RestaurantDetailedPage";
import OrderScreen from "./src/screens/OrdersScreen";
import Basket from "./src/screens/Basket";
import OrderDetails from "./src/screens/OrderDetails";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <RestaurantItem restaurant={restaurants[0]} />
      <RestaurantItem restaurant={restaurants[1]} /> */}

      {/* <HomeScreen /> */}

      {/* <RestaurantDetailedPage /> */}

      {/* <DishDetailed /> */}

      <Basket />

      {/* <OrderScreen /> */}

      {/* <OrderDetails /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingVertical: 30, //temporary
  },
});
