import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome5, Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

import { DataStore } from "aws-amplify";
import { Order, OrderDish, User } from "../../models";

import { useOrderContext } from "../../contexts/OrderContext";
// >dummy
// import orders from "../../../assets/data/orders.json";
// const order = orders[0];

// enums for order statuses
const ORDER_STATUSES = {
  READY_FOR_PICKUP: "READY_FOR_PICKUP",
  ACCEPTED: "ACCEPTED",
  PICKED_UP: "PICKED_UP",
};

const OrderDelivery = () => {
  // const [order, setOrder] = useState(null);
  // const [user, setUser] = useState(null);
  // const [dishes, setDishes] = useState([]);
  const navigation = useNavigation();

  const [driversLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  // const [deliveryStatus, setDeliveryStatus] = useState(
  //   ORDER_STATUSES.READY_FOR_PICKUP
  // );
  const [isDriverClose, setIsDriverClose] = useState(false);
  // accept order: get
  const { acceptOrder, fetchOrder, order, user, dishes } = useOrderContext();

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const { height, width } = useWindowDimensions();
  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  // route: getting id
  const route = useRoute();
  const id = route.params?.id;

  // fetch orders
  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  // requesting user's location
  useEffect(() => {
    // alternate way of creating and calling a function
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === "granted") {
        console.warn("Location Access Denied from User");
        // return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();

    // asynchronusly moving through the direction | ask permission
    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100,
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );
    // giving probs !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // return foregroundSubscription;
    // cleaning up and not re running again n again
  }, []);

  // BUTTON

  const onButtonPressed = () => {
    if (order.status === "READY_FOR_PICKUP") {
      bottomSheetRef.current?.collapse();
      // animating: zoom on in driver
      mapRef.current.animateToRegion({
        latitude: driversLocation.latitude,
        longitude: driversLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      // setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
      acceptOrder();
    }

    if (order.status === "ACCEPTED") {
      //  setDeliveryStatus(ORDER_STATUSES.PICKED_UP);
      bottomSheetRef.current?.collapse();
    }

    if (order.status === "PICKED_UP") {
      console.warn("Delivery Finished");
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  // rendering button
  const renderButtonTitle = () => {
    if (order.status === "READY_FOR_PICKUP") {
      return "Accept Order";
    }
    if (order.status === "ACCEPTED") {
      return "Pick up Order";
    }
    if (order.status === "PICKED_UP") {
      return "Complete Delivery";
    }
  };

  // disbale button
  const isButtonPressable = () => {
    if (order.status === "READY_FOR_PICKUP") {
      return false;
    }
    if (order.status === "ACCEPTED" && isDriverClose) {
      return false;
    }
    if (order.status === "PICKED_UP" && isDriverClose) {
      return false;
    }
    return true;
  };

  // objects for restaurant location
  const restaurantLocation = {
    latitude: order?.Restaurant?.lat,
    longitude: order?.Restaurant?.lng,
  };

  // objects for user location
  const userLocation = {
    latitude: user?.lat,
    longitude: user?.lng,
  };

  // if not set
  if (!driversLocation) {
    return <ActivityIndicator style={{ marginTop: 100 }} size={"large"} />;
  }

  // if not set
  if (!order || !driversLocation || !user) {
    return <ActivityIndicator style={{ marginTop: 100 }} size={"large"} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ height, width }}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: driversLocation.latitude,
          longitude: driversLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driversLocation}
          destination={
            order.status === "ACCEPTED" ? restaurantLocation : userLocation
          }
          strokeWidth={10}
          waypoints={
            order.status === "READY_FOR_PICKUP" ? [restaurantLocation] : []
          }
          strokeColor="#3120E0"
          apikey={"AIzaSyCZPcQ0gles-DIf0jYaQGShSEh3EfmOtc8"}
          onReady={(result) => {
            setIsDriverClose(result.distance < 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        {/* Marker 1 */}
        <Marker
          coordinate={{
            restaurantLocation,
          }}
          title={order.Restaurant.name}
          description={order.Restaurant.address}
        >
          <FontAwesome5
            name="shopping-basket"
            size={30}
            color="black"
            style={{ marginHorizontal: 5 }}
          />
        </Marker>

        {/* Marker 2 */}
        <Marker
          coordinate={{
            userLocation,
          }}
          title={user.name}
          description={user.address}
        >
          <FontAwesome5
            name="user"
            size={30}
            color="black"
            style={{ marginHorizontal: 5 }}
          />
        </Marker>
      </MapView>
      {order.status === "READY_FOR_PICKUP" && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color="black"
          style={{ top: 40, left: 15, position: "absolute" }}
        />
      )}
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
          {/* {dishes.map((dishItem) => {
            <Text style={styles.dish} key={dishItem.id}>
              {dishItem.Dish.name} x {dishItem.quantity}
            </Text>;
          })} */}
          {dishes.map((dishItem) => (
            <Text style={styles.dish} key={dishItem.id}>
              {dishItem.Dish.name} x {dishItem.quantity}
            </Text>
          ))}
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
          <Text style={styles.btnText}>{renderButtonTitle()}</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default OrderDelivery;
