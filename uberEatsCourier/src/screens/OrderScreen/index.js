import { useRef, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";

import OrderItem from "../../components/OrderItem";
import styles from "./styles";
import * as Location from "expo-location";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";
import CustomMarker from "../../components/CustomMarker";

const OrderScreen = () => {
  const bottomSheetRef = useRef(null);
  const { height, width } = useWindowDimensions();

  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);

  const [orders, setOrders] = useState([]);
  const [driversLocation, setDriverLocation] = useState(null);
  // for quering orders
  const fetchOrder = () => {
    DataStore.query(Order, (order) =>
      order.status("eq", "READY_FOR_PICKUP")
    ).then(setOrders);
  };

  useEffect(() => {
    fetchOrder();

    // subscribing to current updates
    const subscription = DataStore.observe(Order).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        fetchOrder();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

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
  }, []);

  if (!driversLocation) {
    return <ActivityIndicator size={"large"} color="grey" />;
  }
  return (
    <View style={styles.container}>
      {/* Map */}
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
        {/* Multiple Locations */}
        {orders.map((order) => (
          <CustomMarker
            key={order.id}
            data={order.Restaurant}
            type="RESTAURANT"
          />
        ))}
      </MapView>
      {/* Map */}

      {/* BottomSheet */}
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={styles.innerContainer}>
          <Text style={styles.textA}>You're Online</Text>
          <Text style={styles.textDB}>Available Orders: {orders.length}</Text>
        </View>
        <BottomSheetFlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
      {/* BottomSheet */}
    </View>
  );
};

export default OrderScreen;
