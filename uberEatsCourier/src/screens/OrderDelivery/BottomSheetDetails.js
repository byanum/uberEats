import { View, Text, Pressable } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo, useEffect, useState } from "react";

import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

import { useOrderContext } from "../../contexts/OrderContext";

const STATUS_TO_TITLE = {
  READY_FOR_PICKUP: "Accept Order",
  ACCEPTED: "Pick up order",
  PICKED_UP: "Complete Delivery",
};

const BottomSheetDetails = (props) => {
  const navigation = useNavigation();

  const [driversLocation, setDriverLocation] = useState(null);
  const { totalMinutes, totalKm, onAccepted } = props;

  const isDriverClose = totalKm <= 1; //decrease for higher accuracy
  // accept order: get
  const { acceptOrder, order, user, dishes, completeOrder, pickUpOrder } =
    useOrderContext();

  const bottomSheetRef = useRef(null);

  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);

  // disbale button
  const isButtonPressable = () => {
    const { status } = order;
    if (status === "READY_FOR_PICKUP") {
      return false;
    }
    if ((status === "ACCEPTED" || status === "PICKED_UP") && isDriverClose) {
      return false;
    }
    return true;
  };

  // BUTTON
  const onButtonPressed = async () => {
    const { status } = order;
    if (status === "READY_FOR_PICKUP") {
      bottomSheetRef.current?.collapse();
      // animating: zoom on in driver
      await acceptOrder();
      onAccepted();
    }
    if (status === "ACCEPTED") {
      bottomSheetRef.current?.collapse();
      await pickUpOrder();
    }
    if (status === "PICKED_UP") {
      await completeOrder(); //await then go to navigation
      console.warn("Delivery Finished");
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "grey", width: 100 }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.innerTextA}>{totalMinutes.toFixed(0)} min</Text>
        {/* icon */}

        <FontAwesome5
          name="shopping-bag"
          size={30}
          color="lightgreen"
          style={{ marginHorizontal: 5 }}
        />
        <Text style={styles.innerTextB}>{totalKm.toFixed(2)} km</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name}>{order.Restaurant.name}</Text>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Fontisto
            name="shopping-store"
            size={20}
            color="#3F4E4F"
            style={{ marginHorizontal: 5 }}
          />

          <Text style={styles.address}>{order.Restaurant.address}</Text>
        </View>

        <View style={{ flexDirection: "row", padding: 5 }}>
          <FontAwesome5
            name="map-marker-alt"
            size={20}
            color="#3F4E4F"
            style={{ marginHorizontal: 5 }}
          />
          <Text style={styles.userAddress}>{user.address}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {dishes?.map((dishItem) => {
          <Text style={styles.dish} key={dishItem.id}>
            {dishItem.Dish.name} x {dishItem.quantity}
          </Text>;
        })}
      </View>
      {/* button */}
      <Pressable
        style={{
          ...styles.btn,
          backgroundColor: isButtonPressable() ? "grey" : "#7DCE13",
        }}
        onPress={onButtonPressed}
        disabled={isButtonPressable()}
      >
        <Text style={styles.btnText}>{STATUS_TO_TITLE[order.status]}</Text>
      </Pressable>
    </BottomSheet>
  );
};

export default BottomSheetDetails;
