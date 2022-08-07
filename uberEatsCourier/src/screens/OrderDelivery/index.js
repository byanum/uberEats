import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo } from "react";
const OrderDelivery = () => {
  const bottomSheetRef = useRef(null);

  // snappoint: in order to reduce re-rendering again n again
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <Text>OrderDelivery</Text>
      </BottomSheet>
    </View>
  );
};

export default OrderDelivery;

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
