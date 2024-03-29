import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailedPage from "../screens/RestaurantDetailedPage";
import OrderDetails from "../screens/OrderDetails";
import OrdersScreen from "../screens/OrdersScreen";
import DishDetailed from "../screens/DishDetailedScreen";
import Basket from "../screens/Basket";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";
import OrderDetailsNavigator from "./OrderDetailsNavigator";

// import OrderScreen from "../screens/OrdersScreen";
// import Basket from "../screens/Basket";

const Stack = createStackNavigator(); //create stack navigator :: contains stack.navigator & stack.screen

const RootNavigator = () => {
  const { dbUser } = useAuthContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailedPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dish" component={DishDetailed} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

const OrderStack = createStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
      <OrderStack.Screen
        name="Order"
        component={OrderDetailsNavigator}
        screenOptions={{ headerShown: false }}
      />
    </OrderStack.Navigator>
  );
};
export default RootNavigator;
