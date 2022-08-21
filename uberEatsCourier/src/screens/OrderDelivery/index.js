import {
  View,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useRef, useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import BottomSheetDetails from "./BottomSheetDetails";
import { useAuthContext } from "../../contexts/AuthContext";
import { useOrderContext } from "../../contexts/OrderContext";
import CustomMarker from "../../components/CustomMarker";
import { DataStore } from "aws-amplify";
import { Courier } from "../../models";

const OrderDelivery = () => {
  const navigation = useNavigation();
  const { order, user, fetchOrder } = useOrderContext();
  const { dbCourier } = useOrderContext();
  const [driversLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);

  const mapRef = useRef(null);
  const { height, width } = useWindowDimensions();

  // route: getting id
  const route = useRoute();
  const id = route.params?.id;

  // fetch orders
  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  // saving driver's location in datastore as it changes every 100m
  useEffect(() => {
    if (!driversLocation) {
      return;
    }
    DataStore.save(
      Courier.copyOf(dbCourier, (updated) => {
        updated.lat = driversLocation.latitude;
        updated.lng = driversLocation.longitude;
      })
    );
  }, [driversLocation]);

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
    return foregroundSubscription;
    // cleaning up and not re running again n again
  }, []);

  const zoomOnInDriver = () => {
    mapRef.current.animateToRegion({
      latitude: driversLocation.latitude,
      longitude: driversLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
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
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <CustomMarker data={order.Restaurant} type="RESTAURANT" />

        <CustomMarker data={user} type="USER" />
      </MapView>

      <BottomSheetDetails
        totalKm={totalKm}
        totalMinutes={totalMinutes}
        onAccepted={zoomOnInDriver}
      />
      {order.status === "READY_FOR_PICKUP" && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color="black"
          style={{ top: 40, left: 15, position: "absolute" }}
        />
      )}
    </View>
  );
};

export default OrderDelivery;
