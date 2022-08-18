import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { Courier, TransportationModes } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
const ProfileScreen = () => {
  const { dbCourier, sub, setdbCourier } = useAuthContext();

  const [name, setName] = useState(dbCourier?.name || "");

  const [transportationMode, setTransportationMode] = useState(
    TransportationModes.DRIVING
  );

  const navigation = useNavigation();

  const onSave = async () => {
    if (dbCourier) {
      await updatedCourier();
    } else {
      await createCourier();
    }
    navigation.goBack("");
  };

  const updatedCourier = async () => {
    const courier = await DataStore.save(
      Courier.copyOf(dbCourier, (updated) => {
        updated.name = name;
        updated.transportationMode = transportationMode;
      })
    );
    setdbCourier(courier);
  };

  const createCourier = async () => {
    try {
      const courier = await DataStore.save(
        new Courier({
          name,

          lat: 33.498387,
          lng: 73.044901,
          sub,
          transportationMode,
        })
      );
      setdbCourier(courier);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <View style={{ flexDirection: "row" }}>
        {/* button 1 */}
        <Pressable
          onPress={() => setTransportationMode(TransportationModes.BICYCLING)}
          style={{
            margin: 10,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 10,
            backgroundColor:
              transportationMode === TransportationModes.BICYCLING
                ? "lightgreen"
                : "white",
            padding: 10,
          }}
        >
          <MaterialIcons name="pedal-bike" size={40} color="black" />
        </Pressable>

        {/* button 2 */}
        <Pressable
          onPress={() => setTransportationMode(TransportationModes.DRIVING)}
          style={{
            margin: 10,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 10,
            backgroundColor:
              transportationMode === TransportationModes.DRIVING
                ? "lightgreen"
                : "white",
            padding: 10,
          }}
        >
          <FontAwesome5 name="car" size={40} color="black" />
        </Pressable>
      </View>

      <Button onPress={onSave} title="Save" style={{ margin: 10 }} />
      <Button
        onPress={() => Auth.signOut()} //Auth signout (2)
        title="Sign Out"
        style={{ textAlign: "center", color: "red" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default ProfileScreen;
