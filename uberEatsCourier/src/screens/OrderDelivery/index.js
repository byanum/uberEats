import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import orders from "../../../assets/data/orders.json";
import styles from "./styles";
import { or } from "react-native-reanimated";

const order = orders[0];

const OrderDelivery = () => {
  const [driversLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);

  const bottomSheetRef = useRef(null);
  const { height, width } = useWindowDimensions();
  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);

  // requesting user's location
  useEffect(() => {
    // alternate way of creating and calling a function
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === "granted") {
        console.log("Location Access Denied from User");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();

    // asynchronusly moving through the direction
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
    // cleaning up and not re running again n again
    return foregroundSubscription;
  }, []);

  // if not set
  if (!driversLocation) {
    return <ActivityIndicator style={{ marginTop: 100 }} size={"large"} />;
  }

  return (
    <View style={styles.container}>
      <MapView
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
          destination={{ latitude: order.User.lat, longitude: order.User.lng }}
          strokeWidth={10}
          waypoints={[
            { latitude: order.Restaurant.lat, longitude: order.Restaurant.lng },
          ]}
          strokeColor="#3120E0"
          apikey={"AIzaSyCZPcQ0gles-DIf0jYaQGShSEh3EfmOtc8"}
          onReady={(result) => {
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        {/* Marker 1 */}
        <Marker
          coordinate={{
            latitude: order.Restaurant.lat,
            longitude: order.Restaurant.lng,
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
            latitude: order.User.lat,
            longitude: order.User.lng,
          }}
          title={order.User.name}
          description={order.User.address}
        >
          <FontAwesome5
            name="user"
            size={30}
            color="black"
            style={{ marginHorizontal: 5 }}
          />
        </Marker>
      </MapView>
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
