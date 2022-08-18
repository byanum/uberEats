import { useRef, useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";

import OrderItem from "../../components/OrderItem";
import styles from "./styles";

import { DataStore } from "aws-amplify";
import { Order } from "../../models";

// import orders from "../../../assets/data/orders.json"; dummy data

const OrderScreen = () => {
  const bottomSheetRef = useRef(null);
  const { height, width } = useWindowDimensions();
  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);

  const [orders, setOrders] = useState([]);

  // for quering orders
  useEffect(() => {
    DataStore.query(Order, (order) =>
      order.status("eq", "READY_FOR_PICKUP")
    ).then(setOrders);
  }, [orders]);

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView style={{ height, width }} showsUserLocation followsUserLocation>
        {/* Multiple Locations */}
        {orders.map((order) => (
          <MapView.Marker
            key={order.id}
            title={order.Restaurant.name}
            description={order.Restaurant.address}
            coordinate={{
              latitude: order.Restaurant.lat,
              longitude: order.Restaurant.lng,
            }}
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
