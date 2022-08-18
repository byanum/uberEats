import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import NavigationScreen from "./src/navigation";

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "aws-amplify-react-native";

import awsconfig from "./aws-exports";

// as it dont have analytics, so override it with the below code
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <NavigationScreen />
        <StatusBar style="auto" />
      </NavigationContainer>
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

export default withAuthenticator(App);
