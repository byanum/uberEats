import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      {/* <RestaurantItem restaurant={restaurants[0]} />
      <RestaurantItem restaurant={restaurants[1]} /> */}

      {/* <HomeScreen /> */}

      {/* <RestaurantDetailedPage /> */}

      {/* <DishDetailed /> */}

      {/* <Basket /> */}

      {/* <OrderScreen /> */}

      {/* <OrderDetails /> */}

      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
