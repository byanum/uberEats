import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo } from "react";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import orders from "../../../assets/data/orders.json";
import styles from "./styles";

const order = orders[0];

const OrderDelivery = () => {
  const bottomSheetRef = useRef(null);

  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "grey", width: 100 }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.innerTextA}>14 min</Text>
          {/* icon */}

          <FontAwesome5
            name="shopping-bag"
            size={30}
            color="lightgreen"
            style={{ marginHorizontal: 5 }}
          />
          <Text style={styles.innerTextB}>5 km</Text>
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
            <Text style={styles.userAddress}>{order.User.address}</Text>
          </View>
        </View>

        <View style={styles.items}>
          <Text
            style={{
              fontSize: 18,
              color: "grey",
              fontWeight: "500",
              letterSpacing: 0.5,
              marginBottom: 5,
            }}
          >
            Big Mac x3
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "grey",
              fontWeight: "500",
              letterSpacing: 0.5,
              marginBottom: 5,
            }}
          >
            Coco Cola x3
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "grey",
              fontWeight: "500",
              letterSpacing: 0.5,
              marginBottom: 5,
            }}
          >
            McFlurry Strawberry Ice Cream x3
          </Text>
        </View>
        {/* button */}
        <View style={styles.btn}>
          <Text style={styles.btnText}>Accept Order</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrderDelivery;
