import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation";
import { withAuthenticator } from "aws-amplify-react-native"; //higher order //1 (Auth)
import Amplify from "aws-amplify"; //Amazon (1)
import config from "./src/aws-exports"; //Amazon (2)
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
Amplify.configure({ ...config, Analytics: { disabled: true } }); //configure aws  //Amazon (3)

function App() {
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

      <AuthContextProvider>
        <BasketContextProvider>
          <RootNavigator />
        </BasketContextProvider>
      </AuthContextProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App); //2 (Auth)
