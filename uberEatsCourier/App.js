import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import NavigationScreen from "./src/navigation";

import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./aws-exports";

import AuthContextProvider from "./src/contexts/AuthContext";
import OrderContextProvider from "./src/contexts/OrderContext";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

// as it dont have analytics, so override it with the below code
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <OrderContextProvider>
            <NavigationScreen />
          </OrderContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
