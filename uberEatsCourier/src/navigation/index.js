import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screens/OrderScreen";
import OrderDelivery from "../screens/OrderDelivery";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const { dbCourier, loading } = useAuthContext();

  if (loading) {
    return <ActivityIndicator size="large" color="grey" />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbCourier ? (
        //using <> because cant put two screens in one condition
        <>
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        </>
      ) : (
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationScreen;
