import { useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import OrderItem from "../../components/OrderItem";
import styles from "./styles";

import orders from "../../../assets/data/orders.json";

const OrderScreen = () => {
  const bottomSheetRef = useRef(null);
  const { height, width } = useWindowDimensions();
  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);
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
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
      {/* BottomSheet */}
    </View>
  );
};

export default OrderScreen;
