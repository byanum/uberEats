import { View, Text, StyleSheet } from "react-native";
import { useRef, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { DataStore } from "aws-amplify";
import { Order, Courier } from "../../models";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderLiveUpdates = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);

  const mapRef = useRef(null);

  // fetch order
  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, []);

  // changing 'NEW TO COOKING / COMPLETE {status is changing}
  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setOrder(msg.element);
      }
    });
    // to not cause memory leaks
    return () => subscription.unsubscribe();
  }, [order]);

  // fetch order when order is defined by courier
  useEffect(() => {
    if (order?.orderCourierId) {
      DataStore.query(Courier, order.orderCourierId).then(setCourier);
    }
  }, [order?.orderCourierId]);

  // start location of courier
  useEffect(() => {
    if (courier?.lat && courier?.lng) {
      mapRef.current.animateToRegion({
        latitude: courier.lat,
        longitude: courier.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [courier?.lat, courier?.lng]);

  // current location of courier
  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = DataStore.observe(Courier, courier.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setCourier(msg.element);
        }
      }
    );
    // to not cause memory leaks
    return () => subscription.unsubscribe();
  }, [courier]);

  return (
    <View>
      <Text>Status: {order?.status || "Loading"}</Text>
      <MapView style={styles.map} ref={mapRef}>
        {courier?.lat && (
          <Marker
            coordinate={{ latitude: courier.lat, longitude: courier.lng }}
          >
            <View style={styles.bike}>
              <FontAwesome5 name="motorcycle" size={25} color={"white"} />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  bike: {
    padding: 3,
    backgroundColor: "darkblue",
    borderRadius: 40,
  },
});

export default OrderLiveUpdates;
