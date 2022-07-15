import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailedPage from "../screens/RestaurantDetailedPage";
import OrderDetails from "../screens/OrderDetails";
import OrderScreen from "../screens/OrdersScreen";
import DishDetailed from "../screens/DishDetailedScreen";
import Basket from "../screens/Basket";
// import HomeScreen from "../screens/HomeScreen";

// import OrderScreen from "../screens/OrdersScreen";
// import Basket from "../screens/Basket";

const Stack = createStackNavigator(); //create stack navigator :: contains stack.navigator & stack.screen

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
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
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={OrderScreen}
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
      <HomeStack.Screen name="Restaurant" component={RestaurantDetailedPage} />
      <HomeStack.Screen name="Dish" component={DishDetailed} />
      <HomeStack.Screen name="Basket" component={Basket} />
      {/* <HomeStack.Screen name="Profile" component={Profile} />
        <HomeStack.Screen name="Settings" component={Settings} /> */}
    </HomeStack.Navigator>
  );
};

const OrderStack = createStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Orders" component={OrderScreen} />
      <OrderStack.Screen name="Order" component={OrderDetails} />
    </OrderStack.Navigator>
  );
};
export default RootNavigator;
