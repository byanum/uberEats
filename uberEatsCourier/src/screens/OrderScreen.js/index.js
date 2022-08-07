import { useRef, useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import OrderItem from "../../components/OrderItem";

import orders from "../../../assets/data/orders.json";

const OrderScreen = () => {
  const bottomSheetRef = useRef(null);

  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  textA: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
    paddingBottom: 5,
  },
  textDB: {
    letterSpacing: 0.5,
    color: "grey",
  },
});
